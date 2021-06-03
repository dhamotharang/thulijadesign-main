import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { FieldStudy } from '../../../shared/models/general/field-study';
import { FieldStudyService } from '../../../shared/services/general/field-study.service';
import { FieldStudyModifyComponent } from '../field-study-modify/field-study-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-field-study',
	templateUrl: './field-study.component.html',
	styleUrls: ['./field-study.component.css']
})
export class FieldStudyComponent implements OnInit, OnDestroy {

	public fieldStudies:FieldStudy[];
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private fieldStudyService:FieldStudyService,
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
		this.fieldStudyService.findAll().pipe(takeUntil(this.subject)).subscribe((fieldStudies) => {
			this.fieldStudies = fieldStudies;
		}, (error) => {
			this.errorMessage = error.message;
		})
	}

	add() {
		let sequence:number = 1;
		if (this.fieldStudies !== undefined && this.fieldStudies.length > 0) {
			sequence = +this.fieldStudies[this.fieldStudies.length - 1].sequence;
		}
		let element = new FieldStudy(0);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(FieldStudyModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((fieldStudies) => {
			if (fieldStudies !== undefined) this.fieldStudies = fieldStudies;
		})
	}
	
	edit(element:FieldStudy) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(FieldStudyModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((fieldStudies) => {
			if (fieldStudies !== undefined) this.fieldStudies = fieldStudies;
		})
	}
	
	delete(element:FieldStudy) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.fieldStudyService.delete(element).subscribe((fieldStudies) => {
					this.fieldStudies = fieldStudies;
				});
			}
		});
	}

	print(element:FieldStudy) {
	}

}
