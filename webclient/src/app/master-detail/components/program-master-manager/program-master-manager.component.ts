import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { ProgramMaster } from '../../../shared/models/program/program-master';
import { ProgramMasterService } from '../../../shared/services/program/program-master.service';
import { ProgramCategory } from '../../../shared/models/program/program-category';
import { ProgramCategoryService } from '../../../shared/services/program/program-category.service';
import { ProgramType } from '../../../shared/models/program/program-type';
import { ProgramTypeService } from '../../../shared/services/program/program-type.service';
import { ProgramMasterManagerModifyComponent } from '../program-master-manager-modify/program-master-manager-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-program-master-manager',
	templateUrl: './program-master-manager.component.html',
	styleUrls: ['./program-master-manager.component.css']
})
export class ProgramMasterManagerComponent implements OnInit, OnDestroy {

	public programMasters:ProgramMaster[];
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private programMasterService:ProgramMasterService,
		private router:Router, private dialog: MatDialog) {
			this.columnCaptions = [
				'sequence', 
				'title', 
				'programCategory', 
				'programType', 
				'description', 
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
		this.programMasterService.findAll().pipe(takeUntil(this.subject)).subscribe((programMasters) => {
			this.programMasters = programMasters;
		})
	}

	add() {
		let sequence:number = 1;
		if (this.programMasters !== undefined && this.programMasters.length > 0) {
			sequence = +this.programMasters[this.programMasters.length - 1].sequence;
		}
		let element = new ProgramMaster(0);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ProgramMasterManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((programMasters) => {
			if (programMasters !== undefined) this.programMasters = programMasters;
		})
	}
	
	edit(element:ProgramMaster) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ProgramMasterManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((programMasters) => {
			if (programMasters !== undefined) this.programMasters = programMasters;
		})
	}
	
	delete(element:ProgramMaster) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.programMasterService.delete(element).subscribe((programMasters) => {
					this.programMasters = programMasters;
				});
			}
		});
	}
	
	showDetail(element:ProgramMaster) {
		this.router.navigate(['/masterdetail/programmastermanagers', element.id])
	}

	print(element:ProgramMaster) {
	}

}
