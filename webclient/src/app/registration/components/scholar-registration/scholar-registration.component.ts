import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { ScholarRegistration } from '../../../shared/models/registration/scholar-registration';
import { ScholarRegistrationService } from '../../../shared/services/registration/scholar-registration.service';
import { ScholarRegistrationModifyComponent } from '../scholar-registration-modify/scholar-registration-modify.component';
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
import { OrganizationType } from '../../../shared/models/core/organization-type';
import { OrganizationTypeService } from '../../../shared/services/core/organization-type.service';
import { User } from '../../../shared/models/core/user';
import { UserService } from '../../../shared/services/core/user.service';
import { Scholar } from '../../../shared/models/scholar/scholar';
import { ScholarService } from '../../../shared/services/scholar/scholar.service';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-scholar-registration',
	templateUrl: './scholar-registration.component.html',
	styleUrls: ['./scholar-registration.component.css']
})
export class ScholarRegistrationComponent implements OnInit, OnDestroy {

	public scholarRegistrations:ScholarRegistration[];
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private scholarRegistrationService:ScholarRegistrationService,
		private scholarService:ScholarService,
		private citizenService:CitizenService,
		private statusService:StatusService,
		private router:Router, private dialog: MatDialog) {
			this.columnCaptions = [
				'organization',
				'branch',
				'department',
				'firstName',
				'lastName',
				'icNumber',
				'gender',
				'handphoneNumber',
				'emailAddress',
				'status',
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
		this.scholarRegistrationService.findAll().pipe(takeUntil(this.subject)).subscribe((scholarRegistrations) => {
			this.scholarRegistrations = scholarRegistrations;
		}, (error) => {
			this.errorMessage = error.message;
		})
	}

	add() {
		let element = new ScholarRegistration(0);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ScholarRegistrationModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((scholarRegistrations) => {
			if (scholarRegistrations !== undefined) this.scholarRegistrations = scholarRegistrations;
		})
	}
	
	edit(element:ScholarRegistration) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ScholarRegistrationModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((scholarRegistrations) => {
			if (scholarRegistrations !== undefined) this.scholarRegistrations = scholarRegistrations;
		})
	}
	
	delete(element:ScholarRegistration) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.scholarRegistrationService.delete(element).subscribe((scholarRegistrations) => {
					this.scholarRegistrations = scholarRegistrations;
				});
			}
		});
	}

	print(element:ScholarRegistration) {
	}

	async post(element:ScholarRegistration) {

		let promises = [];
		let postedScholar:Scholar;

		{
			promises = [];
			promises.push(this.citizenService.findById(1).toPromise());
			promises.push(this.statusService.findById(1).toPromise());
			let [citizen, status] = await Promise.all(promises);
			let scholar = new Scholar();
			scholar.organization = element.organization;
			scholar.branch = element.branch;
			scholar.department = element.department;
			scholar.salutation = element.salutation;
			scholar.firstName = element.firstName;
			scholar.lastName = element.lastName;
			scholar.icNumber = element.icNumber;
			scholar.gender = element.gender;
			scholar.citizen = citizen;
			scholar.handphoneNumber = element.handphoneNumber;
			scholar.emailAddress = element.emailAddress;
			scholar.password = element.password;
			scholar.status = status;
			promises = [];
			promises.push(this.scholarService.saveScholar(scholar).toPromise());
			[postedScholar] = await Promise.all(promises);
		}

		this.scholarRegistrationService.delete(element).subscribe((scholarRegistrations) => {
			this.scholarRegistrations = scholarRegistrations;
		});

	}

}
