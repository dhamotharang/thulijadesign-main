import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { Salutation } from '../../../shared/models/general/salutation';
import { SalutationService } from '../../../shared/services/general/salutation.service';
import { SalutationModifyComponent } from '../salutation-modify/salutation-modify.component';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-salutation',
	templateUrl: './salutation.component.html',
	styleUrls: ['./salutation.component.scss']
})
export class SalutationComponent implements OnInit, OnDestroy {

	public salutations:Salutation[];
	private listSub:Subscription;
	public columnCaptions:string[];

	constructor(private salutationService:SalutationService,
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
		this.listSub = this.salutationService.findAll().subscribe((salutations) => {
			this.salutations = salutations;
		})
	}

	async add() {
		let sequence:number = 1;
		if (this.salutations !== undefined && this.salutations.length > 0) {
			sequence = +this.salutations[this.salutations.length - 1].sequence + 1;
		}
		let element = new Salutation(0);
		element.sequence = sequence;
		const modal = await this.modalController.create({
			component: SalutationModifyComponent,
			componentProps: { salutation: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['salutations'] != undefined)
				this.salutations = data.data['salutations'];
		});
		return await modal.present();
	}

	async edit(element:Salutation) {
		const modal = await this.modalController.create({
			component: SalutationModifyComponent,
			componentProps: { salutation: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['salutations'] != undefined)
				this.salutations = data.data['salutations'];
		});
		return await modal.present();
	}

	async delete(element:Salutation) {
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.salutationService.delete(element).subscribe((salutations) => {
						this.salutations = salutations;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:Salutation) {
	}

}