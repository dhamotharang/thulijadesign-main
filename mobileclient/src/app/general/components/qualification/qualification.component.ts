import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { Qualification } from '../../../shared/models/general/qualification';
import { QualificationService } from '../../../shared/services/general/qualification.service';
import { QualificationModifyComponent } from '../qualification-modify/qualification-modify.component';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-qualification',
	templateUrl: './qualification.component.html',
	styleUrls: ['./qualification.component.scss']
})
export class QualificationComponent implements OnInit, OnDestroy {

	public qualifications:Qualification[];
	private listSub:Subscription;
	public columnCaptions:string[];

	constructor(private qualificationService:QualificationService,
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
		this.listSub = this.qualificationService.findAll().subscribe((qualifications) => {
			this.qualifications = qualifications;
		})
	}

	async add() {
		let sequence:number = 1;
		if (this.qualifications !== undefined && this.qualifications.length > 0) {
			sequence = +this.qualifications[this.qualifications.length - 1].sequence + 1;
		}
		let element = new Qualification(0);
		element.sequence = sequence;
		const modal = await this.modalController.create({
			component: QualificationModifyComponent,
			componentProps: { qualification: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['qualifications'] != undefined)
				this.qualifications = data.data['qualifications'];
		});
		return await modal.present();
	}

	async edit(element:Qualification) {
		const modal = await this.modalController.create({
			component: QualificationModifyComponent,
			componentProps: { qualification: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['qualifications'] != undefined)
				this.qualifications = data.data['qualifications'];
		});
		return await modal.present();
	}

	async delete(element:Qualification) {
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.qualificationService.delete(element).subscribe((qualifications) => {
						this.qualifications = qualifications;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:Qualification) {
	}

}