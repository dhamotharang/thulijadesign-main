import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrganizationTypeService } from '../../services/core/organization-type.service';
import { OrganizationType } from '../../models/core/organization-type';
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
	selector: 'app-setup',
	templateUrl: './setup.component.html',
	styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

	setupForm:FormGroup;
	hide:boolean;
	confirmhide:boolean;
	message:string;
	status:Status;

	constructor(private organizationTypeService:OrganizationTypeService,
		private organizationService:OrganizationService, 
		private branchService:BranchService, 
		private departmentService:DepartmentService, 
		private userService:UserService,
		private statusService:StatusService,
		private router: Router) {
			this.hide = true;
			this.confirmhide = true;
	}
	
	ngOnInit() {
		this.userService.count().subscribe((count:number) => {
			if (count > 0) {
				this.router.navigate(['/login']);
			} else {
				let status:Status = new Status(0, 1, "Active", true);
				this.statusService.save(status).subscribe((statuses) => {
					this.status = statuses[0];
					this.setupForm = this.createSetupForm();					
				})
			}
		});
	}

	createSetupForm():FormGroup {
		let setupForm = new FormGroup({
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
				Validators.minLength(3),
				Validators.maxLength(120),
				Validators.pattern("^[a-zA-Z ]*$")
			]),
			branch: new FormControl('', [
				Validators.required, 
				Validators.minLength(3),
				Validators.maxLength(120),
				Validators.pattern("^[a-zA-Z ]*$")
			]),
			organization: new FormControl('', [
				Validators.required, 
				Validators.minLength(3),
				Validators.maxLength(120),
				Validators.pattern("^[a-zA-Z ]*$")
			]),
			username: new FormControl('', [
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
		});
		setupForm.setValidators(ComparePassword("password", "confirmPassword"));
		return setupForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.setupForm.controls[controlName].hasError(errorName);
	}

	save() {
		if (this.setupForm.valid) {
			let organizationName:string = this.setupForm.get("organization").value;
			let branchName:string = this.setupForm.get("branch").value;
			let departmentName:string = this.setupForm.get("department").value;
			let strFirstName:string = this.setupForm.get("firstName").value;
			let strLastName:string = this.setupForm.get("firstName").value;
			let strUsername:string = this.setupForm.get("username").value;
			let strPassword:string = this.setupForm.get("password").value;
			let organizationType:OrganizationType = new OrganizationType(0, 1, "Default", "Default", true);
			this.organizationTypeService.save(organizationType).subscribe(
					(organizationTypes:OrganizationType[]) => {
				organizationType = organizationTypes[0];
				let organization:Organization = new Organization(0, organizationType, 
					organizationName, organizationName, "", "", true, true);
				this.organizationService.save(organization).subscribe(
						(organizations:Organization[]) => {
					organization = organizations[0];
					let branch:Branch = new Branch(0, 1, organization, branchName, branchName);
					this.branchService.save(branch).subscribe((branches:Branch[]) => {
						branch = branches[0];
						let department:Department = new Department(0, 1, organization, branch,  
							departmentName, departmentName);
						this.departmentService.save(department).subscribe((departments:Department[]) => {
							department = departments[0];
							let user:User = new User(0, organization, branch, department, 
								strFirstName, strLastName, strUsername, strPassword);
							user.status = this.status;
							this.userService.save(user).subscribe((users:User[]) => {
								this.router.navigate(['/login']);
							})
						})
					})
				})
			});
		} else {
			this.message = "SETUP-ERROR-MESSAGE";
		}
	}

}