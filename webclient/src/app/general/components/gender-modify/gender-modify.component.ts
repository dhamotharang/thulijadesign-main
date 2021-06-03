import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { Gender } from '../../../shared/models/general/gender';
import { GenderService } from '../../../shared/services/general/gender.service';

@Component({
	selector: 'app-gender-modify',
	templateUrl: './gender-modify.component.html',
	styleUrls: ['./gender-modify.component.css']
})
export class GenderModifyComponent implements OnInit {

	public genderForm:FormGroup;
	public errorMessage:string;

	constructor(private genderService:GenderService,
		private dialogRef: MatDialogRef<GenderModifyComponent>,
		@Inject(MAT_DIALOG_DATA) public gender:Gender) {
	}

	ngOnInit() {
		if (this.gender.id === 0) {
			this.genderForm = this.createGenderForm();
		} else {
			this.genderForm = this.editGenderForm();
		}
	}

	createGenderForm():FormGroup {
		let genderForm = new FormGroup({
			sequence: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.min(1),
					Validators.max(10),
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
		return genderForm;
	}

	editGenderForm():FormGroup {
		let genderForm = new FormGroup({
			sequence: new FormControl(this.gender.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(10)
			]), 
			code: new FormControl(this.gender.code, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(10)
			]), 
			name: new FormControl(this.gender.name, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			byDefault: new FormControl(
				Boolean(Number(this.gender.byDefault)))
		})
		return genderForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.genderForm.controls[controlName].hasError(errorName);
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

	public save(gender:Gender) {
		if (this.genderForm.valid) {
			if (this.gender.id === 0) {
				this.genderService.save(gender).subscribe((genders) => {
					this.dialogRef.close(genders);
				}, (error) => {
					this.errorMessage = error.message;
				})
			} else {
				gender.id = this.gender.id;
				this.genderService.update(gender.id, gender).subscribe((genders) => {
					this.dialogRef.close(genders);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		} else {
			this.validateAllFormFields(this.genderForm);
		}
	}

	public onCancel() {
		this.dialogRef.close();
	}

}
