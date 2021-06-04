import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { TrainingMode } from '../../../shared/models/program/training-mode';
import { TrainingModeService } from '../../../shared/services/program/training-mode.service';
import { TrainingModeModifyComponent } from '../training-mode-modify/training-mode-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-training-mode',
	templateUrl: './training-mode.component.html',
	styleUrls: ['./training-mode.component.css']
})
export class TrainingModeComponent implements OnInit, OnDestroy {

	public trainingModes:TrainingMode[];
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private trainingModeService:TrainingModeService,
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
		this.trainingModeService.findAll().pipe(takeUntil(this.subject)).subscribe((trainingModes) => {
			this.trainingModes = trainingModes;
		}, (error) => {
			this.errorMessage = error.message;
		})
	}

	add() {
		let sequence:number = 1;
		if (this.trainingModes !== undefined && this.trainingModes.length > 0) {
			sequence = +this.trainingModes[this.trainingModes.length - 1].sequence;
		}
		let element = new TrainingMode(0);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(TrainingModeModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((trainingModes) => {
			if (trainingModes !== undefined) this.trainingModes = trainingModes;
		})
	}
	
	edit(element:TrainingMode) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(TrainingModeModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((trainingModes) => {
			if (trainingModes !== undefined) this.trainingModes = trainingModes;
		})
	}
	
	delete(element:TrainingMode) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.trainingModeService.delete(element).subscribe((trainingModes) => {
					this.trainingModes = trainingModes;
				});
			}
		});
	}

	print(element:TrainingMode) {
	}

}
