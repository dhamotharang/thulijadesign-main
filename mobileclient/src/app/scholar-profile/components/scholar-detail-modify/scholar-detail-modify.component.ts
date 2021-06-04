import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { Scholar } from '../../../shared/models/scholar/scholar';
import { ScholarService } from '../../../shared/services/scholar/scholar.service';
import { MaritalStatus } from '../../../shared/models/general/marital-status';
import { MaritalStatusService } from '../../../shared/services/general/marital-status.service';
import { Race } from '../../../shared/models/general/race';
import { RaceService } from '../../../shared/services/general/race.service';
import { Religion } from '../../../shared/models/general/religion';
import { ReligionService } from '../../../shared/services/general/religion.service';
import { ScholarDetail } from '../../../shared/models/scholar/scholar-detail';
import { ScholarDetailService } from '../../../shared/services/scholar/scholar-detail.service';

@Component({
	selector: 'app-scholar-detail-modify',
	templateUrl: './scholar-detail-modify.component.html',
	styleUrls: ['./scholar-detail-modify.component.scss']
})
export class ScholarDetailModifyComponent implements OnInit {

	public scholarDetailForm:FormGroup;
	public scholarDetail:ScholarDetail;
	public scholars:Scholar[];
	public currentScholar:Scholar;
	public maritalStatuses:MaritalStatus[];
	public currentMaritalStatus:MaritalStatus;
	public races:Race[];
	public currentRace:Race;
	public religions:Religion[];
	public currentReligion:Religion;
	public errorMessage:string;

	compareScholar = (currentscholar: Scholar, scholar: Scholar) => currentscholar.id == scholar.id;

	compareMaritalStatus = (currentmaritalStatus: MaritalStatus, maritalStatus: MaritalStatus) => currentmaritalStatus.id == maritalStatus.id;

	compareRace = (currentrace: Race, race: Race) => currentrace.id == race.id;

	compareReligion = (currentreligion: Religion, religion: Religion) => currentreligion.id == religion.id;

