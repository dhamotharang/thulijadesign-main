import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { Status } from '../../../shared/models/core/status';
import { StatusService } from '../../../shared/services/core/status.service';
import { StatusModifyComponent } from '../status-modify/status-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-status',
	templateUrl: './status.component.html',
	styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit, OnDestroy {

	public statuses:Status[];
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private statusService:StatusService,
		private router:Router, private dialog: MatDialog) {
			this.columnCaptions = [
				'sequence',
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
		this.statusService.findAll().pipe(takeUntil(this.subject)).subscribe((statuses) => {
			this.statuses = statuses;
		}, (error) => {
			this.errorMessage = error.message;
		})
	}

	add() {
		let sequence:number = 1;
		if (this.statuses !== undefined && this.statuses.length > 0) {
			sequence = +this.statuses[this.statuses.length - 1].sequence;
		}
		let element = new Status(0);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(StatusModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((statuses) => {
			if (statuses !== undefined) this.statuses = statuses;
		})
	}
	
	edit(element:Status) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(StatusModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((statuses) => {
			if (statuses !== undefined) this.statuses = statuses;
		})
	}
	
	delete(element:Status) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.statusService.delete(element).subscribe((statuses) => {
					this.statuses = statuses;
				});
			}
		});
	}

	print(element:Status) {
	}

}
