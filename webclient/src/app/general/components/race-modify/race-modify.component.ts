import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { Race } from '../../../shared/models/general/race';
import { RaceService } from '../../../shared/services/general/race.service';

@Component({
	selector: 'app-race-modify',
	templateUrl: './race-modify.component.html',
	styleUrls: ['./race-modify.component.css']
})
export class RaceModifyComponent implements OnInit {

	public raceForm:FormGroup;
	public errorMessage:string;

	constructor(private raceService:RaceService,
		private dialogRef: MatDialogRef<RaceModifyComponent>,
		@Inject(MAT_DIALOG_DATA) public race:Race) {
	}

	ngOnInit() {
		if (this.race.id === 0) {
			this.raceForm = this.createRaceForm();
		} else {
			this.raceForm = this.editRaceForm();
		}
	}

	createRaceForm():FormGroup {
		let raceForm = new FormGroup({
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
		return raceForm;
	}

	editRaceForm():FormGroup {
		let raceForm = new FormGroup({
			sequence: new FormControl(this.race.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(20)
			]), 
			code: new FormControl(this.race.code, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(10)
			]), 
			name: new FormControl(this.race.name, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			byDefault: new FormControl(
				Boolean(Number(this.race.byDefault)))
		})
		return raceForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.raceForm.controls[controlName].hasError(errorName);
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

	public save(race:Race) {
		if (this.raceForm.valid) {
			if (this.race.id === 0) {
				this.raceService.save(race).subscribe((races) => {
					this.dialogRef.close(races);
				}, (error) => {
					this.errorMessage = error.message;
				})
			} else {
				race.id = this.race.id;
				this.raceService.update(race.id, race).subscribe((races) => {
					this.dialogRef.close(races);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		} else {
			this.validateAllFormFields(this.raceForm);
		}
	}

	public onCancel() {
		this.dialogRef.close();
	}

}
