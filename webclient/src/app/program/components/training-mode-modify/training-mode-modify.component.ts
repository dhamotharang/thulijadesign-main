import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { TrainingMode } from '../../../shared/models/program/training-mode';
import { TrainingModeService } from '../../../shared/services/program/training-mode.service';

@Component({
	selector: 'app-training-mode-modify',
	templateUrl: './training-mode-modify.component.html',
	styleUrls: ['./training-mode-modify.component.css']
})
export class TrainingModeModifyComponent implements OnInit {

	public trainingModeForm:FormGroup;
	public errorMessage:string;

	constructor(private trainingModeService:TrainingModeService,
		private dialogRef: MatDialogRef<TrainingModeModifyComponent>,
		@Inject(MAT_DIALOG_DATA) public trainingMode:TrainingMode) {
	}

	ngOnInit() {
		if (this.trainingMode.id === 0) {
			this.trainingModeForm = this.createTrainingModeForm();
		} else {
			this.trainingModeForm = this.editTrainingModeForm();
		}
	}

	createTrainingModeForm():FormGroup {
		let trainingModeForm = new FormGroup({
			sequence: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.min(1),
					Validators.max(2000),
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
			description: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(1),
					Validators.maxLength(250)
				]
			}),
			byDefault: new FormControl(0)
		})
		return trainingModeForm;
	}

	editTrainingModeForm():FormGroup {
		let trainingModeForm = new FormGroup({
			sequence: new FormControl(this.trainingMode.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(2000)
			]), 
			name: new FormControl(this.trainingMode.name, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			description: new FormControl(this.trainingMode.description, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(250)
			]), 
			byDefault: new FormControl(
				Boolean(Number(this.trainingMode.byDefault)))
		})
		return trainingModeForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.trainingModeForm.controls[controlName].hasError(errorName);
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

	public save(trainingMode:TrainingMode) {
		if (this.trainingModeForm.valid) {
			if (this.trainingMode.id === 0) {
				this.trainingModeService.save(trainingMode).subscribe((trainingModes) => {
					this.dialogRef.close(trainingModes);
				}, (error) => {
					this.errorMessage = error.message;
				})
			} else {
				trainingMode.id = this.trainingMode.id;
				this.trainingModeService.update(trainingMode.id, trainingMode).subscribe((trainingModes) => {
					this.dialogRef.close(trainingModes);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		} else {
			this.validateAllFormFields(this.trainingModeForm);
		}
	}

	public onCancel() {
		this.dialogRef.close();
	}

}
