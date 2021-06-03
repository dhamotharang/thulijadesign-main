import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { Gender } from '../../../shared/models/general/gender';
import { GenderService } from '../../../shared/services/general/gender.service';
import { GenderModifyComponent } from '../gender-modify/gender-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-gender',
	templateUrl: './gender.component.html',
	styleUrls: ['./gender.component.css']
})
export class GenderComponent implements OnInit, OnDestroy {

	public genders:Gender[];
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private genderService:GenderService,
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
		this.genderService.findAll().pipe(takeUntil(this.subject)).subscribe((genders) => {
			this.genders = genders;
		}, (error) => {
			this.errorMessage = error.message;
		})
	}

	add() {
		let sequence:number = 1;
		if (this.genders !== undefined && this.genders.length > 0) {
			sequence = +this.genders[this.genders.length - 1].sequence;
		}
		let element = new Gender(0);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(GenderModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((genders) => {
			if (genders !== undefined) this.genders = genders;
		})
	}
	
	edit(element:Gender) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(GenderModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((genders) => {
			if (genders !== undefined) this.genders = genders;
		})
	}
	
	delete(element:Gender) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.genderService.delete(element).subscribe((genders) => {
					this.genders = genders;
				});
			}
		});
	}

	print(element:Gender) {
	}

}
