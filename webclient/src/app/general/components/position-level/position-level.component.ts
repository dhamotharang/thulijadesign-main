import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { PositionLevel } from '../../../shared/models/general/position-level';
import { PositionLevelService } from '../../../shared/services/general/position-level.service';
import { PositionLevelModifyComponent } from '../position-level-modify/position-level-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-position-level',
	templateUrl: './position-level.component.html',
	styleUrls: ['./position-level.component.css']
})
export class PositionLevelComponent implements OnInit, OnDestroy {

	public positionLevels:PositionLevel[];
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private positionLevelService:PositionLevelService,
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
		this.positionLevelService.findAll().pipe(takeUntil(this.subject)).subscribe((positionLevels) => {
			this.positionLevels = positionLevels;
		}, (error) => {
			this.errorMessage = error.message;
		})
	}

	add() {
		let sequence:number = 1;
		if (this.positionLevels !== undefined && this.positionLevels.length > 0) {
			sequence = +this.positionLevels[this.positionLevels.length - 1].sequence;
		}
		let element = new PositionLevel(0);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(PositionLevelModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((positionLevels) => {
			if (positionLevels !== undefined) this.positionLevels = positionLevels;
		})
	}
	
	edit(element:PositionLevel) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(PositionLevelModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((positionLevels) => {
			if (positionLevels !== undefined) this.positionLevels = positionLevels;
		})
	}
	
	delete(element:PositionLevel) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.positionLevelService.delete(element).subscribe((positionLevels) => {
					this.positionLevels = positionLevels;
				});
			}
		});
	}

	print(element:PositionLevel) {
	}

}
