import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { TrainingDelivery } from '../../../shared/models/program/training-delivery';
import { TrainingDeliveryService } from '../../../shared/services/program/training-delivery.service';

@Component({
	selector: 'app-training-delivery-modify',
	templateUrl: './training-delivery-modify.component.html',
	styleUrls: ['./training-delivery-modify.component.scss']
})
export class TrainingDeliveryModifyComponent implements OnInit {

	public trainingDeliveryForm:FormGroup;
	public trainingDelivery:TrainingDelivery;
	public errorMessage:string;

	constructor(private trainingDeliveryService:TrainingDeliveryService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.trainingDelivery = this.navParams.get('trainingDelivery');
	}

	ngOnInit() {
		if (this.trainingDelivery.id === 0) {
			this.trainingDeliveryForm = this.createTrainingDeliveryForm();
		} else {
			this.trainingDeliveryForm = this.editTrainingDeliveryForm();
		}
	}

	createTrainingDeliveryForm():FormGroup {
		let trainingDeliveryForm = new FormGroup({
			sequence: new FormControl(this.trainingDelivery.sequence, {
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
		return trainingDeliveryForm;
	}

	editTrainingDeliveryForm():FormGroup {
		let trainingDeliveryForm = new FormGroup({
			sequence: new FormControl(this.trainingDelivery.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(2000)
			]), 
			name: new FormControl(this.trainingDelivery.name, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			description: new FormControl(this.trainingDelivery.description, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(250)
			]), 
			byDefault: new FormControl(
				Boolean(Number(this.trainingDelivery.byDefault)))
		})
		return trainingDeliveryForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.trainingDeliveryForm.controls[controlName].hasError(errorName);
	}

	public save(trainingDelivery:TrainingDelivery) {
		if (this.trainingDelivery.id === 0) {
			this.trainingDeliveryService.save(trainingDelivery).subscribe((trainingDeliveries) => {
				this.modalController.dismiss({ 'dismissed': true, 'trainingDeliveries':trainingDeliveries });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			trainingDelivery.id = this.trainingDelivery.id;
			this.trainingDeliveryService.update(trainingDelivery.id, trainingDelivery).subscribe((trainingDeliveries) => {
				this.modalController.dismiss({ 'dismissed': true, 'trainingDeliveries':trainingDeliveries });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
