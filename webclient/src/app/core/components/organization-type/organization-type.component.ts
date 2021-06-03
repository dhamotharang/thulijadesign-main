import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { OrganizationType } from '../../../shared/models/core/organization-type';
import { OrganizationTypeService } from '../../../shared/services/core/organization-type.service';
import { OrganizationTypeModifyComponent } from '../organization-type-modify/organization-type-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-organization-type',
	templateUrl: './organization-type.component.html',
	styleUrls: ['./organization-type.component.css']
})
export class OrganizationTypeComponent implements OnInit, OnDestroy {

	public organizationTypes:OrganizationType[];
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private organizationTypeService:OrganizationTypeService,
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
		this.organizationTypeService.findAll().pipe(takeUntil(this.subject)).subscribe((organizationTypes) => {
			this.organizationTypes = organizationTypes;
		}, (error) => {
			this.errorMessage = error.message;
		})
	}

	add() {
		let sequence:number = 1;
		if (this.organizationTypes !== undefined && this.organizationTypes.length > 0) {
			sequence = +this.organizationTypes[this.organizationTypes.length - 1].sequence;
		}
		let element = new OrganizationType(0);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(OrganizationTypeModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((organizationTypes) => {
			if (organizationTypes !== undefined) this.organizationTypes = organizationTypes;
		})
	}
	
	edit(element:OrganizationType) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(OrganizationTypeModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((organizationTypes) => {
			if (organizationTypes !== undefined) this.organizationTypes = organizationTypes;
		})
	}
	
	delete(element:OrganizationType) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.organizationTypeService.delete(element).subscribe((organizationTypes) => {
					this.organizationTypes = organizationTypes;
				});
			}
		});
	}

	print(element:OrganizationType) {
	}

}
