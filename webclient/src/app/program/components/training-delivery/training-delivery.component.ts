import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { TrainingDelivery } from '../../../shared/models/program/training-delivery';
import { TrainingDeliveryService } from '../../../shared/services/program/training-delivery.service';
import { TrainingDeliveryModifyComponent } from '../training-delivery-modify/training-delivery-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-training-delivery',
	templateUrl: './training-delivery.component.html',
	styleUrls: ['./training-delivery.component.css']
})
export class TrainingDeliveryComponent implements OnInit, OnDestroy {

	public trainingDeliveries:TrainingDelivery[];
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private trainingDeliveryService:TrainingDeliveryService,
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
		this.trainingDeliveryService.findAll().pipe(takeUntil(this.subject)).subscribe((trainingDeliveries) => {
			this.trainingDeliveries = trainingDeliveries;
		}, (error) => {
			this.errorMessage = error.message;
		})
	}

	add() {
		let sequence:number = 1;
		if (this.trainingDeliveries !== undefined && this.trainingDeliveries.length > 0) {
			sequence = +this.trainingDeliveries[this.trainingDeliveries.length - 1].sequence;
		}
		let element = new TrainingDelivery(0);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(TrainingDeliveryModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((trainingDeliveries) => {
			if (trainingDeliveries !== undefined) this.trainingDeliveries = trainingDeliveries;
		})
	}
	
	edit(element:TrainingDelivery) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(TrainingDeliveryModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((trainingDeliveries) => {
			if (trainingDeliveries !== undefined) this.trainingDeliveries = trainingDeliveries;
		})
	}
	
	delete(element:TrainingDelivery) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.trainingDeliveryService.delete(element).subscribe((trainingDeliveries) => {
					this.trainingDeliveries = trainingDeliveries;
				});
			}
		});
	}

	print(element:TrainingDelivery) {
	}

}
