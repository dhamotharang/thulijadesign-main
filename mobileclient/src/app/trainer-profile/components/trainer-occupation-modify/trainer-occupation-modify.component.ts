import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { Trainer } from '../../../shared/models/trainer/trainer';
import { TrainerService } from '../../../shared/services/trainer/trainer.service';
import { Qualification } from '../../../shared/models/general/qualification';
import { QualificationService } from '../../../shared/services/general/qualification.service';
import { State } from '../../../shared/models/general/state';
import { StateService } from '../../../shared/services/general/state.service';
import { Country } from '../../../shared/models/general/country';
import { CountryService } from '../../../shared/services/general/country.service';
import { PositionLevel } from '../../../shared/models/general/position-level';
import { PositionLevelService } from '../../../shared/services/general/position-level.service';
import { TrainerOccupation } from '../../../shared/models/trainer/trainer-occupation';
import { TrainerOccupationService } from '../../../shared/services/trainer/trainer-occupation.service';

@Component({
	selector: 'app-trainer-occupation-modify',
	templateUrl: './trainer-occupation-modify.component.html',
	styleUrls: ['./trainer-occupation-modify.component.scss']
})
export class TrainerOccupationModifyComponent implements OnInit {

	public trainerOccupationForm:FormGroup;
	public trainerOccupation:TrainerOccupation;
	public trainers:Trainer[];
	public currentTrainer:Trainer;
	public positionLevels:PositionLevel[];
	public currentPositionLevel:PositionLevel;
	public errorMessage:string;

	compareTrainer = (currenttrainer: Trainer, trainer: Trainer) => currenttrainer.id == trainer.id;

	comparePositionLevel = (currentpositionLevel: PositionLevel, positionLevel: PositionLevel) => currentpositionLevel.id == positionLevel.id;

