import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

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
import { User } from '../../../shared/models/core/user';
import { UserService } from '../../../shared/services/core/user.service';

@Component({
	selector: 'app-user-modify',
	templateUrl: './user-modify.component.html',
	styleUrls: ['./user-modify.component.scss']
})
export class UserModifyComponent implements OnInit {

	public userForm:FormGroup;
	public user:User;
	public organizations:Organization[];
	public currentOrganization:Organization;
	public branches:Branch[];
	public currentBranch:Branch;
	public departments:Department[];
	public currentDepartment:Department;
	public statuses:Status[];
	public currentStatus:Status;
	public passwordHide:boolean = true;
	public confirmPasswordHide:boolean = true;
	public errorMessage:string;

	compareOrganization = (currentorganization: Organization, organization: Organization) => currentorganization.id == organization.id;

	compareBranch = (currentbranch: Branch, branch: Branch) => currentbranch.id == branch.id;

	compareDepartment = (currentdepartment: Department, department: Department) => currentdepartment.id == department.id;

	compareStatus = (currentstatus: Status, status: Status) => currentstatus.id == status.id;

	constructor(private userService:UserService,
			private organizationService:OrganizationService,
			private branchService:BranchService,
			private departmentService:DepartmentService,
			private statusService:StatusService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.user = this.navParams.get('user');
		this.organizationService.findAllByLookup().subscribe(organizations => {
			this.organizations = organizations;
		})
		this.branchService.findAllByLookup().subscribe(branches => {
			this.branches = branches;
		})
		this.departmentService.findAllByLookup().subscribe(departments => {
			this.departments = departments;
		})
		this.statusService.findAllByLookup().subscribe(statuses => {
			this.statuses = statuses;
			if (this.user.id === 0) {
				this.statuses.forEach((status) => {
					if (status.byDefault == true) this.userForm.controls['status'].setValue(status);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		})
	}

	ngOnInit() {
		if (this.user.id === 0) {
			this.userForm = this.createUserForm();
			this.userForm.get('organization').valueChanges.subscribe(item => {
				this.userForm.get('branch').setValue('');
			}, (error) => {
				this.errorMessage = error.message;
			})
			this.userForm.get('branch').valueChanges.subscribe(item => {
				this.userForm.get('department').setValue('');
			}, (error) => {
				this.errorMessage = error.message;
			})
		} else {
			this.userForm = this.editUserForm();
			this.userForm.get('organization').valueChanges.subscribe(item => {
				this.userForm.get('branch').setValue('');
			}, (error) => {
				this.errorMessage = error.message;
			})
			this.userForm.get('branch').valueChanges.subscribe(item => {
				this.userForm.get('department').setValue('');
			}, (error) => {
				this.errorMessage = error.message;
			})
		}
	}

	createUserForm():FormGroup {
		let userForm = new FormGroup({
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
			emailAddress: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(3),
					Validators.maxLength(120),
					Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
				],
				asyncValidators: [
					this.userService.emailAddressValidator()
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
			}),
			profile: new FormControl('', {
				validators: [
					Validators.minLength(1),
					Validators.maxLength(25)
				]
			})
		})
		userForm.setValidators(ComparePassword("password", "confirmPassword"));
		return userForm;
	}

	editUserForm():FormGroup {
		this.currentOrganization = this.user.organization;
		this.currentBranch = this.user.branch;
		this.currentDepartment = this.user.department;
		this.currentStatus = this.user.status;
		let userForm = new FormGroup({
			organization: new FormControl(this.user.organization, [
			]), 
			branch: new FormControl(this.user.branch, [
			]), 
			department: new FormControl(this.user.department, [
			]), 
			firstName: new FormControl(this.user.firstName, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(50)
			]), 
			lastName: new FormControl(this.user.lastName, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(50)
			]), 
			emailAddress: new FormControl(this.user.emailAddress, [
				Validators.required, 
				Validators.minLength(3),
				Validators.maxLength(120),
				Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
			]), 
			password: new FormControl(this.user.password, [
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
			numLogins: new FormControl(this.user.numLogins, [
				Validators.pattern("^[0-9]*$"),
				Validators.min(0),
				Validators.max(2000)
			]), 
			lastLoginTime: new FormControl((this.user.lastLoginTime === null) ? "" : new Date(this.user.lastLoginTime), [
			]), 
			status: new FormControl(this.user.status, [
			]), 
			profile: new FormControl(this.user.profile, [
				Validators.minLength(1),
				Validators.maxLength(25)
			])
		})
		userForm.setValidators(ComparePassword("password", "confirmPassword"));
		return userForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.userForm.controls[controlName].hasError(errorName);
	}

	public save(user:User) {
		if (user.lastLoginTime !== null) {
			user.lastLoginTime = new Date(user.lastLoginTime);
			user.lastLoginTime = new Date(user.lastLoginTime.getFullYear(), 
				user.lastLoginTime.getMonth(), user.lastLoginTime.getDate());
			user.lastLoginTime.setDate(user.lastLoginTime.getDate() + 1);
		}
		if (this.user.id === 0) {
			this.userService.save(user).subscribe((users) => {
				this.modalController.dismiss({ 'dismissed': true, 'users':users });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			user.id = this.user.id;
			this.userService.update(user.id, user).subscribe((users) => {
				this.modalController.dismiss({ 'dismissed': true, 'users':users });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
