import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { Country } from '../../../shared/models/general/country';
import { CountryService } from '../../../shared/services/general/country.service';
import { Citizen } from '../../../shared/models/general/citizen';
import { CitizenService } from '../../../shared/services/general/citizen.service';

@Component({
	selector: 'app-citizen-modify',
	templateUrl: './citizen-modify.component.html',
	styleUrls: ['./citizen-modify.component.css']
})
export class CitizenModifyComponent implements OnInit {

	public citizenForm:FormGroup;
	public countries:Country[];
	public currentCountry:Country;
	public errorMessage:string;

	compareCountry = (currentcountry: Country, country: Country) => currentcountry.id == country.id;
	
	constructor(private citizenService:CitizenService,
		private countryService:CountryService,
		private dialogRef: MatDialogRef<CitizenModifyComponent>,
		@Inject(MAT_DIALOG_DATA) public citizen:Citizen) {
			this.countryService.findAllByLookup().subscribe(countries => {
				this.countries = countries;
				if (this.citizen.id === 0) {
					this.countries.forEach((country) => {
						if (country.byDefault == true) this.citizenForm.controls['country'].setValue(country);
					}, (error) => {
						this.errorMessage = error.message;
					})
				}
			})
	}

	ngOnInit() {
		if (this.citizen.id === 0) {
			this.citizenForm = this.createCitizenForm();
		} else {
			this.citizenForm = this.editCitizenForm();
		}
	}

	createCitizenForm():FormGroup {
		let citizenForm = new FormGroup({
			sequence: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.min(1),
					Validators.max(500),
					Validators.pattern("^[0-9]*$")
				]
			}),
			country: new FormControl('', {
				validators: [
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
		return citizenForm;
	}

	editCitizenForm():FormGroup {
		this.currentCountry = this.citizen.country;
		let citizenForm = new FormGroup({
			sequence: new FormControl(this.citizen.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(500)
			]), 
			country: new FormControl(this.citizen.country, [
			]), 
			code: new FormControl(this.citizen.code, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(10)
			]), 
			name: new FormControl(this.citizen.name, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			byDefault: new FormControl(
				Boolean(Number(this.citizen.byDefault)))
		})
		return citizenForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.citizenForm.controls[controlName].hasError(errorName);
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

	public save(citizen:Citizen) {
		if (this.citizenForm.valid) {
			if (this.citizen.id === 0) {
				this.citizenService.save(citizen).subscribe((citizens) => {
					this.dialogRef.close(citizens);
				}, (error) => {
					this.errorMessage = error.message;
				})
			} else {
				citizen.id = this.citizen.id;
				this.citizenService.update(citizen.id, citizen).subscribe((citizens) => {
					this.dialogRef.close(citizens);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		} else {
			this.validateAllFormFields(this.citizenForm);
		}
	}

	public onCancel() {
		this.dialogRef.close();
	}

}
