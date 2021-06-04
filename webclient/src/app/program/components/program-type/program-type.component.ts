import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { ProgramType } from '../../../shared/models/program/program-type';
import { ProgramTypeService } from '../../../shared/services/program/program-type.service';
import { ProgramTypeModifyComponent } from '../program-type-modify/program-type-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-program-type',
	templateUrl: './program-type.component.html',
	styleUrls: ['./program-type.component.css']
})
export class ProgramTypeComponent implements OnInit, OnDestroy {

	public programTypes:ProgramType[];
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private programTypeService:ProgramTypeService,
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
		this.programTypeService.findAll().pipe(takeUntil(this.subject)).subscribe((programTypes) => {
			this.programTypes = programTypes;
		}, (error) => {
			this.errorMessage = error.message;
		})
	}

	add() {
		let sequence:number = 1;
		if (this.programTypes !== undefined && this.programTypes.length > 0) {
			sequence = +this.programTypes[this.programTypes.length - 1].sequence;
		}
		let element = new ProgramType(0);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ProgramTypeModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((programTypes) => {
			if (programTypes !== undefined) this.programTypes = programTypes;
		})
	}
	
	edit(element:ProgramType) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ProgramTypeModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((programTypes) => {
			if (programTypes !== undefined) this.programTypes = programTypes;
		})
	}
	
	delete(element:ProgramType) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.programTypeService.delete(element).subscribe((programTypes) => {
					this.programTypes = programTypes;
				});
			}
		});
	}

	print(element:ProgramType) {
	}

}
