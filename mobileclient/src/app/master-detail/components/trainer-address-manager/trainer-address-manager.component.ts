import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { TrainerAddress } from '../../../shared/models/trainer/trainer-address';
import { TrainerAddressService } from '../../../shared/services/trainer/trainer-address.service';
import { Trainer } from '../../../shared/models/trainer/trainer';
import { TrainerService } from '../../../shared/services/trainer/trainer.service';
import { AddressType } from '../../../shared/models/general/address-type';
import { AddressTypeService } from '../../../shared/services/general/address-type.service';
import { State } from '../../../shared/models/general/state';
import { StateService } from '../../../shared/services/general/state.service';
import { Country } from '../../../shared/models/general/country';
import { CountryService } from '../../../shared/services/general/country.service';

import { TrainerAddressManagerModifyComponent } from '../trainer-address-manager-modify/trainer-address-manager-modify.component';

@Component({
	selector: 'app-trainer-address-manager',
	templateUrl: './trainer-address-manager.component.html',
	styleUrls: ['./trainer-address-manager.component.css']
})
export class TrainerAddressManagerComponent implements OnInit, OnDestroy {

	public trainer:Trainer;
	public trainerId:number;
	public trainerAddress:TrainerAddress;
	public trainerAddressId:number;

	public trainerAddresses:TrainerAddress[];
	private masterSub:Subscription;
	private detailSub:Subscription;
	private listSub:Subscription;

	constructor(private trainerService:TrainerService,
		private trainerAddressService:TrainerAddressService,
		private router:Router, private route: ActivatedRoute,
		private translatePipe: TranslatePipe,
		private modalController: ModalController,
		private alertController: AlertController) {
	}
	
	ngOnInit() {
		this.route.parent.paramMap.subscribe((params:ParamMap) => {
			this.trainerId = +params.get('id');
			this.masterSub = this.trainerService.findById(this.trainerId).subscribe((trainer) => {
				this.trainer = trainer;
				this.list();
			});
		});
	}
	
	ngOnDestroy() {
		if (this.listSub) {
			this.listSub.unsubscribe();
		}
		if (this.masterSub) {
			this.masterSub.unsubscribe();
		}
		if (this.detailSub) {
			this.detailSub.unsubscribe();
		}
	}
	
	list() {
		this.listSub = this.trainerAddressService.findByTrainerId(this.trainer.id).subscribe((trainerAddresses) => {
			this.trainerAddresses = trainerAddresses;
		})
	}

	async add() {
		let element = new TrainerAddress(0, this.trainer, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Trainer" };
		const modal = await this.modalController.create({
			component: TrainerAddressManagerModifyComponent,
			componentProps: { trainerAddress: element }
		});
		return await modal.present();

		/*
		if (trainerAddresses !== undefined) this.trainerAddresses = trainerAddresses;
		*/
	}
	
	async edit(element:TrainerAddress) {
		element.options = { masterDetail: "Trainer" };
		const modal = await this.modalController.create({
			component: TrainerAddressManagerModifyComponent,
			componentProps: { trainerAddress: element }
		});
		return await modal.present();

		/*
		if (trainerAddresses !== undefined) this.trainerAddresses = trainerAddresses;
		*/
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
	
	showDetail(element:TrainerAddress) {
	}
	
	print(element:TrainerAddress) {
	}

}
