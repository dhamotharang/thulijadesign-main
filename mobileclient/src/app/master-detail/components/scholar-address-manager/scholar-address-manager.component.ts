import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { ScholarAddress } from '../../../shared/models/scholar/scholar-address';
import { ScholarAddressService } from '../../../shared/services/scholar/scholar-address.service';
import { Scholar } from '../../../shared/models/scholar/scholar';
import { ScholarService } from '../../../shared/services/scholar/scholar.service';
import { AddressType } from '../../../shared/models/general/address-type';
import { AddressTypeService } from '../../../shared/services/general/address-type.service';
import { State } from '../../../shared/models/general/state';
import { StateService } from '../../../shared/services/general/state.service';
import { Country } from '../../../shared/models/general/country';
import { CountryService } from '../../../shared/services/general/country.service';

import { ScholarAddressManagerModifyComponent } from '../scholar-address-manager-modify/scholar-address-manager-modify.component';

@Component({
	selector: 'app-scholar-address-manager',
	templateUrl: './scholar-address-manager.component.html',
	styleUrls: ['./scholar-address-manager.component.css']
})
export class ScholarAddressManagerComponent implements OnInit, OnDestroy {

	public scholar:Scholar;
	public scholarId:number;
	public scholarAddress:ScholarAddress;
	public scholarAddressId:number;

	public scholarAddresses:ScholarAddress[];
	private masterSub:Subscription;
	private detailSub:Subscription;
	private listSub:Subscription;

	constructor(private scholarService:ScholarService,
		private scholarAddressService:ScholarAddressService,
		private router:Router, private route: ActivatedRoute,
		private translatePipe: TranslatePipe,
		private modalController: ModalController,
		private alertController: AlertController) {
	}
	
	ngOnInit() {
		this.route.parent.paramMap.subscribe((params:ParamMap) => {
			this.scholarId = +params.get('id');
			this.masterSub = this.scholarService.findById(this.scholarId).subscribe((scholar) => {
				this.scholar = scholar;
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
		this.listSub = this.scholarAddressService.findByScholarId(this.scholar.id).subscribe((scholarAddresses) => {
			this.scholarAddresses = scholarAddresses;
		})
	}

	async add() {
		let element = new ScholarAddress(0, this.scholar, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Scholar" };
		const modal = await this.modalController.create({
			component: ScholarAddressManagerModifyComponent,
			componentProps: { scholarAddress: element }
		});
		return await modal.present();

		/*
		if (scholarAddresses !== undefined) this.scholarAddresses = scholarAddresses;
		*/
	}
	
	async edit(element:ScholarAddress) {
		element.options = { masterDetail: "Scholar" };
		const modal = await this.modalController.create({
			component: ScholarAddressManagerModifyComponent,
			componentProps: { scholarAddress: element }
		});
		return await modal.present();

		/*
		if (scholarAddresses !== undefined) this.scholarAddresses = scholarAddresses;
		*/
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
	
	showDetail(element:ScholarAddress) {
	}
	
	print(element:ScholarAddress) {
	}

}
