import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { Group } from '../../../shared/models/core/group';
import { GroupService } from '../../../shared/services/core/group.service';
import { GroupManagerModifyComponent } from '../group-manager-modify/group-manager-modify.component';

@Component({
	selector: 'app-group-manager',
	templateUrl: './group-manager.component.html',
	styleUrls: ['./group-manager.component.css']
})
export class GroupManagerComponent implements OnInit, OnDestroy {

	public groups:Group[];
	private listSub:Subscription;
	public columnCaptions:string[];
	
	constructor(private groupService:GroupService,
		private router:Router,
		private translatePipe: TranslatePipe,
		private modalController: ModalController,
		private alertController: AlertController) {
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
			sequence = +this.groups[this.groups.length - 1].sequence;
		}
		let element = new Group(0);
		const modal = await this.modalController.create({
			component: GroupManagerModifyComponent,
			componentProps: { group: element }
		});
		return await modal.present();
	}

	async edit(element:Group) {
		const modal = await this.modalController.create({
			component: GroupManagerModifyComponent,
			componentProps: { group: element }
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
	
	showDetail(element:Group) {
		this.router.navigate(['/masterdetail/groupmanagers', element.id])
	}

	print(element:Group) {
	}

}
