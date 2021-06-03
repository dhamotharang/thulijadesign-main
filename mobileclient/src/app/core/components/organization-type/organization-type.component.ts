import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { OrganizationType } from '../../../shared/models/core/organization-type';
import { OrganizationTypeService } from '../../../shared/services/core/organization-type.service';
import { OrganizationTypeModifyComponent } from '../organization-type-modify/organization-type-modify.component';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-organization-type',
	templateUrl: './organization-type.component.html',
	styleUrls: ['./organization-type.component.scss']
})
export class OrganizationTypeComponent implements OnInit, OnDestroy {

	public organizationTypes:OrganizationType[];
	private listSub:Subscription;
	public columnCaptions:string[];

	constructor(private organizationTypeService:OrganizationTypeService,
		private translatePipe: TranslatePipe, 
		private modalController: ModalController, 
		private alertController: AlertController) {
			this.columnCaptions = [
				'sequence',
				'code',
				'name',
				'byDefault',
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
		this.listSub = this.organizationTypeService.findAll().subscribe((organizationTypes) => {
			this.organizationTypes = organizationTypes;
		})
	}

	async add() {
		let sequence:number = 1;
		if (this.organizationTypes !== undefined && this.organizationTypes.length > 0) {
			sequence = +this.organizationTypes[this.organizationTypes.length - 1].sequence + 1;
		}
		let element = new OrganizationType(0);
		element.sequence = sequence;
		const modal = await this.modalController.create({
			component: OrganizationTypeModifyComponent,
			componentProps: { organizationType: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['organizationTypes'] != undefined)
				this.organizationTypes = data.data['organizationTypes'];
		});
		return await modal.present();
	}

	async edit(element:OrganizationType) {
		const modal = await this.modalController.create({
			component: OrganizationTypeModifyComponent,
			componentProps: { organizationType: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['organizationTypes'] != undefined)
				this.organizationTypes = data.data['organizationTypes'];
		});
		return await modal.present();
	}

	async delete(element:OrganizationType) {
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.organizationTypeService.delete(element).subscribe((organizationTypes) => {
						this.organizationTypes = organizationTypes;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:OrganizationType) {
	}

}