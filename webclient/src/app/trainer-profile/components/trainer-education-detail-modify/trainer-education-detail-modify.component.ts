import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { Trainer } from '../../../shared/models/trainer/trainer';
import { TrainerService } from '../../../shared/services/trainer/trainer.service';
import { Qualification } from '../../../shared/models/general/qualification';
import { QualificationService } from '../../../shared/services/general/qualification.service';
import { State } from '../../../shared/models/general/state';
import { StateService } from '../../../shared/services/general/state.service';
import { Country } from '../../../shared/models/general/country';
import { CountryService } from '../../../shared/services/general/country.service';
import { FieldStudy } from '../../../shared/models/general/field-study';
import { FieldStudyService } from '../../../shared/services/general/field-study.service';
import { TrainerEducationDetail } from '../../../shared/models/trainer/trainer-education-detail';
import { TrainerEducationDetailService } from '../../../shared/services/trainer/trainer-education-detail.service';

@Component({
	selector: 'app-trainer-education-detail-modify',
	templateUrl: './trainer-education-detail-modify.component.html',
	styleUrls: ['./trainer-education-detail-modify.component.css']
})
export class TrainerEducationDetailModifyComponent implements OnInit {

	public trainerEducationDetailForm:FormGroup;
	public trainers:Trainer[];
	public currentTrainer:Trainer;
	public qualifications:Qualification[];
	public currentQualification:Qualification;
	public fieldStudies:FieldStudy[];
	public currentFieldStudy:FieldStudy;
	public errorMessage:string;

	compareTrainer = (currenttrainer: Trainer, trainer: Trainer) => currenttrainer.id == trainer.id;
	
	compareQualification = (currentqualification: Qualification, qualification: Qualification) => currentqualification.id == qualification.id;
	
	compareFieldStudy = (currentfieldStudy: FieldStudy, fieldStudy: FieldStudy) => currentfieldStudy.id == fieldStudy.id;
	
	constructor(private trainerEducationDetailService:TrainerEducationDetailService,
		private trainerService:TrainerService,
		private qualificationService:QualificationService,
		private fieldStudyService:FieldStudyService,
		private dialogRef: MatDialogRef<TrainerEducationDetailModifyComponent>,
		@Inject(MAT_DIALOG_DATA) public trainerEducationDetail:TrainerEducationDetail) {
			this.trainerService.findAllByLookup().subscribe(trainers => {
				this.trainers = trainers;
			})
			this.qualificationService.findAllByLookup().subscribe(qualifications => {
				this.qualifications = qualifications;
				if (this.trainerEducationDetail.id === 0) {
					this.qualifications.forEach((qualification) => {
						if (qualification.byDefault == true) this.trainerEducationDetailForm.controls['qualification'].setValue(qualification);
					}, (error) => {
						this.errorMessage = error.message;
					})
				}
			})
			this.fieldStudyService.findAllByLookup().subscribe(fieldStudies => {
				this.fieldStudies = fieldStudies;
				if (this.trainerEducationDetail.id === 0) {
					this.fieldStudies.forEach((fieldStudy) => {
						if (fieldStudy.byDefault == true) this.trainerEducationDetailForm.controls['fieldStudy'].setValue(fieldStudy);
					}, (error) => {
						this.errorMessage = error.message;
					})
				}
			})
	}

	ngOnInit() {
		if (this.trainerEducationDetail.id === 0) {
			this.trainerEducationDetailForm = this.createTrainerEducationDetailForm();
		} else {
			this.trainerEducationDetailForm = this.editTrainerEducationDetailForm();
		}
	}

