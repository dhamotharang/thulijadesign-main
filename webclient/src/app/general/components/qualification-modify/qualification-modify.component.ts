import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { Qualification } from '../../../shared/models/general/qualification';
import { QualificationService } from '../../../shared/services/general/qualification.service';

@Component({
	selector: 'app-qualification-modify',
	templateUrl: './qualification-modify.component.html',
	styleUrls: ['./qualification-modify.component.css']
})
export class QualificationModifyComponent implements OnInit {

	public qualificationForm:FormGroup;
	public errorMessage:string;

	constructor(private qualificationService:QualificationService,
		private dialogRef: MatDialogRef<QualificationModifyComponent>,
		@Inject(MAT_DIALOG_DATA) public qualification:Qualification) {
	}

	ngOnInit() {
		if (this.qualification.id === 0) {
			this.qualificationForm = this.createQualificationForm();
		} else {
			this.qualificationForm = this.editQualificationForm();
		}
	}

	createQualificationForm():FormGroup {
		let qualificationForm = new FormGroup({
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
		return qualificationForm;
	}

	editQualificationForm():FormGroup {
		let qualificationForm = new FormGroup({
			sequence: new FormControl(this.qualification.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(500)
			]), 
			code: new FormControl(this.qualification.code, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(10)
			]), 
			name: new FormControl(this.qualification.name, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			byDefault: new FormControl(
				Boolean(Number(this.qualification.byDefault)))
		})
		return qualificationForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.qualificationForm.controls[controlName].hasError(errorName);
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

	public save(qualification:Qualification) {
		if (this.qualificationForm.valid) {
			if (this.qualification.id === 0) {
				this.qualificationService.save(qualification).subscribe((qualifications) => {
					this.dialogRef.close(qualifications);
				}, (error) => {
					this.errorMessage = error.message;
				})
			} else {
				qualification.id = this.qualification.id;
				this.qualificationService.update(qualification.id, qualification).subscribe((qualifications) => {
					this.dialogRef.close(qualifications);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		} else {
			this.validateAllFormFields(this.qualificationForm);
		}
	}

	public onCancel() {
		this.dialogRef.close();
	}

}
