import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { PositionLevel } from '../../../shared/models/general/position-level';
import { PositionLevelService } from '../../../shared/services/general/position-level.service';

@Component({
	selector: 'app-position-level-modify',
	templateUrl: './position-level-modify.component.html',
	styleUrls: ['./position-level-modify.component.css']
})
export class PositionLevelModifyComponent implements OnInit {

	public positionLevelForm:FormGroup;
	public errorMessage:string;

	constructor(private positionLevelService:PositionLevelService,
		private dialogRef: MatDialogRef<PositionLevelModifyComponent>,
		@Inject(MAT_DIALOG_DATA) public positionLevel:PositionLevel) {
	}

	ngOnInit() {
		if (this.positionLevel.id === 0) {
			this.positionLevelForm = this.createPositionLevelForm();
		} else {
			this.positionLevelForm = this.editPositionLevelForm();
		}
	}

	createPositionLevelForm():FormGroup {
		let positionLevelForm = new FormGroup({
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
		return positionLevelForm;
	}

	editPositionLevelForm():FormGroup {
		let positionLevelForm = new FormGroup({
			sequence: new FormControl(this.positionLevel.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(500)
			]), 
			code: new FormControl(this.positionLevel.code, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(10)
			]), 
			name: new FormControl(this.positionLevel.name, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			byDefault: new FormControl(
				Boolean(Number(this.positionLevel.byDefault)))
		})
		return positionLevelForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.positionLevelForm.controls[controlName].hasError(errorName);
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

	public save(positionLevel:PositionLevel) {
		if (this.positionLevelForm.valid) {
			if (this.positionLevel.id === 0) {
				this.positionLevelService.save(positionLevel).subscribe((positionLevels) => {
					this.dialogRef.close(positionLevels);
				}, (error) => {
					this.errorMessage = error.message;
				})
			} else {
				positionLevel.id = this.positionLevel.id;
				this.positionLevelService.update(positionLevel.id, positionLevel).subscribe((positionLevels) => {
					this.dialogRef.close(positionLevels);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		} else {
			this.validateAllFormFields(this.positionLevelForm);
		}
	}

	public onCancel() {
		this.dialogRef.close();
	}

}
