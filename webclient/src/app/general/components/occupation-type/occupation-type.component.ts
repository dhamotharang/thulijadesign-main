import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { OccupationType } from '../../../shared/models/general/occupation-type';
import { OccupationTypeService } from '../../../shared/services/general/occupation-type.service';
import { OccupationTypeModifyComponent } from '../occupation-type-modify/occupation-type-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-occupation-type',
	templateUrl: './occupation-type.component.html',
	styleUrls: ['./occupation-type.component.css']
})
export class OccupationTypeComponent implements OnInit, OnDestroy {

	public occupationTypes:OccupationType[];
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private occupationTypeService:OccupationTypeService,
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
		this.occupationTypeService.findAll().pipe(takeUntil(this.subject)).subscribe((occupationTypes) => {
			this.occupationTypes = occupationTypes;
		}, (error) => {
			this.errorMessage = error.message;
		})
	}

	add() {
		let sequence:number = 1;
		if (this.occupationTypes !== undefined && this.occupationTypes.length > 0) {
			sequence = +this.occupationTypes[this.occupationTypes.length - 1].sequence;
		}
		let element = new OccupationType(0);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(OccupationTypeModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((occupationTypes) => {
			if (occupationTypes !== undefined) this.occupationTypes = occupationTypes;
		})
	}
	
	edit(element:OccupationType) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(OccupationTypeModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((occupationTypes) => {
			if (occupationTypes !== undefined) this.occupationTypes = occupationTypes;
		})
	}
	
	delete(element:OccupationType) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.occupationTypeService.delete(element).subscribe((occupationTypes) => {
					this.occupationTypes = occupationTypes;
				});
			}
		});
	}

	print(element:OccupationType) {
	}

}
