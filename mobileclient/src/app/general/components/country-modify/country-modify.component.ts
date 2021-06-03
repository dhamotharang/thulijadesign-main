import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { Country } from '../../../shared/models/general/country';
import { CountryService } from '../../../shared/services/general/country.service';

@Component({
	selector: 'app-country-modify',
	templateUrl: './country-modify.component.html',
	styleUrls: ['./country-modify.component.scss']
})
export class CountryModifyComponent implements OnInit {

	public countryForm:FormGroup;
	public country:Country;
	public errorMessage:string;

	constructor(private countryService:CountryService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.country = this.navParams.get('country');
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
			sequence: new FormControl(this.country.sequence, {
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

	public save(country:Country) {
		if (this.country.id === 0) {
			this.countryService.save(country).subscribe((countries) => {
				this.modalController.dismiss({ 'dismissed': true, 'countries':countries });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			country.id = this.country.id;
			this.countryService.update(country.id, country).subscribe((countries) => {
				this.modalController.dismiss({ 'dismissed': true, 'countries':countries });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
