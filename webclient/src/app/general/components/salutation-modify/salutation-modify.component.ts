import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { Salutation } from '../../../shared/models/general/salutation';
import { SalutationService } from '../../../shared/services/general/salutation.service';

@Component({
	selector: 'app-salutation-modify',
	templateUrl: './salutation-modify.component.html',
	styleUrls: ['./salutation-modify.component.css']
})
export class SalutationModifyComponent implements OnInit {

	public salutationForm:FormGroup;
	public errorMessage:string;

	constructor(private salutationService:SalutationService,
		private dialogRef: MatDialogRef<SalutationModifyComponent>,
		@Inject(MAT_DIALOG_DATA) public salutation:Salutation) {
	}

	ngOnInit() {
		if (this.salutation.id === 0) {
			this.salutationForm = this.createSalutationForm();
		} else {
			this.salutationForm = this.editSalutationForm();
		}
	}

	createSalutationForm():FormGroup {
		let salutationForm = new FormGroup({
			sequence: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.min(1),
					Validators.max(20),
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
					Validators.maxLength(60)
				]
			}),
			byDefault: new FormControl(0)
		})
		return salutationForm;
	}

	editSalutationForm():FormGroup {
		let salutationForm = new FormGroup({
			sequence: new FormControl(this.salutation.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(20)
			]), 
			code: new FormControl(this.salutation.code, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(10)
			]), 
			name: new FormControl(this.salutation.name, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			byDefault: new FormControl(
				Boolean(Number(this.salutation.byDefault)))
		})
		return salutationForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.salutationForm.controls[controlName].hasError(errorName);
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

	public save(salutation:Salutation) {
		if (this.salutationForm.valid) {
			if (this.salutation.id === 0) {
				this.salutationService.save(salutation).subscribe((salutations) => {
					this.dialogRef.close(salutations);
				}, (error) => {
					this.errorMessage = error.message;
				})
			} else {
				salutation.id = this.salutation.id;
				this.salutationService.update(salutation.id, salutation).subscribe((salutations) => {
					this.dialogRef.close(salutations);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		} else {
			this.validateAllFormFields(this.salutationForm);
		}
	}

	public onCancel() {
		this.dialogRef.close();
	}

}
