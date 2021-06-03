import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { AddressType } from '../../../shared/models/general/address-type';
import { AddressTypeService } from '../../../shared/services/general/address-type.service';
import { AddressTypeModifyComponent } from '../address-type-modify/address-type-modify.component';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-address-type',
	templateUrl: './address-type.component.html',
	styleUrls: ['./address-type.component.scss']
})
export class AddressTypeComponent implements OnInit, OnDestroy {

	public addressTypes:AddressType[];
	private listSub:Subscription;
	public columnCaptions:string[];

	constructor(private addressTypeService:AddressTypeService,
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
		this.listSub = this.addressTypeService.findAll().subscribe((addressTypes) => {
			this.addressTypes = addressTypes;
		})
	}

	async add() {
		let sequence:number = 1;
		if (this.addressTypes !== undefined && this.addressTypes.length > 0) {
			sequence = +this.addressTypes[this.addressTypes.length - 1].sequence + 1;
		}
		let element = new AddressType(0);
		element.sequence = sequence;
		const modal = await this.modalController.create({
			component: AddressTypeModifyComponent,
			componentProps: { addressType: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['addressTypes'] != undefined)
				this.addressTypes = data.data['addressTypes'];
		});
		return await modal.present();
	}

	async edit(element:AddressType) {
		const modal = await this.modalController.create({
			component: AddressTypeModifyComponent,
			componentProps: { addressType: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['addressTypes'] != undefined)
				this.addressTypes = data.data['addressTypes'];
		});
		return await modal.present();
	}

	async delete(element:AddressType) {
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.addressTypeService.delete(element).subscribe((addressTypes) => {
						this.addressTypes = addressTypes;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:AddressType) {
	}

}