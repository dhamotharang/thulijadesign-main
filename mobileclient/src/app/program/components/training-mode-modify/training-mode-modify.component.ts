import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { TrainingMode } from '../../../shared/models/program/training-mode';
import { TrainingModeService } from '../../../shared/services/program/training-mode.service';

@Component({
	selector: 'app-training-mode-modify',
	templateUrl: './training-mode-modify.component.html',
	styleUrls: ['./training-mode-modify.component.scss']
})
export class TrainingModeModifyComponent implements OnInit {

	public trainingModeForm:FormGroup;
	public trainingMode:TrainingMode;
	public errorMessage:string;

	constructor(private trainingModeService:TrainingModeService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.trainingMode = this.navParams.get('trainingMode');
	}

	ngOnInit() {
		if (this.trainingMode.id === 0) {
			this.trainingModeForm = this.createTrainingModeForm();
		} else {
			this.trainingModeForm = this.editTrainingModeForm();
		}
	}

	createTrainingModeForm():FormGroup {
		let trainingModeForm = new FormGroup({
			sequence: new FormControl(this.trainingMode.sequence, {
				validators: [
					Validators.required, 
					Validators.min(1),
					Validators.max(2000),
					Validators.pattern("^[0-9]*$")
				]
			}),
			name: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(1),
					Validators.maxLength(60)
				]
			}),
			description: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(1),
					Validators.maxLength(250)
				]
			}),
			byDefault: new FormControl(0)
		})
		return trainingModeForm;
	}

	editTrainingModeForm():FormGroup {
		let trainingModeForm = new FormGroup({
			sequence: new FormControl(this.trainingMode.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(2000)
			]), 
			name: new FormControl(this.trainingMode.name, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			description: new FormControl(this.trainingMode.description, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(250)
			]), 
			byDefault: new FormControl(
				Boolean(Number(this.trainingMode.byDefault)))
		})
		return trainingModeForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.trainingModeForm.controls[controlName].hasError(errorName);
	}

	public save(trainingMode:TrainingMode) {
		if (this.trainingMode.id === 0) {
			this.trainingModeService.save(trainingMode).subscribe((trainingModes) => {
				this.modalController.dismiss({ 'dismissed': true, 'trainingModes':trainingModes });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			trainingMode.id = this.trainingMode.id;
			this.trainingModeService.update(trainingMode.id, trainingMode).subscribe((trainingModes) => {
				this.modalController.dismiss({ 'dismissed': true, 'trainingModes':trainingModes });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
