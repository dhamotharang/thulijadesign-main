import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { BatchPrerequisite } from '../../../shared/models/program/batch-prerequisite';
import { BatchPrerequisiteService } from '../../../shared/services/program/batch-prerequisite.service';
import { Batch } from '../../../shared/models/program/batch';
import { BatchService } from '../../../shared/services/program/batch.service';
import { Program } from '../../../shared/models/program/program';
import { ProgramService } from '../../../shared/services/program/program.service';

import { BatchPrerequisiteManagerModifyComponent } from '../batch-prerequisite-manager-modify/batch-prerequisite-manager-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-batch-prerequisite-manager',
	templateUrl: './batch-prerequisite-manager.component.html',
	styleUrls: ['./batch-prerequisite-manager.component.css']
})
export class BatchPrerequisiteManagerComponent implements OnInit, OnDestroy {

	public program:Program;
	public programId:number;
	public batch:Batch;
	public batchId:number;
	public batchPrerequisite:BatchPrerequisite;
	public batchPrerequisiteId:number;

	public batchPrerequisites:BatchPrerequisite[];
	private masterSub:Subscription;
	private detailSub:Subscription;
	private listSub:Subscription;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private programService:ProgramService,
		private batchService:BatchService,
		private batchPrerequisiteService:BatchPrerequisiteService,
		private router:Router, private route: ActivatedRoute, 
		private dialog: MatDialog) {
			this.columnCaptions = [
				'sequence',
				'description',
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
		this.listSub = this.batchPrerequisiteService.findByBatchId(this.batch.id).subscribe((batchPrerequisites) => {
			this.batchPrerequisites = batchPrerequisites;
		})
	}

	add() {
		let sequence:number = 1;
		if (this.batchPrerequisites !== undefined && this.batchPrerequisites.length > 0) {
			sequence = +this.batchPrerequisites[this.batchPrerequisites.length - 1].sequence;
		}
		let element = new BatchPrerequisite(0, undefined, this.batch, undefined );
		element.options = { masterDetail: "Batch" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(BatchPrerequisiteManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((batchPrerequisites) => {
			if (batchPrerequisites !== undefined) this.batchPrerequisites = batchPrerequisites;
		})
	}
	
	edit(element:BatchPrerequisite) {
		element.options = { masterDetail: "Batch" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(BatchPrerequisiteManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((batchPrerequisites) => {
			if (batchPrerequisites !== undefined) this.batchPrerequisites = batchPrerequisites;
		})
	}
	
	delete(element:BatchPrerequisite) {
		element.options = { masterDetail: "Program" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.batchPrerequisiteService.delete(element).subscribe((batchPrerequisites) => {
					if (batchPrerequisites !== undefined) this.batchPrerequisites = batchPrerequisites;
				});
			}
		});
	}
	
	showDetail(element:BatchPrerequisite) {
	}
	
	print(element:BatchPrerequisite) {
	}

}
