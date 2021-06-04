import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

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
import { CheckPasswordStrength } from '../../../shared/services/builtin/customvalidators';
import { ComparePassword } from '../../../shared/services/builtin/customvalidators';
import { Scholar } from '../../../shared/models/scholar/scholar';
import { ScholarService } from '../../../shared/services/scholar/scholar.service';

@Component({
	selector: 'app-scholar-modify',
	templateUrl: './scholar-modify.component.html',
	styleUrls: ['./scholar-modify.component.scss']
})
export class ScholarModifyComponent implements OnInit {

	public scholarForm:FormGroup;
	public scholar:Scholar;
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
	public citizens:Citizen[];
	public currentCitizen:Citizen;
	public statuses:Status[];
	public currentStatus:Status;
	public passwordHide:boolean = true;
	public confirmPasswordHide:boolean = true;
	public errorMessage:string;

	compareOrganization = (currentorganization: Organization, organization: Organization) => currentorganization.id == organization.id;

	compareBranch = (currentbranch: Branch, branch: Branch) => currentbranch.id == branch.id;

	compareDepartment = (currentdepartment: Department, department: Department) => currentdepartment.id == department.id;

	compareSalutation = (currentsalutation: Salutation, salutation: Salutation) => currentsalutation.id == salutation.id;

	compareGender = (currentgender: Gender, gender: Gender) => currentgender.id == gender.id;

	compareCitizen = (currentcitizen: Citizen, citizen: Citizen) => currentcitizen.id == citizen.id;

	compareStatus = (currentstatus: Status, status: Status) => currentstatus.id == status.id;

