import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { Country } from '../../../shared/models/general/country';
import { CountryService } from '../../../shared/services/general/country.service';
import { CountryModifyComponent } from '../country-modify/country-modify.component';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-country',
	templateUrl: './country.component.html',
	styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit, OnDestroy {

	public countries:Country[];
	private listSub:Subscription;
	public columnCaptions:string[];

	constructor(private countryService:CountryService,
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
		this.listSub = this.countryService.findAll().subscribe((countries) => {
			this.countries = countries;
		})
	}

	async add() {
		let sequence:number = 1;
		if (this.countries !== undefined && this.countries.length > 0) {
			sequence = +this.countries[this.countries.length - 1].sequence + 1;
		}
		let element = new Country(0);
		element.sequence = sequence;
		const modal = await this.modalController.create({
			component: CountryModifyComponent,
			componentProps: { country: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['countries'] != undefined)
				this.countries = data.data['countries'];
		});
		return await modal.present();
	}

	async edit(element:Country) {
		const modal = await this.modalController.create({
			component: CountryModifyComponent,
			componentProps: { country: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['countries'] != undefined)
				this.countries = data.data['countries'];
		});
		return await modal.present();
	}

	async delete(element:Country) {
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.countryService.delete(element).subscribe((countries) => {
						this.countries = countries;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:Country) {
	}

}