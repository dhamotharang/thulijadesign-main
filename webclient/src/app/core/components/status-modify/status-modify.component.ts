import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { Status } from '../../../shared/models/core/status';
import { StatusService } from '../../../shared/services/core/status.service';

@Component({
	selector: 'app-status-modify',
	templateUrl: './status-modify.component.html',
	styleUrls: ['./status-modify.component.css']
})
export class StatusModifyComponent implements OnInit {

	public statusForm:FormGroup;
	public errorMessage:string;

	constructor(private statusService:StatusService,
		private dialogRef: MatDialogRef<StatusModifyComponent>,
		@Inject(MAT_DIALOG_DATA) public status:Status) {
	}

	ngOnInit() {
		if (this.status.id === 0) {
			this.statusForm = this.createStatusForm();
		} else {
			this.statusForm = this.editStatusForm();
		}
	}

	createStatusForm():FormGroup {
		let statusForm = new FormGroup({
			sequence: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.min(1),
					Validators.max(25),
					Validators.pattern("^[0-9]*$")
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
		return statusForm;
	}

	editStatusForm():FormGroup {
		let statusForm = new FormGroup({
			sequence: new FormControl(this.status.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(25)
			]), 
			name: new FormControl(this.status.name, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			byDefault: new FormControl(
				Boolean(Number(this.status.byDefault)))
		})
		return statusForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.statusForm.controls[controlName].hasError(errorName);
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

	public save(status:Status) {
		if (this.statusForm.valid) {
			if (this.status.id === 0) {
				this.statusService.save(status).subscribe((statuses) => {
					this.dialogRef.close(statuses);
				}, (error) => {
					this.errorMessage = error.message;
				})
			} else {
				status.id = this.status.id;
				this.statusService.update(status.id, status).subscribe((statuses) => {
					this.dialogRef.close(statuses);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		} else {
			this.validateAllFormFields(this.statusForm);
		}
	}

	public onCancel() {
		this.dialogRef.close();
	}

}
