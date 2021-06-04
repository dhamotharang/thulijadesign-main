import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { BatchContent } from '../../../shared/models/program/batch-content';
import { BatchContentService } from '../../../shared/services/program/batch-content.service';
import { BatchContentModifyComponent } from '../batch-content-modify/batch-content-modify.component';
import { Batch } from '../../../shared/models/program/batch';
import { BatchService } from '../../../shared/services/program/batch.service';
import { BatchModule } from '../../../shared/models/program/batch-module';
import { BatchModuleService } from '../../../shared/services/program/batch-module.service';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-batch-content',
	templateUrl: './batch-content.component.html',
	styleUrls: ['./batch-content.component.css']
})
export class BatchContentComponent implements OnInit, OnDestroy {

	public batchContents:(BatchModule | BatchContent)[];
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private batchContentService:BatchContentService,
		private router:Router, private dialog: MatDialog) {
			this.columnCaptions = [
				'sequence',
				'name',
				'description',
				'contentUrl',
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
		this.batchContentService.findAll().pipe(takeUntil(this.subject)).subscribe((batchContents) => {
			this.batchContents = batchContents;
			let batchModuleIds = new Set(this.batchContents.map((item:BatchContent) => item.batchModule.id))
			let results:(BatchModule | BatchContent)[] = [];
			batchModuleIds.forEach((batchModuleId) => {
				let currentBatchContents:BatchContent[] = 
					this.batchContents.filter((batchContent:BatchContent) => batchContent.batchModule.id == batchModuleId);
				if (currentBatchContents.length > 0) {
					let currentBatchModule:BatchModule = currentBatchContents[0].batchModule;
					results.push(currentBatchModule);
					results.push(...currentBatchContents);
				}
			})
			this.batchContents = results;
		}, (error) => {
			this.errorMessage = error.message;
		})
	}

	isGroup(index:number, item:any): boolean{
		return !(item.id !== undefined
			&& item.sequence !== undefined
			&& item.batch !== undefined
			&& item.batchModule !== undefined
			&& item.name !== undefined
			&& item.description !== undefined
			&& item.contentUrl !== undefined
		)
	}

	add() {
		let sequence:number = 1;
		if (this.batchContents !== undefined && this.batchContents.length > 0) {
			sequence = +this.batchContents[this.batchContents.length - 1].sequence;
		}
		let element = new BatchContent(0);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(BatchContentModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((batchContents) => {
			if (batchContents !== undefined) this.batchContents = batchContents;
		})
	}
	
	edit(element:BatchContent) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(BatchContentModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((batchContents) => {
			if (batchContents !== undefined) this.batchContents = batchContents;
		})
	}
	
	delete(element:BatchContent) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.batchContentService.delete(element).subscribe((batchContents) => {
					this.batchContents = batchContents;
				});
			}
		});
	}

	print(element:BatchContent) {
	}

}
