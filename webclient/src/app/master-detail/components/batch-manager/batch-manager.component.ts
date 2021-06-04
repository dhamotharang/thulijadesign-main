import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { Batch } from '../../../shared/models/program/batch';
import { BatchService } from '../../../shared/services/program/batch.service';
import { Program } from '../../../shared/models/program/program';
import { ProgramService } from '../../../shared/services/program/program.service';
import { State } from '../../../shared/models/general/state';
import { StateService } from '../../../shared/services/general/state.service';
import { Country } from '../../../shared/models/general/country';
import { CountryService } from '../../../shared/services/general/country.service';

import { BatchManagerModifyComponent } from '../batch-manager-modify/batch-manager-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-batch-manager',
	templateUrl: './batch-manager.component.html',
	styleUrls: ['./batch-manager.component.css']
})
export class BatchManagerComponent implements OnInit, OnDestroy {

	public program:Program;
	public programId:number;
	public batch:Batch;
	public batchId:number;

	public batches:Batch[];
	private masterSub:Subscription;
	private detailSub:Subscription;
	private listSub:Subscription;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private programService:ProgramService,
		private batchService:BatchService,
		private router:Router, private route: ActivatedRoute, 
		private dialog: MatDialog) {
			this.columnCaptions = [
				'code',
				'lectureStartDate',
				'lectureEndDate',
				'locationName',
				'action'
			];
	}
	
	ngOnInit() {
		this.route.parent.paramMap.subscribe((params:ParamMap) => {
			this.programId = +params.get('id');
			this.masterSub = this.programService.findById(this.programId).subscribe((program) => {
				this.program = program;
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
		this.listSub = this.batchService.findByProgramId(this.program.id).subscribe((batches) => {
			this.batches = batches;
		})
	}

	add() {
		let element = new Batch(0, this.program, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Program" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(BatchManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((batches) => {
			if (batches !== undefined) this.batches = batches;
		})
	}
	
	edit(element:Batch) {
		element.options = { masterDetail: "Program" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(BatchManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((batches) => {
			if (batches !== undefined) this.batches = batches;
		})
	}
	
	delete(element:Batch) {
		element.options = { masterDetail: "Program" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.batchService.delete(element).subscribe((batches) => {
					if (batches !== undefined) this.batches = batches;
				});
			}
		});
	}
	
	showDetail(element:Batch) {
		this.router.navigate(['/masterdetail/programmanagers/' + this.programId + '/batchmanagers', element.id]);
	}
	
	print(element:Batch) {
	}

}
