import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { TrainerDetail } from '../../../shared/models/trainer/trainer-detail';
import { TrainerDetailService } from '../../../shared/services/trainer/trainer-detail.service';
import { Trainer } from '../../../shared/models/trainer/trainer';
import { TrainerService } from '../../../shared/services/trainer/trainer.service';
import { MaritalStatus } from '../../../shared/models/general/marital-status';
import { MaritalStatusService } from '../../../shared/services/general/marital-status.service';
import { Race } from '../../../shared/models/general/race';
import { RaceService } from '../../../shared/services/general/race.service';
import { Religion } from '../../../shared/models/general/religion';
import { ReligionService } from '../../../shared/services/general/religion.service';

@Component({
	selector: 'app-trainer-detail-manager-modify',
	templateUrl: './trainer-detail-manager-modify.component.html',
	styleUrls: ['./trainer-detail-manager-modify.component.css']
})
export class TrainerDetailManagerModifyComponent implements OnInit {

	public trainerDetailForm:FormGroup;
	public trainerDetail:TrainerDetail;
	public trainers:Trainer[];
	public currentTrainer:Trainer;
	public maritalStatuses:MaritalStatus[];
	public currentMaritalStatus:MaritalStatus;
	public races:Race[];
	public currentRace:Race;
	public religions:Religion[];
	public currentReligion:Religion;
	public errorMessage:string;

	compareTrainer = (currenttrainer: Trainer, trainer: Trainer) => currenttrainer.id == trainer.id;

	compareMaritalStatus = (currentmaritalStatus: MaritalStatus, maritalStatus: MaritalStatus) => currentmaritalStatus.id == maritalStatus.id;

	compareRace = (currentrace: Race, race: Race) => currentrace.id == race.id;

	compareReligion = (currentreligion: Religion, religion: Religion) => currentreligion.id == religion.id;

	constructor(private trainerDetailService:TrainerDetailService,
			private trainerService:TrainerService,
			private maritalStatusService:MaritalStatusService,
			private raceService:RaceService,
			private religionService:ReligionService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.trainerDetail = this.navParams.get('trainerDetail');
		this.trainerService.findAllByLookup().subscribe(trainers => {
			this.trainers = trainers;
		})
		this.maritalStatusService.findAllByLookup().subscribe(maritalStatuses => {
			this.maritalStatuses = maritalStatuses;
			if (this.trainerDetail.id === 0) {
				this.maritalStatuses.forEach((maritalStatus) => {
					if (maritalStatus.byDefault == true) this.trainerDetailForm.controls['maritalStatus'].setValue(maritalStatus);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		})
		this.raceService.findAllByLookup().subscribe(races => {
			this.races = races;
			if (this.trainerDetail.id === 0) {
				this.races.forEach((race) => {
					if (race.byDefault == true) this.trainerDetailForm.controls['race'].setValue(race);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		})
		this.religionService.findAllByLookup().subscribe(religions => {
			this.religions = religions;
			if (this.trainerDetail.id === 0) {
				this.religions.forEach((religion) => {
					if (religion.byDefault == true) this.trainerDetailForm.controls['religion'].setValue(religion);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		})
	}

	ngOnInit() {
		if (this.trainerDetail.id === 0) {
			this.trainerDetailForm = this.createTrainerDetailForm();
		} else {
			this.trainerDetailForm = this.editTrainerDetailForm();
		}
	}

	createTrainerDetailForm():FormGroup {
		let trainerDetailForm = new FormGroup({
			trainer: new FormControl('', {
				validators: [
				]
			}),
			dateOfBirth: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(1),
					Validators.maxLength(20)
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
					Validators.minLength(1),
					Validators.maxLength(20)
				]
			}),
			visaExpiryDate: new FormControl('', {
				validators: [
					Validators.minLength(1),
					Validators.maxLength(20)
				]
			})
		})
		return trainerDetailForm;
	}

	editTrainerDetailForm():FormGroup {
		this.currentTrainer = this.trainerDetail.trainer;
		this.currentMaritalStatus = this.trainerDetail.maritalStatus;
		this.currentRace = this.trainerDetail.race;
		this.currentReligion = this.trainerDetail.religion;
		let trainerDetailForm = new FormGroup({
			trainer: new FormControl(this.trainerDetail.trainer, [
			]), 
			dateOfBirth: new FormControl((this.trainerDetail.dateOfBirth === null) ? "" : new Date(this.trainerDetail.dateOfBirth), [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(20)
			]), 
			age: new FormControl(this.trainerDetail.age, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(200)
			]), 
			maritalStatus: new FormControl(this.trainerDetail.maritalStatus, [
			]), 
			dependents: new FormControl(this.trainerDetail.dependents, [
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(200)
			]), 
			race: new FormControl(this.trainerDetail.race, [
			]), 
			religion: new FormControl(this.trainerDetail.religion, [
			]), 
			passportNumber: new FormControl(this.trainerDetail.passportNumber, [
				Validators.minLength(1),
				Validators.maxLength(20)
			]), 
			visaNumber: new FormControl(this.trainerDetail.visaNumber, [
				Validators.minLength(1),
				Validators.maxLength(20)
			]), 
			visaIssueDate: new FormControl(this.trainerDetail.visaIssueDate, [
				Validators.minLength(1),
				Validators.maxLength(20)
			]), 
			visaExpiryDate: new FormControl(this.trainerDetail.visaExpiryDate, [
				Validators.minLength(1),
				Validators.maxLength(20)
			])
		})
		return trainerDetailForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.trainerDetailForm.controls[controlName].hasError(errorName);
	}

	public save(trainerDetail:TrainerDetail) {
		trainerDetail.trainer = this.trainerDetail.trainer;
		trainerDetail.options = this.trainerDetail.options;
		if (trainerDetail.dateOfBirth !== null) {
			trainerDetail.dateOfBirth = new Date(trainerDetail.dateOfBirth);
			trainerDetail.dateOfBirth = new Date(trainerDetail.dateOfBirth.getFullYear(), 
				trainerDetail.dateOfBirth.getMonth(), trainerDetail.dateOfBirth.getDate());
			trainerDetail.dateOfBirth.setDate(trainerDetail.dateOfBirth.getDate() + 1);
		}
		if (this.trainerDetail.id === 0) {
			this.trainerDetailService.save(trainerDetail).subscribe((trainerDetails) => {
				this.modalController.dismiss({ 'dismissed': true, 'trainerDetails':trainerDetails });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			trainerDetail.id = this.trainerDetail.id;
			this.trainerDetailService.update(trainerDetail.id, trainerDetail).subscribe((trainerDetails) => {
				this.modalController.dismiss({ 'dismissed': true, 'trainerDetails':trainerDetails });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
