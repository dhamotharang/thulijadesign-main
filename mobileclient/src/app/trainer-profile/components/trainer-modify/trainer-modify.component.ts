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
import { Trainer } from '../../../shared/models/trainer/trainer';
import { TrainerService } from '../../../shared/services/trainer/trainer.service';

@Component({
	selector: 'app-trainer-modify',
	templateUrl: './trainer-modify.component.html',
	styleUrls: ['./trainer-modify.component.scss']
})
export class TrainerModifyComponent implements OnInit {

	public trainerForm:FormGroup;
	public trainer:Trainer;
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

	constructor(private trainerService:TrainerService,
			private organizationService:OrganizationService,
			private branchService:BranchService,
			private departmentService:DepartmentService,
			private salutationService:SalutationService,
			private genderService:GenderService,
			private citizenService:CitizenService,
			private statusService:StatusService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.trainer = this.navParams.get('trainer');
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
			if (this.trainer.id === 0) {
				this.salutations.forEach((salutation) => {
					if (salutation.byDefault == true) this.trainerForm.controls['salutation'].setValue(salutation);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		})
		this.genderService.findAllByLookup().subscribe(genders => {
			this.genders = genders;
			if (this.trainer.id === 0) {
				this.genders.forEach((gender) => {
					if (gender.byDefault == true) this.trainerForm.controls['gender'].setValue(gender);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		})
		this.citizenService.findAllByLookup().subscribe(citizens => {
			this.citizens = citizens;
			if (this.trainer.id === 0) {
				this.citizens.forEach((citizen) => {
					if (citizen.byDefault == true) this.trainerForm.controls['citizen'].setValue(citizen);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		})
		this.statusService.findAllByLookup().subscribe(statuses => {
			this.statuses = statuses;
			if (this.trainer.id === 0) {
				this.statuses.forEach((status) => {
					if (status.byDefault == true) this.trainerForm.controls['status'].setValue(status);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		})
	}

	ngOnInit() {
		if (this.trainer.id === 0) {
			this.trainerForm = this.createTrainerForm();
		} else {
			this.trainerForm = this.editTrainerForm();
		}
	}

	createTrainerForm():FormGroup {
		let trainerForm = new FormGroup({
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
			icNumber: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(1),
					Validators.maxLength(20)
				],
				asyncValidators: [
					this.trainerService.icNumberValidator()
				],
				updateOn: 'blur'
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
					this.trainerService.emailAddressValidator()
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
					Validators.min(0),
					Validators.max(2000),
				]
			}),
			status: new FormControl('', {
				validators: [
				]
			})
		})
		trainerForm.setValidators(ComparePassword("password", "confirmPassword"));
		return trainerForm;
	}

	editTrainerForm():FormGroup {
		this.currentOrganization = this.trainer.user.organization;
		this.currentBranch = this.trainer.user.branch;
		this.currentDepartment = this.trainer.user.department;
		this.currentSalutation = this.trainer.salutation;
		this.currentGender = this.trainer.gender;
		this.currentCitizen = this.trainer.citizen;
		this.currentStatus = this.trainer.user.status;
		let trainerForm = new FormGroup({
			organization: new FormControl(this.trainer.user.organization, [
			]), 
			branch: new FormControl(this.trainer.user.branch, [
			]), 
			department: new FormControl(this.trainer.user.department, [
			]), 
			icNumber: new FormControl(this.trainer.icNumber, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(20)
			]), 
			salutation: new FormControl(this.trainer.salutation, [
			]), 
			firstName: new FormControl(this.trainer.user.firstName, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			lastName: new FormControl(this.trainer.user.lastName, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			gender: new FormControl(this.trainer.gender, [
			]), 
			citizen: new FormControl(this.trainer.citizen, [
			]), 
			handphoneNumber: new FormControl(this.trainer.handphoneNumber, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(20)
			]), 
			emailAddress: new FormControl(this.trainer.user.emailAddress, [
				Validators.required, 
				Validators.minLength(3),
				Validators.maxLength(120),
				Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
			]), 
			password: new FormControl(this.trainer.user.password, [
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
			numLogins: new FormControl(this.trainer.user.numLogins, [
				Validators.pattern("^[0-9]*$"),
				Validators.min(0),
				Validators.max(2000)
			]), 
			lastLoginTime: new FormControl((this.trainer.user.lastLoginTime === null) ? "" : new Date(this.trainer.user.lastLoginTime), [
				Validators.min(0),
				Validators.max(2000)
			]), 
			status: new FormControl(this.trainer.user.status, [
			])
		})
		trainerForm.setValidators(ComparePassword("password", "confirmPassword"));
		return trainerForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.trainerForm.controls[controlName].hasError(errorName);
	}

	public save(trainer:Trainer) {
		if (trainer.lastLoginTime !== null) {
			trainer.lastLoginTime = new Date(trainer.lastLoginTime);
			trainer.lastLoginTime = new Date(trainer.lastLoginTime.getFullYear(), 
				trainer.lastLoginTime.getMonth(), trainer.lastLoginTime.getDate());
			trainer.lastLoginTime.setDate(trainer.lastLoginTime.getDate() + 1);
		}
		if (this.trainer.id === 0) {
			this.trainerService.save(trainer).subscribe((trainers) => {
				this.modalController.dismiss({ 'dismissed': true, 'trainers':trainers });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			trainer.id = this.trainer.id;
			this.trainerService.update(trainer.id, trainer).subscribe((trainers) => {
				this.modalController.dismiss({ 'dismissed': true, 'trainers':trainers });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
