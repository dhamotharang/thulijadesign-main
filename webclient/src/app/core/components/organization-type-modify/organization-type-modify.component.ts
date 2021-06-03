import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { OrganizationType } from '../../../shared/models/core/organization-type';
import { OrganizationTypeService } from '../../../shared/services/core/organization-type.service';

@Component({
	selector: 'app-organization-type-modify',
	templateUrl: './organization-type-modify.component.html',
	styleUrls: ['./organization-type-modify.component.css']
})
export class OrganizationTypeModifyComponent implements OnInit {

	public organizationTypeForm:FormGroup;
	public errorMessage:string;

	constructor(private organizationTypeService:OrganizationTypeService,
		private dialogRef: MatDialogRef<OrganizationTypeModifyComponent>,
		@Inject(MAT_DIALOG_DATA) public organizationType:OrganizationType) {
	}

	ngOnInit() {
		if (this.organizationType.id === 0) {
			this.organizationTypeForm = this.createOrganizationTypeForm();
		} else {
			this.organizationTypeForm = this.editOrganizationTypeForm();
		}
	}

	createOrganizationTypeForm():FormGroup {
		let organizationTypeForm = new FormGroup({
			sequence: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.min(1),
					Validators.max(2000),
					Validators.pattern("^[0-9]*$")
				]
			}),
			code: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(1),
					Validators.maxLength(10)
				]
			}),
			name: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(1),
					Validators.maxLength(150)
				]
			}),
			byDefault: new FormControl(0)
		})
		return organizationTypeForm;
	}

	editOrganizationTypeForm():FormGroup {
		let organizationTypeForm = new FormGroup({
			sequence: new FormControl(this.organizationType.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(2000)
			]), 
			code: new FormControl(this.organizationType.code, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(10)
			]), 
			name: new FormControl(this.organizationType.name, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(150)
			]), 
			byDefault: new FormControl(
				Boolean(Number(this.organizationType.byDefault)))
		})
		return organizationTypeForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.organizationTypeForm.controls[controlName].hasError(errorName);
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

	public save(organizationType:OrganizationType) {
		if (this.organizationTypeForm.valid) {
			if (this.organizationType.id === 0) {
				this.organizationTypeService.save(organizationType).subscribe((organizationTypes) => {
					this.dialogRef.close(organizationTypes);
				}, (error) => {
					this.errorMessage = error.message;
				})
			} else {
				organizationType.id = this.organizationType.id;
				this.organizationTypeService.update(organizationType.id, organizationType).subscribe((organizationTypes) => {
					this.dialogRef.close(organizationTypes);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		} else {
			this.validateAllFormFields(this.organizationTypeForm);
		}
	}

	public onCancel() {
		this.dialogRef.close();
	}

}