	createTrainerEducationDetailForm():FormGroup {
		let trainerEducationDetailForm = new FormGroup({
			trainer: new FormControl('', {
				validators: [
				]
			}),
			instituteName: new FormControl('', {
				validators: [
					Validators.minLength(1),
					Validators.maxLength(60)
				]
			}),
			graduationDate: new FormControl('', {
				validators: [
					Validators.minLength(1),
					Validators.maxLength(100)
				]
			}),
			qualification: new FormControl('', {
				validators: [
				]
			}),
			instituteLocation: new FormControl('', {
				validators: [
					Validators.minLength(3),
					Validators.maxLength(120)
				]
			}),
			fieldStudy: new FormControl('', {
				validators: [
				]
			}),
			major: new FormControl('', {
				validators: [
					Validators.minLength(3),
					Validators.maxLength(120)
				]
			}),
			grade: new FormControl('', {
				validators: [
					Validators.minLength(3),
					Validators.maxLength(120)
				]
			}),
			description: new FormControl('', {
				validators: [
					Validators.minLength(3),
					Validators.maxLength(500)
				]
			})
		})
		return trainerEducationDetailForm;
	}

	editTrainerEducationDetailForm():FormGroup {
		this.currentTrainer = this.trainerEducationDetail.trainer;
		this.currentQualification = this.trainerEducationDetail.qualification;
		this.currentFieldStudy = this.trainerEducationDetail.fieldStudy;
		let trainerEducationDetailForm = new FormGroup({
			trainer: new FormControl(this.trainerEducationDetail.trainer, [
			]), 
			instituteName: new FormControl(this.trainerEducationDetail.instituteName, [
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			graduationDate: new FormControl((this.trainerEducationDetail.graduationDate === null) ? "" : new Date(this.trainerEducationDetail.graduationDate), [
				Validators.minLength(1),
				Validators.maxLength(100)
			]), 
			qualification: new FormControl(this.trainerEducationDetail.qualification, [
			]), 
			instituteLocation: new FormControl(this.trainerEducationDetail.instituteLocation, [
				Validators.minLength(3),
				Validators.maxLength(120)
			]), 
			fieldStudy: new FormControl(this.trainerEducationDetail.fieldStudy, [
			]), 
			major: new FormControl(this.trainerEducationDetail.major, [
				Validators.minLength(3),
				Validators.maxLength(120)
			]), 
			grade: new FormControl(this.trainerEducationDetail.grade, [
				Validators.minLength(3),
				Validators.maxLength(120)
			]), 
			description: new FormControl(this.trainerEducationDetail.description, [
				Validators.minLength(3),
				Validators.maxLength(500)
			])
		})
		return trainerEducationDetailForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.trainerEducationDetailForm.controls[controlName].hasError(errorName);
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

	public save(trainerEducationDetail:TrainerEducationDetail) {
		trainerEducationDetail.trainer = this.trainerEducationDetail.trainer;
		trainerEducationDetail.options = this.trainerEducationDetail.options;
		if (trainerEducationDetail.graduationDate !== null) {
			trainerEducationDetail.graduationDate = new Date(trainerEducationDetail.graduationDate);
			trainerEducationDetail.graduationDate = new Date(trainerEducationDetail.graduationDate.getFullYear(), 
				trainerEducationDetail.graduationDate.getMonth(), trainerEducationDetail.graduationDate.getDate());
			trainerEducationDetail.graduationDate.setDate(trainerEducationDetail.graduationDate.getDate() + 1);
		}
		if (this.trainerEducationDetailForm.valid) {
			if (this.trainerEducationDetail.id === 0) {
				this.trainerEducationDetailService.save(trainerEducationDetail).subscribe((trainerEducationDetails) => {
					this.dialogRef.close(trainerEducationDetails);
				}, (error) => {
					this.errorMessage = error.message;
				})
			} else {
				trainerEducationDetail.id = this.trainerEducationDetail.id;
				this.trainerEducationDetailService.update(trainerEducationDetail.id, trainerEducationDetail).subscribe((trainerEducationDetails) => {
					this.dialogRef.close(trainerEducationDetails);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		} else {
			this.validateAllFormFields(this.trainerEducationDetailForm);
		}
	}

	public onCancel() {
		this.dialogRef.close();
	}

}
