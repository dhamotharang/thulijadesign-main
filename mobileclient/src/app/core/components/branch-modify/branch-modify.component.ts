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

@Component({
	selector: 'app-branch-modify',
	templateUrl: './branch-modify.component.html',
	styleUrls: ['./branch-modify.component.scss']
})
export class BranchModifyComponent implements OnInit {

	public branchForm:FormGroup;
	public branch:Branch;
	public organizations:Organization[];
	public currentOrganization:Organization;
	public errorMessage:string;

	compareOrganization = (currentorganization: Organization, organization: Organization) => currentorganization.id == organization.id;

	constructor(private branchService:BranchService,
			private organizationService:OrganizationService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.branch = this.navParams.get('branch');
		this.organizationService.findAllByLookup().subscribe(organizations => {
			this.organizations = organizations;
		})
	}

	ngOnInit() {
		if (this.branch.id === 0) {
			this.branchForm = this.createBranchForm();
		} else {
			this.branchForm = this.editBranchForm();
		}
	}

	createBranchForm():FormGroup {
		let branchForm = new FormGroup({
			sequence: new FormControl(this.branch.sequence, {
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
		return branchForm;
	}

	editBranchForm():FormGroup {
		this.currentOrganization = this.branch.organization;
		let branchForm = new FormGroup({
			sequence: new FormControl(this.branch.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(2000)
			]), 
			organization: new FormControl(this.branch.organization, [
			]), 
			abbreviation: new FormControl(this.branch.abbreviation, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(50)
			]), 
			name: new FormControl(this.branch.name, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(150)
			])
		})
		return branchForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.branchForm.controls[controlName].hasError(errorName);
	}

	public save(branch:Branch) {
		if (this.branch.id === 0) {
			this.branchService.save(branch).subscribe((branches) => {
				this.modalController.dismiss({ 'dismissed': true, 'branches':branches });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			branch.id = this.branch.id;
			this.branchService.update(branch.id, branch).subscribe((branches) => {
				this.modalController.dismiss({ 'dismissed': true, 'branches':branches });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
