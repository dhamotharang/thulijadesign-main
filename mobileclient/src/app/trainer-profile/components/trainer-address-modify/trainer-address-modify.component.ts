import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { Trainer } from '../../../shared/models/trainer/trainer';
import { TrainerService } from '../../../shared/services/trainer/trainer.service';
import { AddressType } from '../../../shared/models/general/address-type';
import { AddressTypeService } from '../../../shared/services/general/address-type.service';
import { State } from '../../../shared/models/general/state';
import { StateService } from '../../../shared/services/general/state.service';
import { Country } from '../../../shared/models/general/country';
import { CountryService } from '../../../shared/services/general/country.service';
import { TrainerAddress } from '../../../shared/models/trainer/trainer-address';
import { TrainerAddressService } from '../../../shared/services/trainer/trainer-address.service';

@Component({
	selector: 'app-trainer-address-modify',
	templateUrl: './trainer-address-modify.component.html',
	styleUrls: ['./trainer-address-modify.component.scss']
})
export class TrainerAddressModifyComponent implements OnInit {

	public trainerAddressForm:FormGroup;
	public trainerAddress:TrainerAddress;
	public trainers:Trainer[];
	public currentTrainer:Trainer;
	public addressTypes:AddressType[];
	public currentAddressType:AddressType;
	public countries:Country[];
	public currentCountry:Country;
	public states:State[];
	public currentState:State;
	public errorMessage:string;

	compareTrainer = (currenttrainer: Trainer, trainer: Trainer) => currenttrainer.id == trainer.id;

	compareAddressType = (currentaddressType: AddressType, addressType: AddressType) => currentaddressType.id == addressType.id;

	compareCountry = (currentcountry: Country, country: Country) => currentcountry.id == country.id;

	compareState = (currentstate: State, state: State) => currentstate.id == state.id;

