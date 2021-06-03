import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { Country } from '../../../shared/models/general/country';
import { CountryService } from '../../../shared/services/general/country.service';

@Component({
	selector: 'app-country-modify',
	templateUrl: './country-modify.component.html',
	styleUrls: ['./country-modify.component.css']
})
export class CountryModifyComponent implements OnInit {

	public countryForm:FormGroup;
	public errorMessage:string;

	constructor(private countryService:CountryService,
		private dialogRef: MatDialogRef<CountryModifyComponent>,
		@Inject(MAT_DIALOG_DATA) public country:Country) {
	}

	ngOnInit() {
		if (this.country.id === 0) {
			this.countryForm = this.createCountryForm();
		} else {
			this.countryForm = this.editCountryForm();
		}
	}

	createCountryForm():FormGroup {
		let countryForm = new FormGroup({
			sequence: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.min(1),
					Validators.max(400),
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
		return countryForm;
	}

	editCountryForm():FormGroup {
		let countryForm = new FormGroup({
			sequence: new FormControl(this.country.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(400)
			]), 
			code: new FormControl(this.country.code, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(10)
			]), 
			name: new FormControl(this.country.name, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			byDefault: new FormControl(
				Boolean(Number(this.country.byDefault)))
		})
		return countryForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.countryForm.controls[controlName].hasError(errorName);
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

	public save(country:Country) {
		if (this.countryForm.valid) {
			if (this.country.id === 0) {
				this.countryService.save(country).subscribe((countries) => {
					this.dialogRef.close(countries);
				}, (error) => {
					this.errorMessage = error.message;
				})
			} else {
				country.id = this.country.id;
				this.countryService.update(country.id, country).subscribe((countries) => {
					this.dialogRef.close(countries);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		} else {
			this.validateAllFormFields(this.countryForm);
		}
	}

	public onCancel() {
		this.dialogRef.close();
	}

}
