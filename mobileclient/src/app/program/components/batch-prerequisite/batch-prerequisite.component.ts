import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { BatchPrerequisite } from '../../../shared/models/program/batch-prerequisite';
import { BatchPrerequisiteService } from '../../../shared/services/program/batch-prerequisite.service';
import { BatchPrerequisiteModifyComponent } from '../batch-prerequisite-modify/batch-prerequisite-modify.component';
import { Batch } from '../../../shared/models/program/batch';
import { BatchService } from '../../../shared/services/program/batch.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-batch-prerequisite',
	templateUrl: './batch-prerequisite.component.html',
	styleUrls: ['./batch-prerequisite.component.scss']
})
export class BatchPrerequisiteComponent implements OnInit, OnDestroy {

	public batchPrerequisites:BatchPrerequisite[];
	private listSub:Subscription;
	public columnCaptions:string[];

	constructor(private batchPrerequisiteService:BatchPrerequisiteService,
		private translatePipe: TranslatePipe, 
		private modalController: ModalController, 
		private alertController: AlertController) {
			this.columnCaptions = [
				'sequence',
				'description',
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
		this.listSub = this.batchPrerequisiteService.findAll().subscribe((batchPrerequisites) => {
			this.batchPrerequisites = batchPrerequisites;
		})
	}

	async add() {
		let sequence:number = 1;
		if (this.batchPrerequisites !== undefined && this.batchPrerequisites.length > 0) {
			sequence = +this.batchPrerequisites[this.batchPrerequisites.length - 1].sequence + 1;
		}
		let element = new BatchPrerequisite(0);
		element.sequence = sequence;
		const modal = await this.modalController.create({
			component: BatchPrerequisiteModifyComponent,
			componentProps: { batchPrerequisite: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['batchPrerequisites'] != undefined)
				this.batchPrerequisites = data.data['batchPrerequisites'];
		});
		return await modal.present();
	}

	async edit(element:BatchPrerequisite) {
		const modal = await this.modalController.create({
			component: BatchPrerequisiteModifyComponent,
			componentProps: { batchPrerequisite: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['batchPrerequisites'] != undefined)
				this.batchPrerequisites = data.data['batchPrerequisites'];
		});
		return await modal.present();
	}

	async delete(element:BatchPrerequisite) {
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.batchPrerequisiteService.delete(element).subscribe((batchPrerequisites) => {
						this.batchPrerequisites = batchPrerequisites;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:BatchPrerequisite) {
	}

}