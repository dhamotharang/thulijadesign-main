import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { Organization } from '../../../shared/models/core/organization';
import { OrganizationService } from '../../../shared/services/core/organization.service';
import { OrganizationModifyComponent } from '../organization-modify/organization-modify.component';
import { OrganizationType } from '../../../shared/models/core/organization-type';
import { OrganizationTypeService } from '../../../shared/services/core/organization-type.service';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-organization',
	templateUrl: './organization.component.html',
	styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit, OnDestroy {

	public organizations:Organization[];
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private organizationService:OrganizationService,
		private router:Router, private dialog: MatDialog) {
			this.columnCaptions = [
				'organizationType',
				'abbreviation',
				'name',
				'profile',
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
		this.organizationService.findAll().pipe(takeUntil(this.subject)).subscribe((organizations) => {
			this.organizations = organizations;
		}, (error) => {
			this.errorMessage = error.message;
		})
	}

	add() {
		let element = new Organization(0);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(OrganizationModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((organizations) => {
			if (organizations !== undefined) this.organizations = organizations;
		})
	}
	
	edit(element:Organization) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(OrganizationModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((organizations) => {
			if (organizations !== undefined) this.organizations = organizations;
		})
	}
	
	delete(element:Organization) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.organizationService.delete(element).subscribe((organizations) => {
					this.organizations = organizations;
				});
			}
		});
	}

	print(element:Organization) {
	}

}
