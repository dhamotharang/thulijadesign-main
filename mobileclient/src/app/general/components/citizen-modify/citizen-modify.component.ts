import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { Country } from '../../../shared/models/general/country';
import { CountryService } from '../../../shared/services/general/country.service';
import { Citizen } from '../../../shared/models/general/citizen';
import { CitizenService } from '../../../shared/services/general/citizen.service';

@Component({
	selector: 'app-citizen-modify',
	templateUrl: './citizen-modify.component.html',
	styleUrls: ['./citizen-modify.component.scss']
})
export class CitizenModifyComponent implements OnInit {

	public citizenForm:FormGroup;
	public citizen:Citizen;
	public countries:Country[];
	public currentCountry:Country;
	public errorMessage:string;

	compareCountry = (currentcountry: Country, country: Country) => currentcountry.id == country.id;

	constructor(private citizenService:CitizenService,
			private countryService:CountryService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.citizen = this.navParams.get('citizen');
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
			sequence: new FormControl(this.citizen.sequence, {
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

	public save(citizen:Citizen) {
		if (this.citizen.id === 0) {
			this.citizenService.save(citizen).subscribe((citizens) => {
				this.modalController.dismiss({ 'dismissed': true, 'citizens':citizens });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			citizen.id = this.citizen.id;
			this.citizenService.update(citizen.id, citizen).subscribe((citizens) => {
				this.modalController.dismiss({ 'dismissed': true, 'citizens':citizens });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
