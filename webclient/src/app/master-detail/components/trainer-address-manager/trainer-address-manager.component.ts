import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

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
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

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
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private trainerService:TrainerService,
		private trainerAddressService:TrainerAddressService,
		private router:Router, private route: ActivatedRoute, 
		private dialog: MatDialog) {
			this.columnCaptions = [
				'trainer',
				'addressType',
				'contactPersonName',
				'country',
				'state',
				'telephoneNumberOne',
				'handphoneNumberOne',
				'emailAddressOne',
				'action'
			];
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

	add() {
		let element = new TrainerAddress(0, this.trainer, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Trainer" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(TrainerAddressManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((trainerAddresses) => {
			if (trainerAddresses !== undefined) this.trainerAddresses = trainerAddresses;
		})
	}
	
	edit(element:TrainerAddress) {
		element.options = { masterDetail: "Trainer" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(TrainerAddressManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((trainerAddresses) => {
			if (trainerAddresses !== undefined) this.trainerAddresses = trainerAddresses;
		})
	}
	
	delete(element:TrainerAddress) {
		element.options = { masterDetail: "Trainer" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.trainerAddressService.delete(element).subscribe((trainerAddresses) => {
					if (trainerAddresses !== undefined) this.trainerAddresses = trainerAddresses;
				});
			}
		});
	}
	
	showDetail(element:TrainerAddress) {
	}
	
	print(element:TrainerAddress) {
	}

}
