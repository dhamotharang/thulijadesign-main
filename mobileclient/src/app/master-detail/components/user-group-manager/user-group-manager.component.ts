import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { UserGroup } from '../../../shared/models/core/user-group';
import { UserGroupService } from '../../../shared/services/core/user-group.service';
import { Group } from '../../../shared/models/core/group';
import { GroupService } from '../../../shared/services/core/group.service';
import { User } from '../../../shared/models/core/user';
import { UserService } from '../../../shared/services/core/user.service';

import { UserGroupManagerModifyComponent } from '../user-group-manager-modify/user-group-manager-modify.component';

@Component({
	selector: 'app-user-group-manager',
	templateUrl: './user-group-manager.component.html',
	styleUrls: ['./user-group-manager.component.css']
})
export class UserGroupManagerComponent implements OnInit, OnDestroy {

	public group:Group;
	public groupId:number;
	public userGroup:UserGroup;
	public userGroupId:number;

	public userGroups:UserGroup[];
	private masterSub:Subscription;
	private detailSub:Subscription;
	private listSub:Subscription;

	constructor(private groupService:GroupService,
		private userGroupService:UserGroupService,
		private router:Router, private route: ActivatedRoute,
		private translatePipe: TranslatePipe,
		private modalController: ModalController,
		private alertController: AlertController) {
	}
	
	ngOnInit() {
		this.route.parent.paramMap.subscribe((params:ParamMap) => {
			this.groupId = +params.get('id');
			this.masterSub = this.groupService.findById(this.groupId).subscribe((group) => {
				this.group = group;
				this.list();
			});
		});
	}
	
	ngOnDestroy() {
		if (this.listSub) {
			this.listSub.unsubscribe();
		}
		if (this.masterSub) {
			this.masterSub.unsubscribe();
		}
		if (this.detailSub) {
			this.detailSub.unsubscribe();
		}
	}
	
	list() {
		this.listSub = this.userGroupService.findByGroupId(this.group.id).subscribe((userGroups) => {
			this.userGroups = userGroups;
		})
	}

	async add() {
		let sequence:number = 1;
		if (this.userGroups !== undefined && this.userGroups.length > 0) {
			sequence = +this.userGroups[this.userGroups.length - 1].sequence;
		}
		let element = new UserGroup(0, undefined, this.group, undefined );
		element.options = { masterDetail: "Group" };
		const modal = await this.modalController.create({
			component: UserGroupManagerModifyComponent,
			componentProps: { userGroup: element }
		});
		return await modal.present();

		/*
		if (userGroups !== undefined) this.userGroups = userGroups;
		*/
	}
	
	async edit(element:UserGroup) {
		element.options = { masterDetail: "Group" };
		const modal = await this.modalController.create({
			component: UserGroupManagerModifyComponent,
			componentProps: { userGroup: element }
		});
		return await modal.present();

		/*
		if (userGroups !== undefined) this.userGroups = userGroups;
		*/
	}
	
	async delete(element:UserGroup) {
		element.options = { masterDetail: "Group" };
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.userGroupService.delete(element).subscribe((userGroups) => {
						if (userGroups !== undefined) this.userGroups = userGroups;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}
	
	showDetail(element:UserGroup) {
	}
	
	print(element:UserGroup) {
	}

}
