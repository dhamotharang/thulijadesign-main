import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { Organization } from '../../../shared/models/core/organization';
import { OrganizationService } from '../../../shared/services/core/organization.service';
import { Branch } from '../../../shared/models/core/branch';
import { BranchService } from '../../../shared/services/core/branch.service';
import { Department } from '../../../shared/models/core/department';
import { DepartmentService } from '../../../shared/services/core/department.service';

@Component({
	selector: 'app-department-modify',
	templateUrl: './department-modify.component.html',
	styleUrls: ['./department-modify.component.scss']
})
export class DepartmentModifyComponent implements OnInit {

	public departmentForm:FormGroup;
	public department:Department;
	public organizations:Organization[];
	public currentOrganization:Organization;
	public branches:Branch[];
	public currentBranch:Branch;
	public errorMessage:string;

	compareOrganization = (currentorganization: Organization, organization: Organization) => currentorganization.id == organization.id;

	compareBranch = (currentbranch: Branch, branch: Branch) => currentbranch.id == branch.id;

	constructor(private departmentService:DepartmentService,
			private organizationService:OrganizationService,
			private branchService:BranchService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.department = this.navParams.get('department');
		this.organizationService.findAllByLookup().subscribe(organizations => {
			this.organizations = organizations;
		})
		this.branchService.findAllByLookup().subscribe(branches => {
			this.branches = branches;
		})
	}

	ngOnInit() {
		if (this.department.id === 0) {
			this.departmentForm = this.createDepartmentForm();
			this.departmentForm.get('organization').valueChanges.subscribe(item => {
				this.departmentForm.get('branch').setValue('');
			}, (error) => {
				this.errorMessage = error.message;
			})
		} else {
			this.departmentForm = this.editDepartmentForm();
			this.departmentForm.get('organization').valueChanges.subscribe(item => {
				this.departmentForm.get('branch').setValue('');
			}, (error) => {
				this.errorMessage = error.message;
			})
		}
	}

	createDepartmentForm():FormGroup {
		let departmentForm = new FormGroup({
			sequence: new FormControl(this.department.sequence, {
				validators: [
					Validators.required, 
					Validators.min(1),
					Validators.max(2000),
					Validators.pattern("^[0-9]*$")
				]
			}),
			organization: new FormControl('', {
				validators: [
				]
			}),
			branch: new FormControl('', {
				validators: [
				]
			}),
			abbreviation: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(1),
					Validators.maxLength(50)
				]
			}),
			name: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(1),
					Validators.maxLength(150)
				]
			})
		})
		return departmentForm;
	}

	editDepartmentForm():FormGroup {
		this.currentOrganization = this.department.organization;
		this.currentBranch = this.department.branch;
		let departmentForm = new FormGroup({
			sequence: new FormControl(this.department.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(2000)
			]), 
			organization: new FormControl(this.department.organization, [
			]), 
			branch: new FormControl(this.department.branch, [
			]), 
			abbreviation: new FormControl(this.department.abbreviation, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(50)
			]), 
			name: new FormControl(this.department.name, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(150)
			])
		})
		return departmentForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.departmentForm.controls[controlName].hasError(errorName);
	}

	public save(department:Department) {
		if (this.department.id === 0) {
			this.departmentService.save(department).subscribe((departments) => {
				this.modalController.dismiss({ 'dismissed': true, 'departments':departments });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			department.id = this.department.id;
			this.departmentService.update(department.id, department).subscribe((departments) => {
				this.modalController.dismiss({ 'dismissed': true, 'departments':departments });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
