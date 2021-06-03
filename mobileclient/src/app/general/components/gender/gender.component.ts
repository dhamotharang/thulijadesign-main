import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { Gender } from '../../../shared/models/general/gender';
import { GenderService } from '../../../shared/services/general/gender.service';
import { GenderModifyComponent } from '../gender-modify/gender-modify.component';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-gender',
	templateUrl: './gender.component.html',
	styleUrls: ['./gender.component.scss']
})
export class GenderComponent implements OnInit, OnDestroy {

	public genders:Gender[];
	private listSub:Subscription;
	public columnCaptions:string[];

	constructor(private genderService:GenderService,
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
		this.listSub = this.genderService.findAll().subscribe((genders) => {
			this.genders = genders;
		})
	}

	async add() {
		let sequence:number = 1;
		if (this.genders !== undefined && this.genders.length > 0) {
			sequence = +this.genders[this.genders.length - 1].sequence + 1;
		}
		let element = new Gender(0);
		element.sequence = sequence;
		const modal = await this.modalController.create({
			component: GenderModifyComponent,
			componentProps: { gender: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['genders'] != undefined)
				this.genders = data.data['genders'];
		});
		return await modal.present();
	}

	async edit(element:Gender) {
		const modal = await this.modalController.create({
			component: GenderModifyComponent,
			componentProps: { gender: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['genders'] != undefined)
				this.genders = data.data['genders'];
		});
		return await modal.present();
	}

	async delete(element:Gender) {
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.genderService.delete(element).subscribe((genders) => {
						this.genders = genders;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:Gender) {
	}

}