import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { FieldStudy } from '../../../shared/models/general/field-study';
import { FieldStudyService } from '../../../shared/services/general/field-study.service';

@Component({
	selector: 'app-field-study-modify',
	templateUrl: './field-study-modify.component.html',
	styleUrls: ['./field-study-modify.component.css']
})
export class FieldStudyModifyComponent implements OnInit {

	public fieldStudyForm:FormGroup;
	public errorMessage:string;

	constructor(private fieldStudyService:FieldStudyService,
		private dialogRef: MatDialogRef<FieldStudyModifyComponent>,
		@Inject(MAT_DIALOG_DATA) public fieldStudy:FieldStudy) {
	}

	ngOnInit() {
		if (this.fieldStudy.id === 0) {
			this.fieldStudyForm = this.createFieldStudyForm();
		} else {
			this.fieldStudyForm = this.editFieldStudyForm();
		}
	}

	createFieldStudyForm():FormGroup {
		let fieldStudyForm = new FormGroup({
			sequence: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.min(1),
					Validators.max(500),
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
		return fieldStudyForm;
	}

	editFieldStudyForm():FormGroup {
		let fieldStudyForm = new FormGroup({
			sequence: new FormControl(this.fieldStudy.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(500)
			]), 
			code: new FormControl(this.fieldStudy.code, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(10)
			]), 
			name: new FormControl(this.fieldStudy.name, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			byDefault: new FormControl(
				Boolean(Number(this.fieldStudy.byDefault)))
		})
		return fieldStudyForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.fieldStudyForm.controls[controlName].hasError(errorName);
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

	public save(fieldStudy:FieldStudy) {
		if (this.fieldStudyForm.valid) {
			if (this.fieldStudy.id === 0) {
				this.fieldStudyService.save(fieldStudy).subscribe((fieldStudies) => {
					this.dialogRef.close(fieldStudies);
				}, (error) => {
					this.errorMessage = error.message;
				})
			} else {
				fieldStudy.id = this.fieldStudy.id;
				this.fieldStudyService.update(fieldStudy.id, fieldStudy).subscribe((fieldStudies) => {
					this.dialogRef.close(fieldStudies);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		} else {
			this.validateAllFormFields(this.fieldStudyForm);
		}
	}

	public onCancel() {
		this.dialogRef.close();
	}

}
