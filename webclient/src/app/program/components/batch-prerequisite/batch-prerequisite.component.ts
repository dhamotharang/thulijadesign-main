import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { BatchPrerequisite } from '../../../shared/models/program/batch-prerequisite';
import { BatchPrerequisiteService } from '../../../shared/services/program/batch-prerequisite.service';
import { BatchPrerequisiteModifyComponent } from '../batch-prerequisite-modify/batch-prerequisite-modify.component';
import { Batch } from '../../../shared/models/program/batch';
import { BatchService } from '../../../shared/services/program/batch.service';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-batch-prerequisite',
	templateUrl: './batch-prerequisite.component.html',
	styleUrls: ['./batch-prerequisite.component.css']
})
export class BatchPrerequisiteComponent implements OnInit, OnDestroy {

	public batchPrerequisites:BatchPrerequisite[];
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private batchPrerequisiteService:BatchPrerequisiteService,
		private router:Router, private dialog: MatDialog) {
			this.columnCaptions = [
				'sequence',
				'description',
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
		this.batchPrerequisiteService.findAll().pipe(takeUntil(this.subject)).subscribe((batchPrerequisites) => {
			this.batchPrerequisites = batchPrerequisites;
		}, (error) => {
			this.errorMessage = error.message;
		})
	}

	add() {
		let sequence:number = 1;
		if (this.batchPrerequisites !== undefined && this.batchPrerequisites.length > 0) {
			sequence = +this.batchPrerequisites[this.batchPrerequisites.length - 1].sequence;
		}
		let element = new BatchPrerequisite(0);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(BatchPrerequisiteModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((batchPrerequisites) => {
			if (batchPrerequisites !== undefined) this.batchPrerequisites = batchPrerequisites;
		})
	}
	
	edit(element:BatchPrerequisite) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(BatchPrerequisiteModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((batchPrerequisites) => {
			if (batchPrerequisites !== undefined) this.batchPrerequisites = batchPrerequisites;
		})
	}
	
	delete(element:BatchPrerequisite) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.batchPrerequisiteService.delete(element).subscribe((batchPrerequisites) => {
					this.batchPrerequisites = batchPrerequisites;
				});
			}
		});
	}

	print(element:BatchPrerequisite) {
	}

}
