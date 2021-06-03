import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { Branch } from '../../../shared/models/core/branch';
import { BranchService } from '../../../shared/services/core/branch.service';
import { BranchModifyComponent } from '../branch-modify/branch-modify.component';
import { Organization } from '../../../shared/models/core/organization';
import { OrganizationService } from '../../../shared/services/core/organization.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-branch',
	templateUrl: './branch.component.html',
	styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit, OnDestroy {

	public branches:Branch[];
	private listSub:Subscription;
	public columnCaptions:string[];

	constructor(private branchService:BranchService,
		private translatePipe: TranslatePipe, 
		private modalController: ModalController, 
		private alertController: AlertController) {
			this.columnCaptions = [
				'sequence',
				'organization',
				'abbreviation',
				'name',
				'action'
			];
	}

	ngOnInit() {
		this.list();
	}

	ngOnDestroy() {
		if (this.listSub) {
			this.listSub.unsubscribe();
		}
	}

	list() {
		this.listSub = this.branchService.findAll().subscribe((branches) => {
			this.branches = branches;
		})
	}

	async add() {
		let sequence:number = 1;
		if (this.branches !== undefined && this.branches.length > 0) {
			sequence = +this.branches[this.branches.length - 1].sequence + 1;
		}
		let element = new Branch(0);
		element.sequence = sequence;
		const modal = await this.modalController.create({
			component: BranchModifyComponent,
			componentProps: { branch: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['branches'] != undefined)
				this.branches = data.data['branches'];
		});
		return await modal.present();
	}

	async edit(element:Branch) {
		const modal = await this.modalController.create({
			component: BranchModifyComponent,
			componentProps: { branch: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['branches'] != undefined)
				this.branches = data.data['branches'];
		});
		return await modal.present();
	}

	async delete(element:Branch) {
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.branchService.delete(element).subscribe((branches) => {
						this.branches = branches;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:Branch) {
	}

}