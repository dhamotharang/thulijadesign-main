import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { User } from '../../../shared/models/core/user';
import { LogInService } from '../../../shared/services/builtin/log-in.service';

import { Program } from '../../../shared/models/program/program';
import { ProgramService } from '../../../shared/services/program/program.service';
import { ProgramMaster } from '../../../shared/models/program/program-master';
import { ProgramMasterService } from '../../../shared/services/program/program-master.service';
import { TrainingDelivery } from '../../../shared/models/program/training-delivery';
import { TrainingDeliveryService } from '../../../shared/services/program/training-delivery.service';
import { TrainingMode } from '../../../shared/models/program/training-mode';
import { TrainingModeService } from '../../../shared/services/program/training-mode.service';
import { ProgramManagerModifyComponent } from '../program-manager-modify/program-manager-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-program-manager',
	templateUrl: './program-manager.component.html',
	styleUrls: ['./program-manager.component.css']
})
export class ProgramManagerComponent implements OnInit, OnDestroy {

	public programs:Program[];
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	private user:User;
	public errorMessage:string;

	constructor(private programService:ProgramService,
		private logInService:LogInService,
		private router:Router, private dialog: MatDialog) {
			this.columnCaptions = [
				'programMaster', 
				'trainingDelivery', 
				'trainingMode', 
				'action'
			];
			this.subject = new Subject<boolean>();
	}

	ngOnInit() {
		this.logInService.loggedInUser.subscribe((user:User) => {
			if (user !== null) {
				this.user = user;
				this.list();
			}
		})
	}
	
	ngOnDestroy() {
		this.subject.next(true);
		this.subject.unsubscribe();
	}

	list() {
		this.programService.findAllByCreatedByOrganizationId(this.user.organization.id).pipe(takeUntil(this.subject)).subscribe((programs) => {
			this.programs = programs;
		})
	}

	add() {
		let element = new Program(0);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ProgramManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((programs) => {
			if (programs !== undefined) this.programs = programs;
		})
	}
	
	edit(element:Program) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ProgramManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((programs) => {
			if (programs !== undefined) this.programs = programs;
		})
	}
	
	delete(element:Program) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.programService.delete(element).subscribe((programs) => {
					this.programs = programs;
				});
			}
		});
	}
	
	showDetail(element:Program) {
		this.router.navigate(['/masterdetail/programmanagers', element.id])
	}

	print(element:Program) {
	}

}
