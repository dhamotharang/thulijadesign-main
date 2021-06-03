import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { RelationType } from '../../../shared/models/general/relation-type';
import { RelationTypeService } from '../../../shared/services/general/relation-type.service';
import { RelationTypeModifyComponent } from '../relation-type-modify/relation-type-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-relation-type',
	templateUrl: './relation-type.component.html',
	styleUrls: ['./relation-type.component.css']
})
export class RelationTypeComponent implements OnInit, OnDestroy {

	public relationTypes:RelationType[];
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private relationTypeService:RelationTypeService,
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
		this.relationTypeService.findAll().pipe(takeUntil(this.subject)).subscribe((relationTypes) => {
			this.relationTypes = relationTypes;
		}, (error) => {
			this.errorMessage = error.message;
		})
	}

	add() {
		let sequence:number = 1;
		if (this.relationTypes !== undefined && this.relationTypes.length > 0) {
			sequence = +this.relationTypes[this.relationTypes.length - 1].sequence;
		}
		let element = new RelationType(0);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(RelationTypeModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((relationTypes) => {
			if (relationTypes !== undefined) this.relationTypes = relationTypes;
		})
	}
	
	edit(element:RelationType) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(RelationTypeModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((relationTypes) => {
			if (relationTypes !== undefined) this.relationTypes = relationTypes;
		})
	}
	
	delete(element:RelationType) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.relationTypeService.delete(element).subscribe((relationTypes) => {
					this.relationTypes = relationTypes;
				});
			}
		});
	}

	print(element:RelationType) {
	}

}