	constructor(private scholarService:ScholarService,
			private organizationService:OrganizationService,
			private branchService:BranchService,
			private departmentService:DepartmentService,
			private salutationService:SalutationService,
			private genderService:GenderService,
			private citizenService:CitizenService,
			private statusService:StatusService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.scholar = this.navParams.get('scholar');
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
			if (this.scholar.id === 0) {
				this.salutations.forEach((salutation) => {
					if (salutation.byDefault == true) this.scholarForm.controls['salutation'].setValue(salutation);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		})
		this.genderService.findAllByLookup().subscribe(genders => {
			this.genders = genders;
			if (this.scholar.id === 0) {
				this.genders.forEach((gender) => {
					if (gender.byDefault == true) this.scholarForm.controls['gender'].setValue(gender);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		})
		this.citizenService.findAllByLookup().subscribe(citizens => {
			this.citizens = citizens;
			if (this.scholar.id === 0) {
				this.citizens.forEach((citizen) => {
					if (citizen.byDefault == true) this.scholarForm.controls['citizen'].setValue(citizen);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		})
		this.statusService.findAllByLookup().subscribe(statuses => {
			this.statuses = statuses;
			if (this.scholar.id === 0) {
				this.statuses.forEach((status) => {
					if (status.byDefault == true) this.scholarForm.controls['status'].setValue(status);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		})
	}

	ngOnInit() {
		if (this.scholar.id === 0) {
			this.scholarForm = this.createScholarForm();
			this.scholarForm.get('organization').valueChanges.subscribe(item => {
				this.scholarForm.get('branch').setValue('');
			}, (error) => {
				this.errorMessage = error.message;
			})
			this.scholarForm.get('branch').valueChanges.subscribe(item => {
				this.scholarForm.get('department').setValue('');
			}, (error) => {
				this.errorMessage = error.message;
			})
		} else {
			this.scholarForm = this.editScholarForm();
			this.scholarForm.get('organization').valueChanges.subscribe(item => {
				this.scholarForm.get('branch').setValue('');
			}, (error) => {
				this.errorMessage = error.message;
			})
			this.scholarForm.get('branch').valueChanges.subscribe(item => {
				this.scholarForm.get('department').setValue('');
			}, (error) => {
				this.errorMessage = error.message;
			})
		}
	}

	createScholarForm():FormGroup {
		let scholarForm = new FormGroup({
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
					Validators.maxLength(60)
				]
			}),
			lastName: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(1),
					Validators.maxLength(60)
				]
			}),
			icNumber: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(1),
					Validators.maxLength(20)
				],
				asyncValidators: [
					this.scholarService.icNumberValidator()
				],
				updateOn: 'blur'
			}),
			gender: new FormControl('', {
				validators: [
				]
			}),
			citizen: new FormControl('', {
				validators: [
				]
			}),
			handphoneNumber: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(1),
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
					this.scholarService.emailAddressValidator()
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
			numLogins: new FormControl('', {
				validators: [
					Validators.min(0),
					Validators.max(2000),
					Validators.pattern("^[0-9]*$")
				]
			}),
			lastLoginTime: new FormControl('', {
				validators: [
				]
			}),
			status: new FormControl('', {
				validators: [
				]
			})
		})
		scholarForm.setValidators(ComparePassword("password", "confirmPassword"));
		return scholarForm;
	}

	editScholarForm():FormGroup {
		this.currentOrganization = this.scholar.user.organization;
		this.currentBranch = this.scholar.user.branch;
		this.currentDepartment = this.scholar.user.department;
		this.currentSalutation = this.scholar.salutation;
		this.currentGender = this.scholar.gender;
		this.currentCitizen = this.scholar.citizen;
		this.currentStatus = this.scholar.user.status;
		let scholarForm = new FormGroup({
			organization: new FormControl(this.scholar.user.organization, [
			]), 
			branch: new FormControl(this.scholar.user.branch, [
			]), 
			department: new FormControl(this.scholar.user.department, [
			]), 
			salutation: new FormControl(this.scholar.salutation, [
			]), 
			firstName: new FormControl(this.scholar.user.firstName, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			lastName: new FormControl(this.scholar.user.lastName, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			icNumber: new FormControl(this.scholar.icNumber, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(20)
			]), 
			gender: new FormControl(this.scholar.gender, [
			]), 
			citizen: new FormControl(this.scholar.citizen, [
			]), 
			handphoneNumber: new FormControl(this.scholar.handphoneNumber, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(20)
			]), 
			emailAddress: new FormControl(this.scholar.user.emailAddress, [
				Validators.required, 
				Validators.minLength(3),
				Validators.maxLength(120),
				Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
			]), 
			password: new FormControl(this.scholar.user.password, [
				Validators.required, 
				Validators.minLength(5),
				Validators.maxLength(120),
				CheckPasswordStrength
			]), 
			confirmPassword: new FormControl('', [
				Validators.required, 
				Validators.minLength(5),
				Validators.maxLength(120),
				CheckPasswordStrength
			]), 
			numLogins: new FormControl(this.scholar.user.numLogins, [
				Validators.pattern("^[0-9]*$"),
				Validators.min(0),
				Validators.max(2000)
			]), 
			lastLoginTime: new FormControl((this.scholar.user.lastLoginTime === null) ? "" : new Date(this.scholar.user.lastLoginTime), [
			]), 
			status: new FormControl(this.scholar.user.status, [
			])
		})
		scholarForm.setValidators(ComparePassword("password", "confirmPassword"));
		return scholarForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.scholarForm.controls[controlName].hasError(errorName);
	}

	public save(scholar:Scholar) {
		if (scholar.lastLoginTime !== null) {
			scholar.lastLoginTime = new Date(scholar.lastLoginTime);
			scholar.lastLoginTime = new Date(scholar.lastLoginTime.getFullYear(), 
				scholar.lastLoginTime.getMonth(), scholar.lastLoginTime.getDate());
			scholar.lastLoginTime.setDate(scholar.lastLoginTime.getDate() + 1);
		}
		if (this.scholar.id === 0) {
			this.scholarService.save(scholar).subscribe((scholars) => {
				this.modalController.dismiss({ 'dismissed': true, 'scholars':scholars });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			scholar.id = this.scholar.id;
			this.scholarService.update(scholar.id, scholar).subscribe((scholars) => {
				this.modalController.dismiss({ 'dismissed': true, 'scholars':scholars });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
