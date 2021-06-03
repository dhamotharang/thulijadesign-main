import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { SalaryRange } from '../../../shared/models/general/salary-range';
import { SalaryRangeService } from '../../../shared/services/general/salary-range.service';
import { SalaryRangeModifyComponent } from '../salary-range-modify/salary-range-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-salary-range',
	templateUrl: './salary-range.component.html',
	styleUrls: ['./salary-range.component.css']
})
export class SalaryRangeComponent implements OnInit, OnDestroy {

	public salaryRanges:SalaryRange[];
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private salaryRangeService:SalaryRangeService,
		private router:Router, private dialog: MatDialog) {
			this.columnCaptions = [
				'sequence',
				'name',
				'description',
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
		this.salaryRangeService.findAll().pipe(takeUntil(this.subject)).subscribe((salaryRanges) => {
			this.salaryRanges = salaryRanges;
		}, (error) => {
			this.errorMessage = error.message;
		})
	}

	add() {
		let sequence:number = 1;
		if (this.salaryRanges !== undefined && this.salaryRanges.length > 0) {
			sequence = +this.salaryRanges[this.salaryRanges.length - 1].sequence;
		}
		let element = new SalaryRange(0);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(SalaryRangeModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((salaryRanges) => {
			if (salaryRanges !== undefined) this.salaryRanges = salaryRanges;
		})
	}
	
	edit(element:SalaryRange) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(SalaryRangeModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((salaryRanges) => {
			if (salaryRanges !== undefined) this.salaryRanges = salaryRanges;
		})
	}
	
	delete(element:SalaryRange) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.salaryRangeService.delete(element).subscribe((salaryRanges) => {
					this.salaryRanges = salaryRanges;
				});
			}
		});
	}

	print(element:SalaryRange) {
	}

}
