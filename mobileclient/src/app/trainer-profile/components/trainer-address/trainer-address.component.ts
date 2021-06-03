import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { TrainerAddress } from '../../../shared/models/trainer/trainer-address';
import { TrainerAddressService } from '../../../shared/services/trainer/trainer-address.service';
import { TrainerAddressModifyComponent } from '../trainer-address-modify/trainer-address-modify.component';
import { Trainer } from '../../../shared/models/trainer/trainer';
import { TrainerService } from '../../../shared/services/trainer/trainer.service';
import { AddressType } from '../../../shared/models/general/address-type';
import { AddressTypeService } from '../../../shared/services/general/address-type.service';
import { State } from '../../../shared/models/general/state';
import { StateService } from '../../../shared/services/general/state.service';
import { Country } from '../../../shared/models/general/country';
import { CountryService } from '../../../shared/services/general/country.service';
import { User } from '../../../shared/models/core/user';
import { LogInService } from '../../../shared/services/builtin/log-in.service';

@Component({
	selector: 'app-trainer-address',
	templateUrl: './trainer-address.component.html',
	styleUrls: ['./trainer-address.component.scss']
})
export class TrainerAddressComponent implements OnInit, OnDestroy {

	public trainer:Trainer;
	public trainerAddresses:TrainerAddress[];
	public user:User;
	private listSub:Subscription;

	constructor(private trainerService:TrainerService,
		private trainerAddressService:TrainerAddressService,
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
		this.listSub = this.trainerService.findByUserId(this.user.id).subscribe((trainers) => {
			this.trainer = trainers[0];
			this.listSub = this.trainerAddressService.findByTrainerId(this.trainer.id).subscribe((trainerAddresses) => {
				this.trainerAddresses = trainerAddresses;
			})
		})
	}

	async add() {
		let element = new TrainerAddress(0, this.trainer, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Trainer" };
		const modal = await this.modalController.create({
			component: TrainerAddressModifyComponent,
			componentProps: { trainerAddress: element }
		});
		return await modal.present();
	}
	
	async edit(element:TrainerAddress) {
		element.options = { masterDetail: "Trainer" };
		const modal = await this.modalController.create({
			component: TrainerAddressModifyComponent,
			componentProps: { trainerAddress: element }
		});
		return await modal.present();
	}
	
	async delete(element:TrainerAddress) {
		element.options = { masterDetail: "Trainer" };
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.trainerAddressService.delete(element).subscribe((trainerAddresses) => {
						if (trainerAddresses !== undefined) this.trainerAddresses = trainerAddresses;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:TrainerAddress) {

	}

}