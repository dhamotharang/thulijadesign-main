import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { TrainingDelivery } from '../../../shared/models/program/training-delivery';
import { TrainingDeliveryService } from '../../../shared/services/program/training-delivery.service';
import { TrainingDeliveryModifyComponent } from '../training-delivery-modify/training-delivery-modify.component';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-training-delivery',
	templateUrl: './training-delivery.component.html',
	styleUrls: ['./training-delivery.component.scss']
})
export class TrainingDeliveryComponent implements OnInit, OnDestroy {

	public trainingDeliveries:TrainingDelivery[];
	private listSub:Subscription;
	public columnCaptions:string[];

	constructor(private trainingDeliveryService:TrainingDeliveryService,
		private translatePipe: TranslatePipe, 
		private modalController: ModalController, 
		private alertController: AlertController) {
			this.columnCaptions = [
				'sequence',
				'name',
				'description',
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
		this.listSub = this.trainingDeliveryService.findAll().subscribe((trainingDeliveries) => {
			this.trainingDeliveries = trainingDeliveries;
		})
	}

	async add() {
		let sequence:number = 1;
		if (this.trainingDeliveries !== undefined && this.trainingDeliveries.length > 0) {
			sequence = +this.trainingDeliveries[this.trainingDeliveries.length - 1].sequence + 1;
		}
		let element = new TrainingDelivery(0);
		element.sequence = sequence;
		const modal = await this.modalController.create({
			component: TrainingDeliveryModifyComponent,
			componentProps: { trainingDelivery: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['trainingDeliveries'] != undefined)
				this.trainingDeliveries = data.data['trainingDeliveries'];
		});
		return await modal.present();
	}

	async edit(element:TrainingDelivery) {
		const modal = await this.modalController.create({
			component: TrainingDeliveryModifyComponent,
			componentProps: { trainingDelivery: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['trainingDeliveries'] != undefined)
				this.trainingDeliveries = data.data['trainingDeliveries'];
		});
		return await modal.present();
	}

	async delete(element:TrainingDelivery) {
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.trainingDeliveryService.delete(element).subscribe((trainingDeliveries) => {
						this.trainingDeliveries = trainingDeliveries;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:TrainingDelivery) {
	}

}