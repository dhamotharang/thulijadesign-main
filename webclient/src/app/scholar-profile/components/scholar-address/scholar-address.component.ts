import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

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
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';
import { User } from '../../../shared/models/core/user';
import { LogInService } from '../../../shared/services/builtin/log-in.service';

@Component({
	selector: 'app-scholar-address',
	templateUrl: './scholar-address.component.html',
	styleUrls: ['./scholar-address.component.css']
})
export class ScholarAddressComponent implements OnInit, OnDestroy {

	public scholar:Scholar;
	public scholarAddresses:ScholarAddress[];
	public user:User;
	private listSub:Subscription;

	constructor(private scholarService:ScholarService,
		private scholarAddressService:ScholarAddressService,
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
		this.listSub = this.scholarService.findByUserId(this.user.id).subscribe((scholars) => {
			this.scholar = scholars[0];
			this.listSub = this.scholarAddressService.findByScholarId(this.scholar.id).subscribe((scholarAddresses) => {
				this.scholarAddresses = scholarAddresses;
			})
		})
	}

	add() {
		let element = new ScholarAddress(0, this.scholar, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Scholar" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ScholarAddressModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((scholarAddresses) => {
			if (scholarAddresses != undefined) this.scholarAddresses = scholarAddresses;
		})
	}
	
	edit(element:ScholarAddress) {
		element.options = { masterDetail: "Scholar" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ScholarAddressModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((scholarAddresses) => {
			if (scholarAddresses != undefined) this.scholarAddresses = scholarAddresses;
		})
	}
	
	delete(element:ScholarAddress) {
		element.options = { masterDetail: "Scholar" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.scholarAddressService.delete(element).subscribe((scholarAddresses) => {
					if (scholarAddresses !== undefined) this.scholarAddresses = scholarAddresses;
				});
			}
		});
	}

	print(element:ScholarAddress) {

	}

}