	constructor(private scholarDetailService:ScholarDetailService,
			private scholarService:ScholarService,
			private maritalStatusService:MaritalStatusService,
			private raceService:RaceService,
			private religionService:ReligionService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.scholarDetail = this.navParams.get('scholarDetail');
		this.scholarService.findAllByLookup().subscribe(scholars => {
			this.scholars = scholars;
		})
		this.maritalStatusService.findAllByLookup().subscribe(maritalStatuses => {
			this.maritalStatuses = maritalStatuses;
			if (this.scholarDetail.id === 0) {
				this.maritalStatuses.forEach((maritalStatus) => {
					if (maritalStatus.byDefault == true) this.scholarDetailForm.controls['maritalStatus'].setValue(maritalStatus);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		})
		this.raceService.findAllByLookup().subscribe(races => {
			this.races = races;
			if (this.scholarDetail.id === 0) {
				this.races.forEach((race) => {
					if (race.byDefault == true) this.scholarDetailForm.controls['race'].setValue(race);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		})
		this.religionService.findAllByLookup().subscribe(religions => {
			this.religions = religions;
			if (this.scholarDetail.id === 0) {
				this.religions.forEach((religion) => {
					if (religion.byDefault == true) this.scholarDetailForm.controls['religion'].setValue(religion);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		})
	}

	ngOnInit() {
		if (this.scholarDetail.id === 0) {
			this.scholarDetailForm = this.createScholarDetailForm();
		} else {
			this.scholarDetailForm = this.editScholarDetailForm();
		}
	}

	createScholarDetailForm():FormGroup {
		let scholarDetailForm = new FormGroup({
			scholar: new FormControl('', {
				validators: [
				]
			}),
			dateOfBirth: new FormControl('', {
				validators: [
					Validators.required, 
				]
			}),
			age: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.min(1),
					Validators.max(200),
					Validators.pattern("^[0-9]*$")
				]
			}),
			maritalStatus: new FormControl('', {
				validators: [
				]
			}),
			dependents: new FormControl('', {
				validators: [
					Validators.min(1),
					Validators.max(200),
					Validators.pattern("^[0-9]*$")
				]
			}),
			race: new FormControl('', {
				validators: [
				]
			}),
			religion: new FormControl('', {
				validators: [
				]
			}),
			passportNumber: new FormControl('', {
				validators: [
					Validators.minLength(1),
					Validators.maxLength(20)
				]
			}),
			visaNumber: new FormControl('', {
				validators: [
					Validators.minLength(1),
					Validators.maxLength(20)
				]
			}),
			visaIssueDate: new FormControl('', {
				validators: [
				]
			}),
			visaExpiryDate: new FormControl('', {
				validators: [
				]
			})
		})
		return scholarDetailForm;
	}

	editScholarDetailForm():FormGroup {
		this.currentScholar = this.scholarDetail.scholar;
		this.currentMaritalStatus = this.scholarDetail.maritalStatus;
		this.currentRace = this.scholarDetail.race;
		this.currentReligion = this.scholarDetail.religion;
		let scholarDetailForm = new FormGroup({
			scholar: new FormControl(this.scholarDetail.scholar, [
			]), 
			dateOfBirth: new FormControl((this.scholarDetail.dateOfBirth === null) ? "" : new Date(this.scholarDetail.dateOfBirth), [
				Validators.required, 
			]), 
			age: new FormControl(this.scholarDetail.age, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(200)
			]), 
			maritalStatus: new FormControl(this.scholarDetail.maritalStatus, [
			]), 
			dependents: new FormControl(this.scholarDetail.dependents, [
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(200)
			]), 
			race: new FormControl(this.scholarDetail.race, [
			]), 
			religion: new FormControl(this.scholarDetail.religion, [
			]), 
			passportNumber: new FormControl(this.scholarDetail.passportNumber, [
				Validators.minLength(1),
				Validators.maxLength(20)
			]), 
			visaNumber: new FormControl(this.scholarDetail.visaNumber, [
				Validators.minLength(1),
				Validators.maxLength(20)
			]), 
			visaIssueDate: new FormControl((this.scholarDetail.visaIssueDate === null) ? "" : new Date(this.scholarDetail.visaIssueDate), [
			]), 
			visaExpiryDate: new FormControl((this.scholarDetail.visaExpiryDate === null) ? "" : new Date(this.scholarDetail.visaExpiryDate), [
			])
		})
		return scholarDetailForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.scholarDetailForm.controls[controlName].hasError(errorName);
	}

	public save(scholarDetail:ScholarDetail) {
		scholarDetail.scholar = this.scholarDetail.scholar;
		scholarDetail.options = this.scholarDetail.options;
		if (scholarDetail.dateOfBirth !== null) {
			scholarDetail.dateOfBirth = new Date(scholarDetail.dateOfBirth);
			scholarDetail.dateOfBirth = new Date(scholarDetail.dateOfBirth.getFullYear(), 
				scholarDetail.dateOfBirth.getMonth(), scholarDetail.dateOfBirth.getDate());
			scholarDetail.dateOfBirth.setDate(scholarDetail.dateOfBirth.getDate() + 1);
		}
		if (scholarDetail.visaIssueDate !== null) {
			scholarDetail.visaIssueDate = new Date(scholarDetail.visaIssueDate);
			scholarDetail.visaIssueDate = new Date(scholarDetail.visaIssueDate.getFullYear(), 
				scholarDetail.visaIssueDate.getMonth(), scholarDetail.visaIssueDate.getDate());
			scholarDetail.visaIssueDate.setDate(scholarDetail.visaIssueDate.getDate() + 1);
		}
		if (scholarDetail.visaExpiryDate !== null) {
			scholarDetail.visaExpiryDate = new Date(scholarDetail.visaExpiryDate);
			scholarDetail.visaExpiryDate = new Date(scholarDetail.visaExpiryDate.getFullYear(), 
				scholarDetail.visaExpiryDate.getMonth(), scholarDetail.visaExpiryDate.getDate());
			scholarDetail.visaExpiryDate.setDate(scholarDetail.visaExpiryDate.getDate() + 1);
		}
		if (this.scholarDetail.id === 0) {
			this.scholarDetailService.save(scholarDetail).subscribe((scholarDetails) => {
				this.modalController.dismiss({ 'dismissed': true, 'scholarDetails':scholarDetails });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			scholarDetail.id = this.scholarDetail.id;
			this.scholarDetailService.update(scholarDetail.id, scholarDetail).subscribe((scholarDetails) => {
				this.modalController.dismiss({ 'dismissed': true, 'scholarDetails':scholarDetails });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
