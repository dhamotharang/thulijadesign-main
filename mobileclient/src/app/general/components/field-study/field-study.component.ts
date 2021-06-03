import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { FieldStudy } from '../../../shared/models/general/field-study';
import { FieldStudyService } from '../../../shared/services/general/field-study.service';
import { FieldStudyModifyComponent } from '../field-study-modify/field-study-modify.component';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-field-study',
	templateUrl: './field-study.component.html',
	styleUrls: ['./field-study.component.scss']
})
export class FieldStudyComponent implements OnInit, OnDestroy {

	public fieldStudies:FieldStudy[];
	private listSub:Subscription;
	public columnCaptions:string[];

	constructor(private fieldStudyService:FieldStudyService,
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
		this.listSub = this.fieldStudyService.findAll().subscribe((fieldStudies) => {
			this.fieldStudies = fieldStudies;
		})
	}

	async add() {
		let sequence:number = 1;
		if (this.fieldStudies !== undefined && this.fieldStudies.length > 0) {
			sequence = +this.fieldStudies[this.fieldStudies.length - 1].sequence + 1;
		}
		let element = new FieldStudy(0);
		element.sequence = sequence;
		const modal = await this.modalController.create({
			component: FieldStudyModifyComponent,
			componentProps: { fieldStudy: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['fieldStudies'] != undefined)
				this.fieldStudies = data.data['fieldStudies'];
		});
		return await modal.present();
	}

	async edit(element:FieldStudy) {
		const modal = await this.modalController.create({
			component: FieldStudyModifyComponent,
			componentProps: { fieldStudy: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['fieldStudies'] != undefined)
				this.fieldStudies = data.data['fieldStudies'];
		});
		return await modal.present();
	}

	async delete(element:FieldStudy) {
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.fieldStudyService.delete(element).subscribe((fieldStudies) => {
						this.fieldStudies = fieldStudies;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:FieldStudy) {
	}

}