	constructor(private trainerAddressService:TrainerAddressService,
			private trainerService:TrainerService,
			private addressTypeService:AddressTypeService,
			private countryService:CountryService,
			private stateService:StateService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.trainerAddress = this.navParams.get('trainerAddress');
		this.trainerService.findAllByLookup().subscribe(trainers => {
			this.trainers = trainers;
		})
		this.addressTypeService.findAllByLookup().subscribe(addressTypes => {
			this.addressTypes = addressTypes;
			if (this.trainerAddress.id === 0) {
				this.addressTypes.forEach((addressType) => {
					if (addressType.byDefault == true) this.trainerAddressForm.controls['addressType'].setValue(addressType);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		})
		this.countryService.findAllByLookup().subscribe(countries => {
			this.countries = countries;
			if (this.trainerAddress.id === 0) {
				this.countries.forEach((country) => {
					if (country.byDefault == true) this.trainerAddressForm.controls['country'].setValue(country);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		})
		this.stateService.findAllByLookup().subscribe(states => {
			this.states = states;
			if (this.trainerAddress.id === 0) {
				this.states.forEach((state) => {
					if (state.byDefault == true) this.trainerAddressForm.controls['state'].setValue(state);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		})
	}

	ngOnInit() {
		if (this.trainerAddress.id === 0) {
			this.trainerAddressForm = this.createTrainerAddressForm();
		} else {
			this.trainerAddressForm = this.editTrainerAddressForm();
		}
	}

	createTrainerAddressForm():FormGroup {
		let trainerAddressForm = new FormGroup({
			trainer: new FormControl('', {
				validators: [
				]
			}),
			addressType: new FormControl('', {
				validators: [
				]
			}),
			contactPersonName: new FormControl('', {
				validators: [
					Validators.minLength(1),
					Validators.maxLength(60)
				]
			}),
			addressLineOne: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(1),
					Validators.maxLength(200)
				]
			}),
			addressLineTwo: new FormControl('', {
				validators: [
					Validators.minLength(1),
					Validators.maxLength(200)
				]
			}),
			postcode: new FormControl('', {
				validators: [
					Validators.minLength(1),
					Validators.maxLength(10)
				]
			}),
			country: new FormControl('', {
				validators: [
				]
			}),
			state: new FormControl('', {
				validators: [
				]
			}),
			district: new FormControl('', {
				validators: [
					Validators.minLength(1),
					Validators.maxLength(60)
				]
			}),
			city: new FormControl('', {
				validators: [
					Validators.minLength(1),
					Validators.maxLength(60)
				]
			}),
			telephoneNumberOne: new FormControl('', {
				validators: [
					Validators.minLength(1),
					Validators.maxLength(20)
				]
			}),
			handphoneNumberOne: new FormControl('', {
				validators: [
					Validators.minLength(1),
					Validators.maxLength(20)
				]
			}),
			emailAddressOne: new FormControl('', {
				validators: [
					Validators.minLength(1),
					Validators.maxLength(120),
					Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
				]
			}),
			websiteAddress: new FormControl('', {
				validators: [
					Validators.minLength(1),
					Validators.maxLength(120)
				]
			}),
			latitude: new FormControl('', {
				validators: [
					Validators.minLength(1),
					Validators.maxLength(50)
				]
			}),
			longitude: new FormControl('', {
				validators: [
					Validators.minLength(1),
					Validators.maxLength(50)
				]
			}),
			locationMap: new FormControl('', {
				validators: [
					Validators.minLength(1),
					Validators.maxLength(50)
				]
			}),
			premisePhoto: new FormControl('', {
				validators: [
					Validators.minLength(1),
					Validators.maxLength(50)
				]
			})
		})
		return trainerAddressForm;
	}

	editTrainerAddressForm():FormGroup {
		this.currentTrainer = this.trainerAddress.trainer;
		this.currentAddressType = this.trainerAddress.addressType;
		this.currentCountry = this.trainerAddress.country;
		this.currentState = this.trainerAddress.state;
		let trainerAddressForm = new FormGroup({
			trainer: new FormControl(this.trainerAddress.trainer, [
			]), 
			addressType: new FormControl(this.trainerAddress.addressType, [
			]), 
			contactPersonName: new FormControl(this.trainerAddress.contactPersonName, [
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			addressLineOne: new FormControl(this.trainerAddress.addressLineOne, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(200)
			]), 
			addressLineTwo: new FormControl(this.trainerAddress.addressLineTwo, [
				Validators.minLength(1),
				Validators.maxLength(200)
			]), 
			postcode: new FormControl(this.trainerAddress.postcode, [
				Validators.minLength(1),
				Validators.maxLength(10)
			]), 
			country: new FormControl(this.trainerAddress.country, [
			]), 
			state: new FormControl(this.trainerAddress.state, [
			]), 
			district: new FormControl(this.trainerAddress.district, [
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			city: new FormControl(this.trainerAddress.city, [
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			telephoneNumberOne: new FormControl(this.trainerAddress.telephoneNumberOne, [
				Validators.minLength(1),
				Validators.maxLength(20)
			]), 
			handphoneNumberOne: new FormControl(this.trainerAddress.handphoneNumberOne, [
				Validators.minLength(1),
				Validators.maxLength(20)
			]), 
			emailAddressOne: new FormControl(this.trainerAddress.emailAddressOne, [
				Validators.minLength(1),
				Validators.maxLength(120),
				Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
			]), 
			websiteAddress: new FormControl(this.trainerAddress.websiteAddress, [
				Validators.minLength(1),
				Validators.maxLength(120)
			]), 
			latitude: new FormControl(this.trainerAddress.latitude, [
				Validators.minLength(1),
				Validators.maxLength(50)
			]), 
			longitude: new FormControl(this.trainerAddress.longitude, [
				Validators.minLength(1),
				Validators.maxLength(50)
			]), 
			locationMap: new FormControl(this.trainerAddress.locationMap, [
				Validators.minLength(1),
				Validators.maxLength(50)
			]), 
			premisePhoto: new FormControl(this.trainerAddress.premisePhoto, [
				Validators.minLength(1),
				Validators.maxLength(50)
			])
		})
		return trainerAddressForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.trainerAddressForm.controls[controlName].hasError(errorName);
	}

	public save(trainerAddress:TrainerAddress) {
		trainerAddress.trainer = this.trainerAddress.trainer;
		trainerAddress.options = this.trainerAddress.options;
		if (this.trainerAddress.id === 0) {
			this.trainerAddressService.save(trainerAddress).subscribe((trainerAddresses) => {
				this.modalController.dismiss({ 'dismissed': true, 'trainerAddresses':trainerAddresses });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			trainerAddress.id = this.trainerAddress.id;
			this.trainerAddressService.update(trainerAddress.id, trainerAddress).subscribe((trainerAddresses) => {
				this.modalController.dismiss({ 'dismissed': true, 'trainerAddresses':trainerAddresses });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
