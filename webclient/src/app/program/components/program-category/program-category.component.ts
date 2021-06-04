import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { ProgramCategory } from '../../../shared/models/program/program-category';
import { ProgramCategoryService } from '../../../shared/services/program/program-category.service';
import { ProgramCategoryModifyComponent } from '../program-category-modify/program-category-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-program-category',
	templateUrl: './program-category.component.html',
	styleUrls: ['./program-category.component.css']
})
export class ProgramCategoryComponent implements OnInit, OnDestroy {

	public programCategories:ProgramCategory[];
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private programCategoryService:ProgramCategoryService,
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
		this.programCategoryService.findAll().pipe(takeUntil(this.subject)).subscribe((programCategories) => {
			this.programCategories = programCategories;
		}, (error) => {
			this.errorMessage = error.message;
		})
	}

	add() {
		let sequence:number = 1;
		if (this.programCategories !== undefined && this.programCategories.length > 0) {
			sequence = +this.programCategories[this.programCategories.length - 1].sequence;
		}
		let element = new ProgramCategory(0);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ProgramCategoryModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((programCategories) => {
			if (programCategories !== undefined) this.programCategories = programCategories;
		})
	}
	
	edit(element:ProgramCategory) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ProgramCategoryModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((programCategories) => {
			if (programCategories !== undefined) this.programCategories = programCategories;
		})
	}
	
	delete(element:ProgramCategory) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.programCategoryService.delete(element).subscribe((programCategories) => {
					this.programCategories = programCategories;
				});
			}
		});
	}

	print(element:ProgramCategory) {
	}

}
