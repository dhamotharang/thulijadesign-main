import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { ScholarRegistration } from '../../../shared/models/registration/scholar-registration';
import { ScholarRegistrationService } from '../../../shared/services/registration/scholar-registration.service';

@Component({
	selector: 'app-scholar-registration-email-verification',
	templateUrl: './scholar-registration-email-verification.component.html',
	styleUrls: ['./scholar-registration-email-verification.component.css']
})
export class ScholarRegistrationEmailVerificationComponent implements OnInit {

	public scholarRegistrationEmailVerificationForm:FormGroup;

	constructor(private dialogRef: MatDialogRef<ScholarRegistrationEmailVerificationComponent>,
		@Inject(MAT_DIALOG_DATA) public scholarRegistration:ScholarRegistration) {
	}

	ngOnInit() {
		this.scholarRegistrationEmailVerificationForm = this.createScholarRegistrationEmailVerificationForm();
	}

	createScholarRegistrationEmailVerificationForm():FormGroup {
		let scholarRegistrationEmailVerificationForm = new FormGroup({
			emailAddress: new FormControl(this.scholarRegistration.emailAddress, {
				validators: [
					Validators.required, 
					Validators.minLength(3),
					Validators.maxLength(120),
					Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
				],
				asyncValidators: [
				],
				updateOn: 'blur'
			}),
			verificationCode: new FormControl('', {
				validators: [
					Validators.required,
					Validators.min(100000),
					Validators.max(999999),
					Validators.pattern("^[0-9]*$")
				],
				asyncValidators: [
				],
				updateOn: 'blur'
			})
		})
		return scholarRegistrationEmailVerificationForm;
	}

	public hasVerificationError = (controlName:string, errorName:string):boolean => {
		return this.scholarRegistrationEmailVerificationForm.controls[controlName].hasError(errorName);
	}

	public closeDialog() {
		this.dialogRef.close();
	}

	public confirm(element:any) {
		this.dialogRef.close(true);
	}

}