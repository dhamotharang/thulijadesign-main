import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { BatchScholar } from '../../../shared/models/program/batch-scholar';
import { BatchScholarService } from '../../../shared/services/program/batch-scholar.service';
import { Scholar } from '../../../shared/models/scholar/scholar';
import { ScholarService } from '../../../shared/services/scholar/scholar.service';
import { Batch } from '../../../shared/models/program/batch';
import { BatchService } from '../../../shared/services/program/batch.service';
import { Program } from '../../../shared/models/program/program';
import { ProgramService } from '../../../shared/services/program/program.service';

import { BatchScholarManagerModifyComponent } from '../batch-scholar-manager-modify/batch-scholar-manager-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-batch-scholar-manager',
	templateUrl: './batch-scholar-manager.component.html',
	styleUrls: ['./batch-scholar-manager.component.css']
})
export class BatchScholarManagerComponent implements OnInit, OnDestroy {

	public program:Program;
	public programId:number;
	public batch:Batch;
	public batchId:number;
	public batchScholar:BatchScholar;
	public batchScholarId:number;

	public batchScholars:BatchScholar[];
	private masterSub:Subscription;
	private detailSub:Subscription;
	private listSub:Subscription;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private programService:ProgramService,
		private batchService:BatchService,
		private batchScholarService:BatchScholarService,
		private router:Router, private route: ActivatedRoute, 
		private dialog: MatDialog) {
			this.columnCaptions = [
				'scholar',
				'action'
			];
	}
	
	ngOnInit() {
		this.route.parent.paramMap.subscribe((params:ParamMap) => {
			this.programId = +params.get('id');
			this.masterSub = this.programService.findById(this.programId).subscribe((program) => {
				this.program = program;
			});
		});
		this.route.parent.paramMap.subscribe((params:ParamMap) => {
			this.batchId = +params.get('batchid');
			this.detailSub = this.batchService.findById(this.batchId).subscribe((batch) => {
				this.batch = batch;
				this.list();
			});
		});
	}
	
	ngOnDestroy() {
		if (this.listSub) {
			this.listSub.unsubscribe();
		}
		if (this.masterSub) {
			this.masterSub.unsubscribe();
		}
		if (this.detailSub) {
			this.detailSub.unsubscribe();
		}
	}
	
	list() {
		this.listSub = this.batchScholarService.findByBatchId(this.batch.id).subscribe((batchScholars) => {
			this.batchScholars = batchScholars;
		})
	}

	add() {
		let element = new BatchScholar(0, this.batch, undefined );
		element.options = { masterDetail: "Batch" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.minWidth = 600;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(BatchScholarManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((batchScholars) => {
			if (batchScholars !== undefined) this.batchScholars = batchScholars;
		})
	}
	
	edit(element:BatchScholar) {
		element.options = { masterDetail: "Batch" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.minWidth = 600;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(BatchScholarManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((batchScholars) => {
			if (batchScholars !== undefined) this.batchScholars = batchScholars;
		})
	}
	
	delete(element:BatchScholar) {
		element.options = { masterDetail: "Program" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.batchScholarService.delete(element).subscribe((batchScholars) => {
					if (batchScholars !== undefined) this.batchScholars = batchScholars;
				});
			}
		});
	}
	
	showDetail(element:BatchScholar) {
		this.router.navigate(['/masterdetail/programmanagers/' + this.programId + '/batchmanagers/' + this.batchId + '/batchscholarmanagers', element.id]);
	}
	
	print(element:BatchScholar) {
	}

}
