import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { ScholarAddress } from '../../../shared/models/scholar/scholar-address';
import { ScholarAddressService } from '../../../shared/services/scholar/scholar-address.service';
import { ScholarAddressModifyComponent } from '../scholar-address-modify/scholar-address-modify.component';
import { Scholar } from '../../../shared/models/scholar/scholar';
import { ScholarService } from '../../../shared/services/scholar/scholar.service';
import { AddressType } from '../../../shared/models/general/address-type';
import { AddressTypeService } from '../../../shared/services/general/address-type.service';
import { State } from '../../../shared/models/general/state';
import { StateService } from '../../../shared/services/general/state.service';
import { Country } from '../../../shared/models/general/country';
import { CountryService } from '../../../shared/services/general/country.service';
import { User } from '../../../shared/models/core/user';
import { LogInService } from '../../../shared/services/builtin/log-in.service';

@Component({
	selector: 'app-scholar-address',
	templateUrl: './scholar-address.component.html',
	styleUrls: ['./scholar-address.component.scss']
})
export class ScholarAddressComponent implements OnInit, OnDestroy {

	public scholar:Scholar;
	public scholarAddresses:ScholarAddress[];
	public user:User;
	private listSub:Subscription;

	constructor(private scholarService:ScholarService,
		private scholarAddressService:ScholarAddressService,
		private logInService:LogInService,
		private translatePipe: TranslatePipe, 
		private modalController: ModalController,
		private alertController: AlertController) {
	}

	ngOnInit() {
		this.listSub = this.logInService.loggedInUser.subscribe((user:User) => {
			if (user !== null) {
				this.user = user;
				this.list();
			} 
		})
	}

	ngOnDestroy() {
		if (this.listSub) {
			this.listSub.unsubscribe();
		}
	}

	list() {
		this.listSub = this.scholarService.findByUserId(this.user.id).subscribe((scholars) => {
			this.scholar = scholars[0];
			this.listSub = this.scholarAddressService.findByScholarId(this.scholar.id).subscribe((scholarAddresses) => {
				this.scholarAddresses = scholarAddresses;
			})
		})
	}

	async add() {
		let element = new ScholarAddress(0, this.scholar, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Scholar" };
		const modal = await this.modalController.create({
			component: ScholarAddressModifyComponent,
			componentProps: { scholarAddress: element }
		});
		return await modal.present();
	}
	
	async edit(element:ScholarAddress) {
		element.options = { masterDetail: "Scholar" };
		const modal = await this.modalController.create({
			component: ScholarAddressModifyComponent,
			componentProps: { scholarAddress: element }
		});
		return await modal.present();
	}
	
	async delete(element:ScholarAddress) {
		element.options = { masterDetail: "Scholar" };
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.scholarAddressService.delete(element).subscribe((scholarAddresses) => {
						if (scholarAddresses !== undefined) this.scholarAddresses = scholarAddresses;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:ScholarAddress) {

	}

}