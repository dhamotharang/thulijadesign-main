import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { Religion } from '../../../shared/models/general/religion';
import { ReligionService } from '../../../shared/services/general/religion.service';

@Component({
	selector: 'app-religion-modify',
	templateUrl: './religion-modify.component.html',
	styleUrls: ['./religion-modify.component.css']
})
export class ReligionModifyComponent implements OnInit {

	public religionForm:FormGroup;
	public errorMessage:string;

	constructor(private religionService:ReligionService,
		private dialogRef: MatDialogRef<ReligionModifyComponent>,
		@Inject(MAT_DIALOG_DATA) public religion:Religion) {
	}

	ngOnInit() {
		if (this.religion.id === 0) {
			this.religionForm = this.createReligionForm();
		} else {
			this.religionForm = this.editReligionForm();
		}
	}

	createReligionForm():FormGroup {
		let religionForm = new FormGroup({
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
					Validators.maxLength(60)
				]
			}),
			byDefault: new FormControl(0)
		})
		return religionForm;
	}

	editReligionForm():FormGroup {
		let religionForm = new FormGroup({
			sequence: new FormControl(this.religion.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(2000)
			]), 
			code: new FormControl(this.religion.code, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(10)
			]), 
			name: new FormControl(this.religion.name, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			byDefault: new FormControl(
				Boolean(Number(this.religion.byDefault)))
		})
		return religionForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.religionForm.controls[controlName].hasError(errorName);
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

	public save(religion:Religion) {
		if (this.religionForm.valid) {
			if (this.religion.id === 0) {
				this.religionService.save(religion).subscribe((religions) => {
					this.dialogRef.close(religions);
				}, (error) => {
					this.errorMessage = error.message;
				})
			} else {
				religion.id = this.religion.id;
				this.religionService.update(religion.id, religion).subscribe((religions) => {
					this.dialogRef.close(religions);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		} else {
			this.validateAllFormFields(this.religionForm);
		}
	}

	public onCancel() {
		this.dialogRef.close();
	}

}
