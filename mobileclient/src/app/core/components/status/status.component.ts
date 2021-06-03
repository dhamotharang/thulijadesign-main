import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { Status } from '../../../shared/models/core/status';
import { StatusService } from '../../../shared/services/core/status.service';
import { StatusModifyComponent } from '../status-modify/status-modify.component';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-status',
	templateUrl: './status.component.html',
	styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit, OnDestroy {

	public statuses:Status[];
	private listSub:Subscription;
	public columnCaptions:string[];

	constructor(private statusService:StatusService,
		private translatePipe: TranslatePipe, 
		private modalController: ModalController, 
		private alertController: AlertController) {
			this.columnCaptions = [
				'sequence',
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
		this.listSub = this.statusService.findAll().subscribe((statuses) => {
			this.statuses = statuses;
		})
	}

	async add() {
		let sequence:number = 1;
		if (this.statuses !== undefined && this.statuses.length > 0) {
			sequence = +this.statuses[this.statuses.length - 1].sequence + 1;
		}
		let element = new Status(0);
		element.sequence = sequence;
		const modal = await this.modalController.create({
			component: StatusModifyComponent,
			componentProps: { status: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['statuses'] != undefined)
				this.statuses = data.data['statuses'];
		});
		return await modal.present();
	}

	async edit(element:Status) {
		const modal = await this.modalController.create({
			component: StatusModifyComponent,
			componentProps: { status: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['statuses'] != undefined)
				this.statuses = data.data['statuses'];
		});
		return await modal.present();
	}

	async delete(element:Status) {
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.statusService.delete(element).subscribe((statuses) => {
						this.statuses = statuses;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:Status) {
	}

}