import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { Scholar } from '../../../shared/models/scholar/scholar';
import { ScholarService } from '../../../shared/services/scholar/scholar.service';
import { AddressType } from '../../../shared/models/general/address-type';
import { AddressTypeService } from '../../../shared/services/general/address-type.service';
import { State } from '../../../shared/models/general/state';
import { StateService } from '../../../shared/services/general/state.service';
import { Country } from '../../../shared/models/general/country';
import { CountryService } from '../../../shared/services/general/country.service';
import { ScholarAddress } from '../../../shared/models/scholar/scholar-address';
import { ScholarAddressService } from '../../../shared/services/scholar/scholar-address.service';

@Component({
	selector: 'app-scholar-address-modify',
	templateUrl: './scholar-address-modify.component.html',
	styleUrls: ['./scholar-address-modify.component.scss']
})
export class ScholarAddressModifyComponent implements OnInit {

	public scholarAddressForm:FormGroup;
	public scholarAddress:ScholarAddress;
	public scholars:Scholar[];
	public currentScholar:Scholar;
	public addressTypes:AddressType[];
	public currentAddressType:AddressType;
	public countries:Country[];
	public currentCountry:Country;
	public states:State[];
	public currentState:State;
	public errorMessage:string;

	compareScholar = (currentscholar: Scholar, scholar: Scholar) => currentscholar.id == scholar.id;

	compareAddressType = (currentaddressType: AddressType, addressType: AddressType) => currentaddressType.id == addressType.id;

	compareCountry = (currentcountry: Country, country: Country) => currentcountry.id == country.id;

	compareState = (currentstate: State, state: State) => currentstate.id == state.id;

	constructor(private scholarAddressService:ScholarAddressService,
			private scholarService:ScholarService,
			private addressTypeService:AddressTypeService,
			private countryService:CountryService,
			private stateService:StateService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.scholarAddress = this.navParams.get('scholarAddress');
		this.scholarService.findAllByLookup().subscribe(scholars => {
			this.scholars = scholars;
		})
		this.addressTypeService.findAllByLookup().subscribe(addressTypes => {
			this.addressTypes = addressTypes;
			if (this.scholarAddress.id === 0) {
				this.addressTypes.forEach((addressType) => {
					if (addressType.byDefault == true) this.scholarAddressForm.controls['addressType'].setValue(addressType);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		})
		this.countryService.findAllByLookup().subscribe(countries => {
			this.countries = countries;
			if (this.scholarAddress.id === 0) {
				this.countries.forEach((country) => {
					if (country.byDefault == true) this.scholarAddressForm.controls['country'].setValue(country);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		})
		this.stateService.findAllByLookup().subscribe(states => {
			this.states = states;
			if (this.scholarAddress.id === 0) {
				this.states.forEach((state) => {
					if (state.byDefault == true) this.scholarAddressForm.controls['state'].setValue(state);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		})
	}

	ngOnInit() {
		if (this.scholarAddress.id === 0) {
			this.scholarAddressForm = this.createScholarAddressForm();
		} else {
			this.scholarAddressForm = this.editScholarAddressForm();
		}
	}

	createScholarAddressForm():FormGroup {
		let scholarAddressForm = new FormGroup({
			scholar: new FormControl('', {
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
		return scholarAddressForm;
	}

	editScholarAddressForm():FormGroup {
		this.currentScholar = this.scholarAddress.scholar;
		this.currentAddressType = this.scholarAddress.addressType;
		this.currentCountry = this.scholarAddress.country;
		this.currentState = this.scholarAddress.state;
		let scholarAddressForm = new FormGroup({
			scholar: new FormControl(this.scholarAddress.scholar, [
			]), 
			addressType: new FormControl(this.scholarAddress.addressType, [
			]), 
			contactPersonName: new FormControl(this.scholarAddress.contactPersonName, [
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			addressLineOne: new FormControl(this.scholarAddress.addressLineOne, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(200)
			]), 
			addressLineTwo: new FormControl(this.scholarAddress.addressLineTwo, [
				Validators.minLength(1),
				Validators.maxLength(200)
			]), 
			postcode: new FormControl(this.scholarAddress.postcode, [
				Validators.minLength(1),
				Validators.maxLength(10)
			]), 
			country: new FormControl(this.scholarAddress.country, [
			]), 
			state: new FormControl(this.scholarAddress.state, [
			]), 
			district: new FormControl(this.scholarAddress.district, [
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			city: new FormControl(this.scholarAddress.city, [
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			telephoneNumberOne: new FormControl(this.scholarAddress.telephoneNumberOne, [
				Validators.minLength(1),
				Validators.maxLength(20)
			]), 
			handphoneNumberOne: new FormControl(this.scholarAddress.handphoneNumberOne, [
				Validators.minLength(1),
				Validators.maxLength(20)
			]), 
			emailAddressOne: new FormControl(this.scholarAddress.emailAddressOne, [
				Validators.minLength(1),
				Validators.maxLength(120),
				Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
			]), 
			websiteAddress: new FormControl(this.scholarAddress.websiteAddress, [
				Validators.minLength(1),
				Validators.maxLength(120)
			]), 
			latitude: new FormControl(this.scholarAddress.latitude, [
				Validators.minLength(1),
				Validators.maxLength(50)
			]), 
			longitude: new FormControl(this.scholarAddress.longitude, [
				Validators.minLength(1),
				Validators.maxLength(50)
			]), 
			locationMap: new FormControl(this.scholarAddress.locationMap, [
				Validators.minLength(1),
				Validators.maxLength(50)
			]), 
			premisePhoto: new FormControl(this.scholarAddress.premisePhoto, [
				Validators.minLength(1),
				Validators.maxLength(50)
			])
		})
		return scholarAddressForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.scholarAddressForm.controls[controlName].hasError(errorName);
	}

	public save(scholarAddress:ScholarAddress) {
		scholarAddress.scholar = this.scholarAddress.scholar;
		scholarAddress.options = this.scholarAddress.options;
		if (this.scholarAddress.id === 0) {
			this.scholarAddressService.save(scholarAddress).subscribe((scholarAddresses) => {
				this.modalController.dismiss({ 'dismissed': true, 'scholarAddresses':scholarAddresses });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			scholarAddress.id = this.scholarAddress.id;
			this.scholarAddressService.update(scholarAddress.id, scholarAddress).subscribe((scholarAddresses) => {
				this.modalController.dismiss({ 'dismissed': true, 'scholarAddresses':scholarAddresses });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
