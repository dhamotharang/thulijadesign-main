import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { Batch } from '../../../shared/models/program/batch';
import { BatchService } from '../../../shared/services/program/batch.service';
import { Program } from '../../../shared/models/program/program';
import { ProgramService } from '../../../shared/services/program/program.service';
import { State } from '../../../shared/models/general/state';
import { StateService } from '../../../shared/services/general/state.service';
import { Country } from '../../../shared/models/general/country';
import { CountryService } from '../../../shared/services/general/country.service';

@Component({
	selector: 'app-batch-manager-modify',
	templateUrl: './batch-manager-modify.component.html',
	styleUrls: ['./batch-manager-modify.component.css']
})
export class BatchManagerModifyComponent implements OnInit {

	public batchForm:FormGroup;
	public batch:Batch;
	public programs:Program[];
	public currentProgram:Program;
	public countries:Country[];
	public currentCountry:Country;
	public states:State[];
	public currentState:State;
	public errorMessage:string;

	compareProgram = (currentprogram: Program, program: Program) => currentprogram.id == program.id;

	compareCountry = (currentcountry: Country, country: Country) => currentcountry.id == country.id;

	compareState = (currentstate: State, state: State) => currentstate.id == state.id;

	constructor(private batchService:BatchService,
			private programService:ProgramService,
			private countryService:CountryService,
			private stateService:StateService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.batch = this.navParams.get('batch');
		this.programService.findAllByLookup().subscribe(programs => {
			this.programs = programs;
		})
		this.countryService.findAllByLookup().subscribe(countries => {
			this.countries = countries;
			if (this.batch.id === 0) {
				this.countries.forEach((country) => {
					if (country.byDefault == true) this.batchForm.controls['country'].setValue(country);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		})
		this.stateService.findAllByLookup().subscribe(states => {
			this.states = states;
			if (this.batch.id === 0) {
				this.states.forEach((state) => {
					if (state.byDefault == true) this.batchForm.controls['state'].setValue(state);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		})
	}

	ngOnInit() {
		if (this.batch.id === 0) {
			this.batchForm = this.createBatchForm();
		} else {
			this.batchForm = this.editBatchForm();
		}
	}

	createBatchForm():FormGroup {
		let batchForm = new FormGroup({
			program: new FormControl('', {
				validators: [
				]
			}),
			code: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(1),
					Validators.maxLength(50)
				]
			}),
			lectureStartDate: new FormControl('', {
				validators: [
					Validators.required, 
				]
			}),
			lectureEndDate: new FormControl('', {
				validators: [
					Validators.required, 
				]
			}),
			lectureDurationDays: new FormControl('', {
				validators: [
					Validators.min(1),
					Validators.max(50),
					Validators.pattern("^[0-9]*$")
				]
			}),
			lectureDurationHours: new FormControl('', {
				validators: [
					Validators.min(1),
					Validators.max(500),
					Validators.pattern("^[0-9]*$")
				]
			}),
			onlineStartDate: new FormControl('', {
				validators: [
					Validators.minLength(1),
					Validators.maxLength(100)
				]
			}),
			onlineEndDate: new FormControl('', {
				validators: [
				]
			}),
			onlineDurationDays: new FormControl('', {
				validators: [
					Validators.min(1),
					Validators.max(50),
					Validators.pattern("^[0-9]*$")
				]
			}),
			onlineDurationHours: new FormControl('', {
				validators: [
					Validators.min(1),
					Validators.max(500),
					Validators.pattern("^[0-9]*$")
				]
			}),
			mentoringStartDate: new FormControl('', {
				validators: [
				]
			}),
			mentoringEndDate: new FormControl('', {
				validators: [
				]
			}),
			mentoringDurationDays: new FormControl('', {
				validators: [
					Validators.min(1),
					Validators.max(50),
					Validators.pattern("^[0-9]*$")
				]
			}),
			mentoringDurationHours: new FormControl('', {
				validators: [
					Validators.min(1),
					Validators.max(500),
					Validators.pattern("^[0-9]*$")
				]
			}),
			contactPersonName: new FormControl('', {
				validators: [
					Validators.minLength(1),
					Validators.maxLength(60)
				]
			}),
			locationName: new FormControl('', {
				validators: [
					Validators.minLength(1),
					Validators.maxLength(200)
				]
			}),
			houseNumber: new FormControl('', {
				validators: [
					Validators.minLength(1),
					Validators.maxLength(10)
				]
			}),
			addressLineOne: new FormControl('', {
				validators: [
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
					Validators.maxLength(120)
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
		return batchForm;
	}

	editBatchForm():FormGroup {
		this.currentProgram = this.batch.program;
		this.currentCountry = this.batch.country;
		this.currentState = this.batch.state;
		let batchForm = new FormGroup({
			program: new FormControl(this.batch.program, [
			]), 
			code: new FormControl(this.batch.code, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(50)
			]), 
			lectureStartDate: new FormControl((this.batch.lectureStartDate === null) ? "" : new Date(this.batch.lectureStartDate), [
				Validators.required, 
			]), 
			lectureEndDate: new FormControl((this.batch.lectureEndDate === null) ? "" : new Date(this.batch.lectureEndDate), [
				Validators.required, 
			]), 
			lectureDurationDays: new FormControl(this.batch.lectureDurationDays, [
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(50)
			]), 
			lectureDurationHours: new FormControl(this.batch.lectureDurationHours, [
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(500)
			]), 
			onlineStartDate: new FormControl((this.batch.onlineStartDate === null) ? "" : new Date(this.batch.onlineStartDate), [
				Validators.minLength(1),
				Validators.maxLength(100)
			]), 
			onlineEndDate: new FormControl((this.batch.onlineEndDate === null) ? "" : new Date(this.batch.onlineEndDate), [
			]), 
			onlineDurationDays: new FormControl(this.batch.onlineDurationDays, [
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(50)
			]), 
			onlineDurationHours: new FormControl(this.batch.onlineDurationHours, [
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(500)
			]), 
			mentoringStartDate: new FormControl((this.batch.mentoringStartDate === null) ? "" : new Date(this.batch.mentoringStartDate), [
			]), 
			mentoringEndDate: new FormControl((this.batch.mentoringEndDate === null) ? "" : new Date(this.batch.mentoringEndDate), [
			]), 
			mentoringDurationDays: new FormControl(this.batch.mentoringDurationDays, [
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(50)
			]), 
			mentoringDurationHours: new FormControl(this.batch.mentoringDurationHours, [
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(500)
			]), 
			contactPersonName: new FormControl(this.batch.contactPersonName, [
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			locationName: new FormControl(this.batch.locationName, [
				Validators.minLength(1),
				Validators.maxLength(200)
			]), 
			houseNumber: new FormControl(this.batch.houseNumber, [
				Validators.minLength(1),
				Validators.maxLength(10)
			]), 
			addressLineOne: new FormControl(this.batch.addressLineOne, [
				Validators.minLength(1),
				Validators.maxLength(200)
			]), 
			addressLineTwo: new FormControl(this.batch.addressLineTwo, [
				Validators.minLength(1),
				Validators.maxLength(200)
			]), 
			postcode: new FormControl(this.batch.postcode, [
				Validators.minLength(1),
				Validators.maxLength(10)
			]), 
			country: new FormControl(this.batch.country, [
			]), 
			state: new FormControl(this.batch.state, [
			]), 
			district: new FormControl(this.batch.district, [
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			city: new FormControl(this.batch.city, [
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			telephoneNumberOne: new FormControl(this.batch.telephoneNumberOne, [
				Validators.minLength(1),
				Validators.maxLength(20)
			]), 
			handphoneNumberOne: new FormControl(this.batch.handphoneNumberOne, [
				Validators.minLength(1),
				Validators.maxLength(20)
			]), 
			emailAddressOne: new FormControl(this.batch.emailAddressOne, [
				Validators.minLength(1),
				Validators.maxLength(120)
			]), 
			websiteAddress: new FormControl(this.batch.websiteAddress, [
				Validators.minLength(1),
				Validators.maxLength(120)
			]), 
			latitude: new FormControl(this.batch.latitude, [
				Validators.minLength(1),
				Validators.maxLength(50)
			]), 
			longitude: new FormControl(this.batch.longitude, [
				Validators.minLength(1),
				Validators.maxLength(50)
			]), 
			locationMap: new FormControl(this.batch.locationMap, [
				Validators.minLength(1),
				Validators.maxLength(50)
			]), 
			premisePhoto: new FormControl(this.batch.premisePhoto, [
				Validators.minLength(1),
				Validators.maxLength(50)
			])
		})
		return batchForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.batchForm.controls[controlName].hasError(errorName);
	}

	public save(batch:Batch) {
		batch.program = this.batch.program;
		batch.options = this.batch.options;
		if (batch.lectureStartDate !== null) {
			batch.lectureStartDate = new Date(batch.lectureStartDate);
			batch.lectureStartDate = new Date(batch.lectureStartDate.getFullYear(), 
				batch.lectureStartDate.getMonth(), batch.lectureStartDate.getDate());
			batch.lectureStartDate.setDate(batch.lectureStartDate.getDate() + 1);
		}
		if (batch.lectureEndDate !== null) {
			batch.lectureEndDate = new Date(batch.lectureEndDate);
			batch.lectureEndDate = new Date(batch.lectureEndDate.getFullYear(), 
				batch.lectureEndDate.getMonth(), batch.lectureEndDate.getDate());
			batch.lectureEndDate.setDate(batch.lectureEndDate.getDate() + 1);
		}
		if (batch.onlineStartDate !== null) {
			batch.onlineStartDate = new Date(batch.onlineStartDate);
			batch.onlineStartDate = new Date(batch.onlineStartDate.getFullYear(), 
				batch.onlineStartDate.getMonth(), batch.onlineStartDate.getDate());
			batch.onlineStartDate.setDate(batch.onlineStartDate.getDate() + 1);
		}
		if (batch.onlineEndDate !== null) {
			batch.onlineEndDate = new Date(batch.onlineEndDate);
			batch.onlineEndDate = new Date(batch.onlineEndDate.getFullYear(), 
				batch.onlineEndDate.getMonth(), batch.onlineEndDate.getDate());
			batch.onlineEndDate.setDate(batch.onlineEndDate.getDate() + 1);
		}
		if (batch.mentoringStartDate !== null) {
			batch.mentoringStartDate = new Date(batch.mentoringStartDate);
			batch.mentoringStartDate = new Date(batch.mentoringStartDate.getFullYear(), 
				batch.mentoringStartDate.getMonth(), batch.mentoringStartDate.getDate());
			batch.mentoringStartDate.setDate(batch.mentoringStartDate.getDate() + 1);
		}
		if (batch.mentoringEndDate !== null) {
			batch.mentoringEndDate = new Date(batch.mentoringEndDate);
			batch.mentoringEndDate = new Date(batch.mentoringEndDate.getFullYear(), 
				batch.mentoringEndDate.getMonth(), batch.mentoringEndDate.getDate());
			batch.mentoringEndDate.setDate(batch.mentoringEndDate.getDate() + 1);
		}
		if (this.batch.id === 0) {
			this.batchService.save(batch).subscribe((batches) => {
				this.modalController.dismiss({ 'dismissed': true, 'batches':batches });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			batch.id = this.batch.id;
			this.batchService.update(batch.id, batch).subscribe((batches) => {
				this.modalController.dismiss({ 'dismissed': true, 'batches':batches });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
