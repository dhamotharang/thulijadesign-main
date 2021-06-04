import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

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
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

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
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private scholarService:ScholarService,
		private scholarAddressService:ScholarAddressService,
		private router:Router, private route: ActivatedRoute, 
		private dialog: MatDialog) {
			this.columnCaptions = [
				'addressType',
				'contactPersonName',
				'telephoneNumberOne',
				'handphoneNumberOne',
				'emailAddressOne',
				'action'
			];
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

	add() {
		let element = new ScholarAddress(0, this.scholar, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Scholar" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ScholarAddressManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((scholarAddresses) => {
			if (scholarAddresses !== undefined) this.scholarAddresses = scholarAddresses;
		})
	}
	
	edit(element:ScholarAddress) {
		element.options = { masterDetail: "Scholar" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ScholarAddressManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((scholarAddresses) => {
			if (scholarAddresses !== undefined) this.scholarAddresses = scholarAddresses;
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
	
	showDetail(element:ScholarAddress) {
	}
	
	print(element:ScholarAddress) {
	}

}
