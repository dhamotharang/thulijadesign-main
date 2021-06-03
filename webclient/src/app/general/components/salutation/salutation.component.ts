import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { Salutation } from '../../../shared/models/general/salutation';
import { SalutationService } from '../../../shared/services/general/salutation.service';
import { SalutationModifyComponent } from '../salutation-modify/salutation-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-salutation',
	templateUrl: './salutation.component.html',
	styleUrls: ['./salutation.component.css']
})
export class SalutationComponent implements OnInit, OnDestroy {

	public salutations:Salutation[];
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private salutationService:SalutationService,
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
		this.salutationService.findAll().pipe(takeUntil(this.subject)).subscribe((salutations) => {
			this.salutations = salutations;
		}, (error) => {
			this.errorMessage = error.message;
		})
	}

	add() {
		let sequence:number = 1;
		if (this.salutations !== undefined && this.salutations.length > 0) {
			sequence = +this.salutations[this.salutations.length - 1].sequence;
		}
		let element = new Salutation(0);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(SalutationModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((salutations) => {
			if (salutations !== undefined) this.salutations = salutations;
		})
	}
	
	edit(element:Salutation) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(SalutationModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((salutations) => {
			if (salutations !== undefined) this.salutations = salutations;
		})
	}
	
	delete(element:Salutation) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.salutationService.delete(element).subscribe((salutations) => {
					this.salutations = salutations;
				});
			}
		});
	}

	print(element:Salutation) {
	}

}
