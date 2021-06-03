import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { MaritalStatus } from '../../../shared/models/general/marital-status';
import { MaritalStatusService } from '../../../shared/services/general/marital-status.service';
import { MaritalStatusModifyComponent } from '../marital-status-modify/marital-status-modify.component';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-marital-status',
	templateUrl: './marital-status.component.html',
	styleUrls: ['./marital-status.component.scss']
})
export class MaritalStatusComponent implements OnInit, OnDestroy {

	public maritalStatuses:MaritalStatus[];
	private listSub:Subscription;
	public columnCaptions:string[];

	constructor(private maritalStatusService:MaritalStatusService,
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
		this.listSub = this.maritalStatusService.findAll().subscribe((maritalStatuses) => {
			this.maritalStatuses = maritalStatuses;
		})
	}

	async add() {
		let sequence:number = 1;
		if (this.maritalStatuses !== undefined && this.maritalStatuses.length > 0) {
			sequence = +this.maritalStatuses[this.maritalStatuses.length - 1].sequence + 1;
		}
		let element = new MaritalStatus(0);
		element.sequence = sequence;
		const modal = await this.modalController.create({
			component: MaritalStatusModifyComponent,
			componentProps: { maritalStatus: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['maritalStatuses'] != undefined)
				this.maritalStatuses = data.data['maritalStatuses'];
		});
		return await modal.present();
	}

	async edit(element:MaritalStatus) {
		const modal = await this.modalController.create({
			component: MaritalStatusModifyComponent,
			componentProps: { maritalStatus: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['maritalStatuses'] != undefined)
				this.maritalStatuses = data.data['maritalStatuses'];
		});
		return await modal.present();
	}

	async delete(element:MaritalStatus) {
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.maritalStatusService.delete(element).subscribe((maritalStatuses) => {
						this.maritalStatuses = maritalStatuses;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:MaritalStatus) {
	}

}