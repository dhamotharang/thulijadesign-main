import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { TrainingMode } from '../../../shared/models/program/training-mode';
import { TrainingModeService } from '../../../shared/services/program/training-mode.service';
import { TrainingModeModifyComponent } from '../training-mode-modify/training-mode-modify.component';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-training-mode',
	templateUrl: './training-mode.component.html',
	styleUrls: ['./training-mode.component.scss']
})
export class TrainingModeComponent implements OnInit, OnDestroy {

	public trainingModes:TrainingMode[];
	private listSub:Subscription;
	public columnCaptions:string[];

	constructor(private trainingModeService:TrainingModeService,
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
		this.listSub = this.trainingModeService.findAll().subscribe((trainingModes) => {
			this.trainingModes = trainingModes;
		})
	}

	async add() {
		let sequence:number = 1;
		if (this.trainingModes !== undefined && this.trainingModes.length > 0) {
			sequence = +this.trainingModes[this.trainingModes.length - 1].sequence + 1;
		}
		let element = new TrainingMode(0);
		element.sequence = sequence;
		const modal = await this.modalController.create({
			component: TrainingModeModifyComponent,
			componentProps: { trainingMode: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['trainingModes'] != undefined)
				this.trainingModes = data.data['trainingModes'];
		});
		return await modal.present();
	}

	async edit(element:TrainingMode) {
		const modal = await this.modalController.create({
			component: TrainingModeModifyComponent,
			componentProps: { trainingMode: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['trainingModes'] != undefined)
				this.trainingModes = data.data['trainingModes'];
		});
		return await modal.present();
	}

	async delete(element:TrainingMode) {
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.trainingModeService.delete(element).subscribe((trainingModes) => {
						this.trainingModes = trainingModes;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:TrainingMode) {
	}

}