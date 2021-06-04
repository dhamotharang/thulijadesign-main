import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

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
import { CheckPasswordStrength } from '../../../shared/services/builtin/customvalidators';
import { ComparePassword } from '../../../shared/services/builtin/customvalidators';
import { ScholarRegistration } from '../../../shared/models/registration/scholar-registration';
import { ScholarRegistrationService } from '../../../shared/services/registration/scholar-registration.service';
import { ScholarRegistrationEmailVerificationComponent } from '../scholar-registration-email-verification/scholar-registration-email-verification.component';

@Component({
	selector: 'app-scholar-registration-public',
	templateUrl: './scholar-registration-public.component.html',
	styleUrls: ['./scholar-registration-public.component.css']
})
export class ScholarRegistrationPublicComponent implements OnInit {

	public scholarRegistrationForm:FormGroup;
	public organizations:Organization[];
	public currentOrganization:Organization;
	public branches:Branch[];
	public currentBranch:Branch;
	public departments:Department[];
	public currentDepartment:Department;
	public salutations:Salutation[];
	public currentSalutation:Salutation;
	public genders:Gender[];
	public currentGender:Gender;
	public success:boolean = false;
	public passwordHide:boolean = true;
	public confirmPasswordHide:boolean = true;
	public errorMessage:string;

	compareOrganization = (currentorganization: Organization, organization: Organization) => currentorganization.id == organization.id;
	
	compareBranch = (currentbranch: Branch, branch: Branch) => currentbranch.id == branch.id;
	
	compareDepartment = (currentdepartment: Department, department: Department) => currentdepartment.id == department.id;
	
	compareSalutation = (currentsalutation: Salutation, salutation: Salutation) => currentsalutation.id == salutation.id;
	
	compareGender = (currentgender: Gender, gender: Gender) => currentgender.id == gender.id;
	
	constructor(private scholarRegistrationService:ScholarRegistrationService,
		private dialog: MatDialog,
		private organizationService:OrganizationService,
		private branchService:BranchService,
		private departmentService:DepartmentService,
		private salutationService:SalutationService,
		private genderService:GenderService) {
			this.organizationService.findAllByLookup().subscribe(organizations => {
				this.organizations = organizations;
			})
			this.branchService.findAllByLookup().subscribe(branches => {
				this.branches = branches;
			})
			this.departmentService.findAllByLookup().subscribe(departments => {
				this.departments = departments;
			})
			this.salutationService.findAllByLookup().subscribe(salutations => {
				this.salutations = salutations;
				this.salutations.forEach((salutation) => {
					if (salutation.byDefault == true) this.scholarRegistrationForm.controls['salutation'].setValue(salutation);
				}, (error) => {
					this.errorMessage = error.message;
				})
			})
			this.genderService.findAllByLookup().subscribe(genders => {
				this.genders = genders;
				this.genders.forEach((gender) => {
					if (gender.byDefault == true) this.scholarRegistrationForm.controls['gender'].setValue(gender);
				}, (error) => {
					this.errorMessage = error.message;
				})
			})
	}

	ngOnInit() {
		this.scholarRegistrationForm = this.createScholarRegistrationForm();
		this.scholarRegistrationForm.get('organization').valueChanges.subscribe(item => {
			this.scholarRegistrationForm.get('branch').setValue('');
		}, (error) => {
			this.errorMessage = error.message;
		})
		this.scholarRegistrationForm.get('branch').valueChanges.subscribe(item => {
			this.scholarRegistrationForm.get('department').setValue('');
		}, (error) => {
			this.errorMessage = error.message;
		})
	}

	createScholarRegistrationForm():FormGroup {
		let scholarRegistrationForm = new FormGroup({
			organization: new FormControl('', {
				validators: [
				]
			}),
			branch: new FormControl('', {
				validators: [
				]
			}),
			department: new FormControl('', {
				validators: [
				]
			}),
			salutation: new FormControl('', {
				validators: [
				]
			}),
			firstName: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(1),
					Validators.maxLength(50)
				]
			}),
			lastName: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(1),
					Validators.maxLength(50)
				]
			}),
			icNumber: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(1),
					Validators.maxLength(20)
				]
			}),
			gender: new FormControl('', {
				validators: [
				]
			}),
			handphoneNumber: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(5),
					Validators.maxLength(20)
				]
			}),
			emailAddress: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(3),
					Validators.maxLength(120),
					Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
				],
				asyncValidators: [
					this.scholarRegistrationService.emailAddressValidator()
				],
				updateOn: 'blur'
			}),
			password: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(5),
					Validators.maxLength(120),
					CheckPasswordStrength
				]
			}),
			confirmPassword: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(5),
					Validators.maxLength(120),
					CheckPasswordStrength
				]
			}),
			status: new FormControl('', {
				validators: [
					Validators.minLength(1),
					Validators.maxLength(20)
				]
			})
		})
		scholarRegistrationForm.setValidators(ComparePassword("password", "confirmPassword"));
		return scholarRegistrationForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.scholarRegistrationForm.controls[controlName].hasError(errorName);
	}

	private validateAllFormFields(formGroup: FormGroup) {
		Object.keys(formGroup.controls).forEach(field => {
			const control = formGroup.get(field);
			if (control instanceof FormControl) {
				control.markAsTouched({ onlySelf: true });
			} else if (control instanceof FormGroup) {
				this.validateAllFormFields(control);
			}
		});
	}

	public save(scholarRegistration:ScholarRegistration) {
		if (this.scholarRegistrationForm.valid) {
			this.scholarRegistrationService.saveScholarRegistration(scholarRegistration).subscribe((scholarRegistrations) => {
				this.createEmailVerificationDialog(scholarRegistration);
			}, (error) => {
				this.errorMessage = error.message;
			})
		} else {
			this.validateAllFormFields(this.scholarRegistrationForm);
		}
	}

	public createEmailVerificationDialog(scholarRegistration:ScholarRegistration) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = scholarRegistration;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ScholarRegistrationEmailVerificationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((scholarRegistrations) => {
			this.success = true;
		})
	}

}
