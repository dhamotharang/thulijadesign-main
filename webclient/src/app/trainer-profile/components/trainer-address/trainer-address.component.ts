import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

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
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';
import { User } from '../../../shared/models/core/user';
import { LogInService } from '../../../shared/services/builtin/log-in.service';

@Component({
	selector: 'app-trainer-address',
	templateUrl: './trainer-address.component.html',
	styleUrls: ['./trainer-address.component.css']
})
export class TrainerAddressComponent implements OnInit, OnDestroy {

	public trainer:Trainer;
	public trainerAddresses:TrainerAddress[];
	public user:User;
	private listSub:Subscription;

	constructor(private trainerService:TrainerService,
		private trainerAddressService:TrainerAddressService,
		private logInService:LogInService,
		private dialog: MatDialog) {
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

	add() {
		let element = new TrainerAddress(0, this.trainer, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Trainer" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(TrainerAddressModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((trainerAddresses) => {
			if (trainerAddresses != undefined) this.trainerAddresses = trainerAddresses;
		})
	}
	
	edit(element:TrainerAddress) {
		element.options = { masterDetail: "Trainer" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(TrainerAddressModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((trainerAddresses) => {
			if (trainerAddresses != undefined) this.trainerAddresses = trainerAddresses;
		})
	}
	
	delete(element:TrainerAddress) {
		element.options = { masterDetail: "Scholar" };
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

	print(element:TrainerAddress) {

	}

}