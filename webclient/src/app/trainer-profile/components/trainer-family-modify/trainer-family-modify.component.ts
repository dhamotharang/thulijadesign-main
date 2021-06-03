import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { Trainer } from '../../../shared/models/trainer/trainer';
import { TrainerService } from '../../../shared/services/trainer/trainer.service';
import { RelationType } from '../../../shared/models/general/relation-type';
import { RelationTypeService } from '../../../shared/services/general/relation-type.service';
import { Citizen } from '../../../shared/models/general/citizen';
import { CitizenService } from '../../../shared/services/general/citizen.service';
import { TrainerFamily } from '../../../shared/models/trainer/trainer-family';
import { TrainerFamilyService } from '../../../shared/services/trainer/trainer-family.service';

@Component({
	selector: 'app-trainer-family-modify',
	templateUrl: './trainer-family-modify.component.html',
	styleUrls: ['./trainer-family-modify.component.css']
})
export class TrainerFamilyModifyComponent implements OnInit {

	public trainerFamilyForm:FormGroup;
	public trainers:Trainer[];
	public currentTrainer:Trainer;
	public relationTypes:RelationType[];
	public currentRelationType:RelationType;
	public citizens:Citizen[];
	public currentCitizen:Citizen;
	public errorMessage:string;

	compareTrainer = (currenttrainer: Trainer, trainer: Trainer) => currenttrainer.id == trainer.id;
	
	compareRelationType = (currentrelationType: RelationType, relationType: RelationType) => currentrelationType.id == relationType.id;
	
	compareCitizen = (currentcitizen: Citizen, citizen: Citizen) => currentcitizen.id == citizen.id;
	
	constructor(private trainerFamilyService:TrainerFamilyService,
		private trainerService:TrainerService,
		private relationTypeService:RelationTypeService,
		private citizenService:CitizenService,
		private dialogRef: MatDialogRef<TrainerFamilyModifyComponent>,
		@Inject(MAT_DIALOG_DATA) public trainerFamily:TrainerFamily) {
			this.trainerService.findAllByLookup().subscribe(trainers => {
				this.trainers = trainers;
			})
			this.relationTypeService.findAllByLookup().subscribe(relationTypes => {
				this.relationTypes = relationTypes;
				if (this.trainerFamily.id === 0) {
					this.relationTypes.forEach((relationType) => {
						if (relationType.byDefault == true) this.trainerFamilyForm.controls['relationType'].setValue(relationType);
					}, (error) => {
						this.errorMessage = error.message;
					})
				}
			})
			this.citizenService.findAllByLookup().subscribe(citizens => {
				this.citizens = citizens;
				if (this.trainerFamily.id === 0) {
					this.citizens.forEach((citizen) => {
						if (citizen.byDefault == true) this.trainerFamilyForm.controls['citizen'].setValue(citizen);
					}, (error) => {
						this.errorMessage = error.message;
					})
				}
			})
	}

	ngOnInit() {
		if (this.trainerFamily.id === 0) {
			this.trainerFamilyForm = this.createTrainerFamilyForm();
		} else {
			this.trainerFamilyForm = this.editTrainerFamilyForm();
		}
	}

	createTrainerFamilyForm():FormGroup {
		let trainerFamilyForm = new FormGroup({
			trainer: new FormControl('', {
				validators: [
				]
			}),
			relationType: new FormControl('', {
				validators: [
				]
			}),
			name: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(3),
					Validators.maxLength(60)
				]
			}),
			occupation: new FormControl('', {
				validators: [
					Validators.minLength(3),
					Validators.maxLength(60)
				]
			}),
			citizen: new FormControl('', {
				validators: [
				]
			}),
			nricNumber: new FormControl('', {
				validators: [
					Validators.minLength(3),
					Validators.maxLength(20)
				]
			}),
			email: new FormControl('', {
				validators: [
					Validators.minLength(1),
					Validators.maxLength(80)
				]
			}),
			phone: new FormControl('', {
				validators: [
					Validators.minLength(1),
					Validators.maxLength(20)
				]
			})
		})
		return trainerFamilyForm;
	}

	editTrainerFamilyForm():FormGroup {
		this.currentTrainer = this.trainerFamily.trainer;
		this.currentRelationType = this.trainerFamily.relationType;
		this.currentCitizen = this.trainerFamily.citizen;
		let trainerFamilyForm = new FormGroup({
			trainer: new FormControl(this.trainerFamily.trainer, [
			]), 
			relationType: new FormControl(this.trainerFamily.relationType, [
			]), 
			name: new FormControl(this.trainerFamily.name, [
				Validators.required, 
				Validators.minLength(3),
				Validators.maxLength(60)
			]), 
			occupation: new FormControl(this.trainerFamily.occupation, [
				Validators.minLength(3),
				Validators.maxLength(60)
			]), 
			citizen: new FormControl(this.trainerFamily.citizen, [
			]), 
			nricNumber: new FormControl(this.trainerFamily.nricNumber, [
				Validators.minLength(3),
				Validators.maxLength(20)
			]), 
			email: new FormControl(this.trainerFamily.email, [
				Validators.minLength(1),
				Validators.maxLength(80)
			]), 
			phone: new FormControl(this.trainerFamily.phone, [
				Validators.minLength(1),
				Validators.maxLength(20)
			])
		})
		return trainerFamilyForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.trainerFamilyForm.controls[controlName].hasError(errorName);
	}

	private validateAllFormFields(formGroup: FormGroup) {
		Object.keys(formGroup.controls).forEach(field => {
			const control = formGroup.get(field);
			if (control instanceof FormControl) {
				control.markAsTouched({ onlySelf: true });
			} else if (control instanceof FormGroup) {
				this.validateAllFormFields(control);
			}
		});
	}

	public save(trainerFamily:TrainerFamily) {
		trainerFamily.trainer = this.trainerFamily.trainer;
		trainerFamily.options = this.trainerFamily.options;
		if (this.trainerFamilyForm.valid) {
			if (this.trainerFamily.id === 0) {
				this.trainerFamilyService.save(trainerFamily).subscribe((trainerFamilies) => {
					this.dialogRef.close(trainerFamilies);
				}, (error) => {
					this.errorMessage = error.message;
				})
			} else {
				trainerFamily.id = this.trainerFamily.id;
				this.trainerFamilyService.update(trainerFamily.id, trainerFamily).subscribe((trainerFamilies) => {
					this.dialogRef.close(trainerFamilies);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		} else {
			this.validateAllFormFields(this.trainerFamilyForm);
		}
	}

	public onCancel() {
		this.dialogRef.close();
	}

}
