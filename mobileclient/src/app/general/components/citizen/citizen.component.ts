import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { Citizen } from '../../../shared/models/general/citizen';
import { CitizenService } from '../../../shared/services/general/citizen.service';
import { CitizenModifyComponent } from '../citizen-modify/citizen-modify.component';
import { Country } from '../../../shared/models/general/country';
import { CountryService } from '../../../shared/services/general/country.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-citizen',
	templateUrl: './citizen.component.html',
	styleUrls: ['./citizen.component.scss']
})
export class CitizenComponent implements OnInit, OnDestroy {

	public citizens:Citizen[];
	private listSub:Subscription;
	public columnCaptions:string[];

	constructor(private citizenService:CitizenService,
		private translatePipe: TranslatePipe, 
		private modalController: ModalController, 
		private alertController: AlertController) {
			this.columnCaptions = [
				'sequence',
				'country',
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
		this.listSub = this.citizenService.findAll().subscribe((citizens) => {
			this.citizens = citizens;
		})
	}

	async add() {
		let sequence:number = 1;
		if (this.citizens !== undefined && this.citizens.length > 0) {
			sequence = +this.citizens[this.citizens.length - 1].sequence + 1;
		}
		let element = new Citizen(0);
		element.sequence = sequence;
		const modal = await this.modalController.create({
			component: CitizenModifyComponent,
			componentProps: { citizen: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['citizens'] != undefined)
				this.citizens = data.data['citizens'];
		});
		return await modal.present();
	}

	async edit(element:Citizen) {
		const modal = await this.modalController.create({
			component: CitizenModifyComponent,
			componentProps: { citizen: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['citizens'] != undefined)
				this.citizens = data.data['citizens'];
		});
		return await modal.present();
	}

	async delete(element:Citizen) {
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.citizenService.delete(element).subscribe((citizens) => {
						this.citizens = citizens;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:Citizen) {
	}

}