	constructor(private trainerOccupationService:TrainerOccupationService,
			private trainerService:TrainerService,
			private positionLevelService:PositionLevelService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.trainerOccupation = this.navParams.get('trainerOccupation');
		this.trainerService.findAllByLookup().subscribe(trainers => {
			this.trainers = trainers;
		})
		this.positionLevelService.findAllByLookup().subscribe(positionLevels => {
			this.positionLevels = positionLevels;
			if (this.trainerOccupation.id === 0) {
				this.positionLevels.forEach((positionLevel) => {
					if (positionLevel.byDefault == true) this.trainerOccupationForm.controls['positionLevel'].setValue(positionLevel);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		})
	}

	ngOnInit() {
		if (this.trainerOccupation.id === 0) {
			this.trainerOccupationForm = this.createTrainerOccupationForm();
		} else {
			this.trainerOccupationForm = this.editTrainerOccupationForm();
		}
	}

	createTrainerOccupationForm():FormGroup {
		let trainerOccupationForm = new FormGroup({
			trainer: new FormControl('', {
				validators: [
				]
			}),
			positionTitle: new FormControl('', {
				validators: [
					Validators.minLength(3),
					Validators.maxLength(60)
				]
			}),
			companyName: new FormControl('', {
				validators: [
					Validators.minLength(3),
					Validators.maxLength(60)
				]
			}),
			startDate: new FormControl('', {
				validators: [
					Validators.minLength(1),
					Validators.maxLength(100)
				]
			}),
			endDate: new FormControl('', {
				validators: [
					Validators.minLength(1),
					Validators.maxLength(100)
				]
			}),
			specialization: new FormControl('', {
				validators: [
					Validators.minLength(3),
					Validators.maxLength(150)
				]
			}),
			jobRole: new FormControl('', {
				validators: [
					Validators.minLength(3),
					Validators.maxLength(150)
				]
			}),
			industry: new FormControl('', {
				validators: [
					Validators.minLength(3),
					Validators.maxLength(150)
				]
			}),
			positionLevel: new FormControl('', {
				validators: [
				]
			}),
			salary: new FormControl('', {
				validators: [
					Validators.min(1),
					Validators.max(2000),
					Validators.pattern("^(?:[0-9]+(?:\.[0-9]{0,2})?)?$")
				]
			}),
			description: new FormControl('', {
				validators: [
					Validators.minLength(3),
					Validators.maxLength(500)
				]
			})
		})
		return trainerOccupationForm;
	}

	editTrainerOccupationForm():FormGroup {
		this.currentTrainer = this.trainerOccupation.trainer;
		this.currentPositionLevel = this.trainerOccupation.positionLevel;
		let trainerOccupationForm = new FormGroup({
			trainer: new FormControl(this.trainerOccupation.trainer, [
			]), 
			positionTitle: new FormControl(this.trainerOccupation.positionTitle, [
				Validators.minLength(3),
				Validators.maxLength(60)
			]), 
			companyName: new FormControl(this.trainerOccupation.companyName, [
				Validators.minLength(3),
				Validators.maxLength(60)
			]), 
			startDate: new FormControl((this.trainerOccupation.startDate === null) ? "" : new Date(this.trainerOccupation.startDate), [
				Validators.minLength(1),
				Validators.maxLength(100)
			]), 
			endDate: new FormControl((this.trainerOccupation.endDate === null) ? "" : new Date(this.trainerOccupation.endDate), [
				Validators.minLength(1),
				Validators.maxLength(100)
			]), 
			specialization: new FormControl(this.trainerOccupation.specialization, [
				Validators.minLength(3),
				Validators.maxLength(150)
			]), 
			jobRole: new FormControl(this.trainerOccupation.jobRole, [
				Validators.minLength(3),
				Validators.maxLength(150)
			]), 
			industry: new FormControl(this.trainerOccupation.industry, [
				Validators.minLength(3),
				Validators.maxLength(150)
			]), 
			positionLevel: new FormControl(this.trainerOccupation.positionLevel, [
			]), 
			salary: new FormControl(this.trainerOccupation.salary, [
				Validators.pattern("^(?:[0-9]+(?:\.[0-9]{0,2})?)?$"),
				Validators.min(1),
				Validators.max(2000)
			]), 
			description: new FormControl(this.trainerOccupation.description, [
				Validators.minLength(3),
				Validators.maxLength(500)
			])
		})
		return trainerOccupationForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.trainerOccupationForm.controls[controlName].hasError(errorName);
	}

	public save(trainerOccupation:TrainerOccupation) {
		trainerOccupation.trainer = this.trainerOccupation.trainer;
		trainerOccupation.options = this.trainerOccupation.options;
		if (trainerOccupation.startDate !== null) {
			trainerOccupation.startDate = new Date(trainerOccupation.startDate);
			trainerOccupation.startDate = new Date(trainerOccupation.startDate.getFullYear(), 
				trainerOccupation.startDate.getMonth(), trainerOccupation.startDate.getDate());
			trainerOccupation.startDate.setDate(trainerOccupation.startDate.getDate() + 1);
		}
		if (trainerOccupation.endDate !== null) {
			trainerOccupation.endDate = new Date(trainerOccupation.endDate);
			trainerOccupation.endDate = new Date(trainerOccupation.endDate.getFullYear(), 
				trainerOccupation.endDate.getMonth(), trainerOccupation.endDate.getDate());
			trainerOccupation.endDate.setDate(trainerOccupation.endDate.getDate() + 1);
		}
		if (this.trainerOccupation.id === 0) {
			this.trainerOccupationService.save(trainerOccupation).subscribe((trainerOccupations) => {
				this.modalController.dismiss({ 'dismissed': true, 'trainerOccupations':trainerOccupations });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			trainerOccupation.id = this.trainerOccupation.id;
			this.trainerOccupationService.update(trainerOccupation.id, trainerOccupation).subscribe((trainerOccupations) => {
				this.modalController.dismiss({ 'dismissed': true, 'trainerOccupations':trainerOccupations });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
