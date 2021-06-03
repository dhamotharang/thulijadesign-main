import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { MaritalStatus } from '../../../shared/models/general/marital-status';
import { MaritalStatusService } from '../../../shared/services/general/marital-status.service';

@Component({
	selector: 'app-marital-status-modify',
	templateUrl: './marital-status-modify.component.html',
	styleUrls: ['./marital-status-modify.component.css']
})
export class MaritalStatusModifyComponent implements OnInit {

	public maritalStatusForm:FormGroup;
	public errorMessage:string;

	constructor(private maritalStatusService:MaritalStatusService,
		private dialogRef: MatDialogRef<MaritalStatusModifyComponent>,
		@Inject(MAT_DIALOG_DATA) public maritalStatus:MaritalStatus) {
	}

	ngOnInit() {
		if (this.maritalStatus.id === 0) {
			this.maritalStatusForm = this.createMaritalStatusForm();
		} else {
			this.maritalStatusForm = this.editMaritalStatusForm();
		}
	}

	createMaritalStatusForm():FormGroup {
		let maritalStatusForm = new FormGroup({
			sequence: new FormControl('', {
				validators: [
					Validators.required, 
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
		return maritalStatusForm;
	}

	editMaritalStatusForm():FormGroup {
		let maritalStatusForm = new FormGroup({
			sequence: new FormControl(this.maritalStatus.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.max(10)
			]), 
			code: new FormControl(this.maritalStatus.code, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(10)
			]), 
			name: new FormControl(this.maritalStatus.name, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			byDefault: new FormControl(
				Boolean(Number(this.maritalStatus.byDefault)))
		})
		return maritalStatusForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.maritalStatusForm.controls[controlName].hasError(errorName);
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

	public save(maritalStatus:MaritalStatus) {
		if (this.maritalStatusForm.valid) {
			if (this.maritalStatus.id === 0) {
				this.maritalStatusService.save(maritalStatus).subscribe((maritalStatuses) => {
					this.dialogRef.close(maritalStatuses);
				}, (error) => {
					this.errorMessage = error.message;
				})
			} else {
				maritalStatus.id = this.maritalStatus.id;
				this.maritalStatusService.update(maritalStatus.id, maritalStatus).subscribe((maritalStatuses) => {
					this.dialogRef.close(maritalStatuses);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		} else {
			this.validateAllFormFields(this.maritalStatusForm);
		}
	}

	public onCancel() {
		this.dialogRef.close();
	}

}
