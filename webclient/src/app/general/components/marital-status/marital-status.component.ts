import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { MaritalStatus } from '../../../shared/models/general/marital-status';
import { MaritalStatusService } from '../../../shared/services/general/marital-status.service';
import { MaritalStatusModifyComponent } from '../marital-status-modify/marital-status-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-marital-status',
	templateUrl: './marital-status.component.html',
	styleUrls: ['./marital-status.component.css']
})
export class MaritalStatusComponent implements OnInit, OnDestroy {

	public maritalStatuses:MaritalStatus[];
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private maritalStatusService:MaritalStatusService,
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
		this.maritalStatusService.findAll().pipe(takeUntil(this.subject)).subscribe((maritalStatuses) => {
			this.maritalStatuses = maritalStatuses;
		}, (error) => {
			this.errorMessage = error.message;
		})
	}

	add() {
		let sequence:number = 1;
		if (this.maritalStatuses !== undefined && this.maritalStatuses.length > 0) {
			sequence = +this.maritalStatuses[this.maritalStatuses.length - 1].sequence;
		}
		let element = new MaritalStatus(0);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(MaritalStatusModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((maritalStatuses) => {
			if (maritalStatuses !== undefined) this.maritalStatuses = maritalStatuses;
		})
	}
	
	edit(element:MaritalStatus) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(MaritalStatusModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((maritalStatuses) => {
			if (maritalStatuses !== undefined) this.maritalStatuses = maritalStatuses;
		})
	}
	
	delete(element:MaritalStatus) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.maritalStatusService.delete(element).subscribe((maritalStatuses) => {
					this.maritalStatuses = maritalStatuses;
				});
			}
		});
	}

	print(element:MaritalStatus) {
	}

}
