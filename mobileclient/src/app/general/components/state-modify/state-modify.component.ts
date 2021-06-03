import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { Country } from '../../../shared/models/general/country';
import { CountryService } from '../../../shared/services/general/country.service';
import { State } from '../../../shared/models/general/state';
import { StateService } from '../../../shared/services/general/state.service';

@Component({
	selector: 'app-state-modify',
	templateUrl: './state-modify.component.html',
	styleUrls: ['./state-modify.component.scss']
})
export class StateModifyComponent implements OnInit {

	public stateForm:FormGroup;
	public state:State;
	public countries:Country[];
	public currentCountry:Country;
	public errorMessage:string;

	compareCountry = (currentcountry: Country, country: Country) => currentcountry.id == country.id;

	constructor(private stateService:StateService,
			private countryService:CountryService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.state = this.navParams.get('state');
		this.countryService.findAllByLookup().subscribe(countries => {
			this.countries = countries;
			if (this.state.id === 0) {
				this.countries.forEach((country) => {
					if (country.byDefault == true) this.stateForm.controls['country'].setValue(country);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		})
	}

	ngOnInit() {
		if (this.state.id === 0) {
			this.stateForm = this.createStateForm();
		} else {
			this.stateForm = this.editStateForm();
		}
	}

	createStateForm():FormGroup {
		let stateForm = new FormGroup({
			sequence: new FormControl(this.state.sequence, {
				validators: [
					Validators.required, 
					Validators.min(1),
					Validators.max(20),
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
		return stateForm;
	}

	editStateForm():FormGroup {
		this.currentCountry = this.state.country;
		let stateForm = new FormGroup({
			sequence: new FormControl(this.state.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(20)
			]), 
			country: new FormControl(this.state.country, [
			]), 
			code: new FormControl(this.state.code, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(10)
			]), 
			name: new FormControl(this.state.name, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			byDefault: new FormControl(
				Boolean(Number(this.state.byDefault)))
		})
		return stateForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.stateForm.controls[controlName].hasError(errorName);
	}

	public save(state:State) {
		if (this.state.id === 0) {
			this.stateService.save(state).subscribe((states) => {
				this.modalController.dismiss({ 'dismissed': true, 'states':states });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			state.id = this.state.id;
			this.stateService.update(state.id, state).subscribe((states) => {
				this.modalController.dismiss({ 'dismissed': true, 'states':states });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
