import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { Scholar } from '../../../shared/models/scholar/scholar';
import { ScholarService } from '../../../shared/services/scholar/scholar.service';
import { ScholarModifyComponent } from '../scholar-modify/scholar-modify.component';
import { Salutation } from '../../../shared/models/general/salutation';
import { SalutationService } from '../../../shared/services/general/salutation.service';
import { Gender } from '../../../shared/models/general/gender';
import { GenderService } from '../../../shared/services/general/gender.service';
import { Citizen } from '../../../shared/models/general/citizen';
import { CitizenService } from '../../../shared/services/general/citizen.service';
import { Department } from '../../../shared/models/core/department';
import { DepartmentService } from '../../../shared/services/core/department.service';
import { Branch } from '../../../shared/models/core/branch';
import { BranchService } from '../../../shared/services/core/branch.service';
import { Organization } from '../../../shared/models/core/organization';
import { OrganizationService } from '../../../shared/services/core/organization.service';
import { Status } from '../../../shared/models/core/status';
import { StatusService } from '../../../shared/services/core/status.service';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';
import { User } from '../../../shared/models/core/user';
import { LogInService } from '../../../shared/services/builtin/log-in.service';

@Component({
	selector: 'app-scholar',
	templateUrl: './scholar.component.html',
	styleUrls: ['./scholar.component.css']
})
export class ScholarComponent implements OnInit, OnDestroy {

	public scholars:Scholar[];
	public user:User;
	private listSub:Subscription;

	constructor(private scholarService:ScholarService,
		private logInService:LogInService,
		private dialog: MatDialog) {
	}

	ngOnInit() {
		this.listSub = this.logInService.loggedInUser.subscribe((user:User) => {
			if (user !== null) {
				this.user = user;
				this.list();
			} 
		})
	}

	ngOnDestroy() {
		if (this.listSub) {
			this.listSub.unsubscribe();
		}
	}

	list() {
		this.listSub = this.scholarService.findByUserId(this.user.id).subscribe((scholars) => {
			this.scholars = scholars;
		})
	}

	createScholarSearchForm():FormGroup {
		let scholarSearchForm = new FormGroup({
			salutationSearchList: new FormControl('', []), 
			firstNameSearchText: new FormControl('', []), 
			lastNameSearchText: new FormControl('', []), 
			genderSearchList: new FormControl('', []), 
			citizenSearchList: new FormControl('', []), 
			icNumberSearchText: new FormControl('', []), 
			handphoneNumberSearchText: new FormControl('', [])
		})
		return scholarSearchForm;
	}

	add() {
		let element = new Scholar(0, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Scholar" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ScholarModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((scholars) => {
			if (scholars != undefined) this.scholars = scholars;
		})
	}
	
	edit(element:Scholar) {
		element.options = { masterDetail: "Scholar" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ScholarModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((scholars) => {
			if (scholars != undefined) this.scholars = scholars;
		})
	}
	
	delete(element:Scholar) {
		element.options = { masterDetail: "Scholar" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.scholarService.delete(element).subscribe((scholars) => {
					if (scholars !== undefined) this.scholars = scholars;
				});
			}
		});
	}

	print(element:Scholar) {

	}

}