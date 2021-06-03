import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { Group } from '../../../shared/models/core/group';
import { GroupService } from '../../../shared/services/core/group.service';
import { GroupModifyComponent } from '../group-modify/group-modify.component';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-group',
	templateUrl: './group.component.html',
	styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit, OnDestroy {

	public groups:Group[];
	private listSub:Subscription;
	public columnCaptions:string[];

	constructor(private groupService:GroupService,
		private translatePipe: TranslatePipe, 
		private modalController: ModalController, 
		private alertController: AlertController) {
			this.columnCaptions = [
				'sequence',
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
		this.listSub = this.groupService.findAll().subscribe((groups) => {
			this.groups = groups;
		})
	}

	async add() {
		let sequence:number = 1;
		if (this.groups !== undefined && this.groups.length > 0) {
			sequence = +this.groups[this.groups.length - 1].sequence + 1;
		}
		let element = new Group(0);
		element.sequence = sequence;
		const modal = await this.modalController.create({
			component: GroupModifyComponent,
			componentProps: { group: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['groups'] != undefined)
				this.groups = data.data['groups'];
		});
		return await modal.present();
	}

	async edit(element:Group) {
		const modal = await this.modalController.create({
			component: GroupModifyComponent,
			componentProps: { group: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['groups'] != undefined)
				this.groups = data.data['groups'];
		});
		return await modal.present();
	}

	async delete(element:Group) {
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.groupService.delete(element).subscribe((groups) => {
						this.groups = groups;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:Group) {
	}

}