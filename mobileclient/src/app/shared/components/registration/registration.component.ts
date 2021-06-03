import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrganizationService } from '../../services/core/organization.service';
import { Organization } from '../../models/core/organization';
import { BranchService } from '../../services/core/branch.service';
import { Branch } from '../../models/core/branch';
import { DepartmentService } from '../../services/core/department.service';
import { Department } from '../../models/core/department';
import { UserService } from '../../services/core/user.service';
import { User } from '../../models/core/user';
import { StatusService } from '../../services/core/status.service';
import { Status } from '../../models/core/status';
import { Router } from '@angular/router';
import { CheckPasswordStrength } from '../../services/builtin/customvalidators';
import { ComparePassword } from '../../services/builtin/customvalidators';

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

	public registrationForm:FormGroup;
	public hide:boolean;
	public confirmhide:boolean;

	public organizations:Organization[];
	public branches:Branch[];
	public departments:Department[];
	public user:User;
	public currentBranch:Branch;
	public currentDepartment:Department;
	
	public status:Status;

	compareOrganization = (currentorganization: Organization, organization: Organization) => currentorganization.id == organization.id;
	compareBranch = (currentbranch: Branch, branch: Branch) => currentbranch.id == branch.id;	
	compareDepartment = (currentdepartment: Department, department: Department) => currentdepartment.id == department.id;

	constructor(private organizationService:OrganizationService, 
		private branchService:BranchService, 
		private departmentService:DepartmentService, 
		private userService:UserService,
		private statusService:StatusService,
		private router: Router) {
			this.hide = true;
			this.confirmhide = true;
	}

	ngOnInit() {
		this.organizationService.findAll().subscribe((organizations) => {
			this.organizations = organizations;
			this.branchService.findAll().subscribe((branches) => {
				this.branches = branches;
				this.departmentService.findAll().subscribe((departments) => {
					this.departments = departments;
					this.registrationForm = this.createRegistrationForm();
				})
			})
		})
		this.statusService.findByName("Active").subscribe((status:Status) => {
			this.status = status;
		})
	}

	createRegistrationForm():FormGroup {
		let registrationForm = new FormGroup({
			firstName: new FormControl('', [
				Validators.required, 
				Validators.minLength(3),
				Validators.maxLength(60),
				Validators.pattern("^[a-zA-Z ]*$")
			]),
			lastName: new FormControl('', [
				Validators.required, 
				Validators.minLength(3),
				Validators.maxLength(60),
				Validators.pattern("^[a-zA-Z ]*$")
			]),
			department: new FormControl('', [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(120)
			]),
			branch: new FormControl('', [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(120)
			]),
			organization: new FormControl('', [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(120)
			]),
			emailAddress: new FormControl('', [
				Validators.required, 
				Validators.minLength(3),
				Validators.maxLength(120),
				Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
			]),
			password: new FormControl('', [
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
		})
		registrationForm.setValidators(ComparePassword("password", "confirmPassword"));
		return registrationForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.registrationForm.controls[controlName].hasError(errorName);
	}

	public save() {
		let user = new User(0, this.registrationForm.get("organization").value,
			this.registrationForm.get("branch").value,
			this.registrationForm.get("department").value,
			this.registrationForm.get("firstName").value,
			this.registrationForm.get("lastName").value,
			this.registrationForm.get("emailAddress").value,
			this.registrationForm.get("password").value);
			user.status = this.status;
		this.userService.save(user).subscribe((users:User[]) => {
			this.router.navigate(['/login']);
		})
	}

	public doLogin() {
		this.router.navigateByUrl('/login');
	}

	public doForgotPassword() {
		this.router.navigateByUrl('/forgotpassword');
	}

}
