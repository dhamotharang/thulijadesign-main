import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { AddressType } from '../../../shared/models/general/address-type';
import { AddressTypeService } from '../../../shared/services/general/address-type.service';
import { AddressTypeModifyComponent } from '../address-type-modify/address-type-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-address-type',
	templateUrl: './address-type.component.html',
	styleUrls: ['./address-type.component.css']
})
export class AddressTypeComponent implements OnInit, OnDestroy {

	public addressTypes:AddressType[];
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private addressTypeService:AddressTypeService,
		private router:Router, private dialog: MatDialog) {
			this.columnCaptions = [
				'sequence',
				'code',
				'name',
				'byDefault',
				'action'
			];
			this.subject = new Subject<boolean>();
	}

	ngOnInit() {
		this.list();
	}

	ngOnDestroy() {
		this.subject.next(true);
		this.subject.unsubscribe();
	}

	list() {
		this.addressTypeService.findAll().pipe(takeUntil(this.subject)).subscribe((addressTypes) => {
			this.addressTypes = addressTypes;
		}, (error) => {
			this.errorMessage = error.message;
		})
	}

	add() {
		let sequence:number = 1;
		if (this.addressTypes !== undefined && this.addressTypes.length > 0) {
			sequence = +this.addressTypes[this.addressTypes.length - 1].sequence;
		}
		let element = new AddressType(0);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(AddressTypeModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((addressTypes) => {
			if (addressTypes !== undefined) this.addressTypes = addressTypes;
		})
	}
	
	edit(element:AddressType) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(AddressTypeModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((addressTypes) => {
			if (addressTypes !== undefined) this.addressTypes = addressTypes;
		})
	}
	
	delete(element:AddressType) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.addressTypeService.delete(element).subscribe((addressTypes) => {
					this.addressTypes = addressTypes;
				});
			}
		});
	}

	print(element:AddressType) {
	}

}
