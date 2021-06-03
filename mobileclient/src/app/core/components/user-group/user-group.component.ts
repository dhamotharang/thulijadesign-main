import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { UserGroup } from '../../../shared/models/core/user-group';
import { UserGroupService } from '../../../shared/services/core/user-group.service';
import { UserGroupModifyComponent } from '../user-group-modify/user-group-modify.component';
import { Group } from '../../../shared/models/core/group';
import { GroupService } from '../../../shared/services/core/group.service';
import { User } from '../../../shared/models/core/user';
import { UserService } from '../../../shared/services/core/user.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-user-group',
	templateUrl: './user-group.component.html',
	styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit, OnDestroy {

	public userGroups:UserGroup[];
	private listSub:Subscription;
	public columnCaptions:string[];

	constructor(private userGroupService:UserGroupService,
		private translatePipe: TranslatePipe, 
		private modalController: ModalController, 
		private alertController: AlertController) {
			this.columnCaptions = [
				'sequence',
				'group',
				'user',
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
		this.listSub = this.userGroupService.findAll().subscribe((userGroups) => {
			this.userGroups = userGroups;
		})
	}

	async add() {
		let sequence:number = 1;
		if (this.userGroups !== undefined && this.userGroups.length > 0) {
			sequence = +this.userGroups[this.userGroups.length - 1].sequence + 1;
		}
		let element = new UserGroup(0);
		element.sequence = sequence;
		const modal = await this.modalController.create({
			component: UserGroupModifyComponent,
			componentProps: { userGroup: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['userGroups'] != undefined)
				this.userGroups = data.data['userGroups'];
		});
		return await modal.present();
	}

	async edit(element:UserGroup) {
		const modal = await this.modalController.create({
			component: UserGroupModifyComponent,
			componentProps: { userGroup: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['userGroups'] != undefined)
				this.userGroups = data.data['userGroups'];
		});
		return await modal.present();
	}

	async delete(element:UserGroup) {
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.userGroupService.delete(element).subscribe((userGroups) => {
						this.userGroups = userGroups;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:UserGroup) {
	}

}