import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { OccupationType } from '../../../shared/models/general/occupation-type';
import { OccupationTypeService } from '../../../shared/services/general/occupation-type.service';
import { OccupationTypeModifyComponent } from '../occupation-type-modify/occupation-type-modify.component';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-occupation-type',
	templateUrl: './occupation-type.component.html',
	styleUrls: ['./occupation-type.component.scss']
})
export class OccupationTypeComponent implements OnInit, OnDestroy {

	public occupationTypes:OccupationType[];
	private listSub:Subscription;
	public columnCaptions:string[];

	constructor(private occupationTypeService:OccupationTypeService,
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
		this.listSub = this.occupationTypeService.findAll().subscribe((occupationTypes) => {
			this.occupationTypes = occupationTypes;
		})
	}

	async add() {
		let sequence:number = 1;
		if (this.occupationTypes !== undefined && this.occupationTypes.length > 0) {
			sequence = +this.occupationTypes[this.occupationTypes.length - 1].sequence + 1;
		}
		let element = new OccupationType(0);
		element.sequence = sequence;
		const modal = await this.modalController.create({
			component: OccupationTypeModifyComponent,
			componentProps: { occupationType: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['occupationTypes'] != undefined)
				this.occupationTypes = data.data['occupationTypes'];
		});
		return await modal.present();
	}

	async edit(element:OccupationType) {
		const modal = await this.modalController.create({
			component: OccupationTypeModifyComponent,
			componentProps: { occupationType: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['occupationTypes'] != undefined)
				this.occupationTypes = data.data['occupationTypes'];
		});
		return await modal.present();
	}

	async delete(element:OccupationType) {
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.occupationTypeService.delete(element).subscribe((occupationTypes) => {
						this.occupationTypes = occupationTypes;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:OccupationType) {
	}

}