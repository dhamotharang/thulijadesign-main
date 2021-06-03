import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { Qualification } from '../../../shared/models/general/qualification';
import { QualificationService } from '../../../shared/services/general/qualification.service';
import { QualificationModifyComponent } from '../qualification-modify/qualification-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-qualification',
	templateUrl: './qualification.component.html',
	styleUrls: ['./qualification.component.css']
})
export class QualificationComponent implements OnInit, OnDestroy {

	public qualifications:Qualification[];
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private qualificationService:QualificationService,
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
		this.qualificationService.findAll().pipe(takeUntil(this.subject)).subscribe((qualifications) => {
			this.qualifications = qualifications;
		}, (error) => {
			this.errorMessage = error.message;
		})
	}

	add() {
		let sequence:number = 1;
		if (this.qualifications !== undefined && this.qualifications.length > 0) {
			sequence = +this.qualifications[this.qualifications.length - 1].sequence;
		}
		let element = new Qualification(0);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(QualificationModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((qualifications) => {
			if (qualifications !== undefined) this.qualifications = qualifications;
		})
	}
	
	edit(element:Qualification) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(QualificationModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((qualifications) => {
			if (qualifications !== undefined) this.qualifications = qualifications;
		})
	}
	
	delete(element:Qualification) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.qualificationService.delete(element).subscribe((qualifications) => {
					this.qualifications = qualifications;
				});
			}
		});
	}

	print(element:Qualification) {
	}

}
