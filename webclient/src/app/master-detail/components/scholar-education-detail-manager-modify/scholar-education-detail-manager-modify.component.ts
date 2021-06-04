import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { ScholarEducationDetail } from '../../../shared/models/scholar/scholar-education-detail';
import { ScholarEducationDetailService } from '../../../shared/services/scholar/scholar-education-detail.service';
import { Scholar } from '../../../shared/models/scholar/scholar';
import { ScholarService } from '../../../shared/services/scholar/scholar.service';
import { Qualification } from '../../../shared/models/general/qualification';
import { QualificationService } from '../../../shared/services/general/qualification.service';
import { State } from '../../../shared/models/general/state';
import { StateService } from '../../../shared/services/general/state.service';
import { Country } from '../../../shared/models/general/country';
import { CountryService } from '../../../shared/services/general/country.service';
import { FieldStudy } from '../../../shared/models/general/field-study';
import { FieldStudyService } from '../../../shared/services/general/field-study.service';

@Component({
	selector: 'app-scholar-education-detail-manager-modify',
	templateUrl: './scholar-education-detail-manager-modify.component.html',
	styleUrls: ['./scholar-education-detail-manager-modify.component.css']
})
export class ScholarEducationDetailManagerModifyComponent implements OnInit {

	public scholarEducationDetailForm:FormGroup;
	public scholars:Scholar[];
	public currentScholar:Scholar;
	public qualifications:Qualification[];
	public currentQualification:Qualification;
	public fieldStudies:FieldStudy[];
	public currentFieldStudy:FieldStudy;
	public errorMessage:string;

	compareScholar = (currentscholar: Scholar, scholar: Scholar) => currentscholar.id == scholar.id;
	
	compareQualification = (currentqualification: Qualification, qualification: Qualification) => currentqualification.id == qualification.id;
	
	compareFieldStudy = (currentfieldStudy: FieldStudy, fieldStudy: FieldStudy) => currentfieldStudy.id == fieldStudy.id;
	
	constructor(private scholarEducationDetailService:ScholarEducationDetailService,
		private scholarService:ScholarService,
		private qualificationService:QualificationService,
		private fieldStudyService:FieldStudyService,
		private dialogRef: MatDialogRef<ScholarEducationDetailManagerModifyComponent>,
		@Inject(MAT_DIALOG_DATA) public scholarEducationDetail:ScholarEducationDetail) {
			this.scholarService.findAllByLookup().subscribe(scholars => {
				this.scholars = scholars;
			})
			this.qualificationService.findAllByLookup().subscribe(qualifications => {
				this.qualifications = qualifications;
				if (this.scholarEducationDetail.id === 0) {
					this.qualifications.forEach((qualification) => {
						if (qualification.byDefault == true) this.scholarEducationDetailForm.controls['qualification'].setValue(qualification);
					}, (error) => {
						this.errorMessage = error.message;
					})
				}
			})
			this.fieldStudyService.findAllByLookup().subscribe(fieldStudies => {
				this.fieldStudies = fieldStudies;
				if (this.scholarEducationDetail.id === 0) {
					this.fieldStudies.forEach((fieldStudy) => {
						if (fieldStudy.byDefault == true) this.scholarEducationDetailForm.controls['fieldStudy'].setValue(fieldStudy);
					}, (error) => {
						this.errorMessage = error.message;
					})
				}
			})
	}

	ngOnInit() {
		if (this.scholarEducationDetail.id === 0) {
			this.scholarEducationDetailForm = this.createScholarEducationDetailForm();
		} else {
			this.scholarEducationDetailForm = this.editScholarEducationDetailForm();
		}
	}

	createScholarEducationDetailForm():FormGroup {
		let scholarEducationDetailForm = new FormGroup({
			scholar: new FormControl('', {
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
		return scholarEducationDetailForm;
	}

	editScholarEducationDetailForm():FormGroup {
		this.currentScholar = this.scholarEducationDetail.scholar;
		this.currentQualification = this.scholarEducationDetail.qualification;
		this.currentFieldStudy = this.scholarEducationDetail.fieldStudy;
		let scholarEducationDetailForm = new FormGroup({
			scholar: new FormControl(this.scholarEducationDetail.scholar, [
			]), 
			instituteName: new FormControl(this.scholarEducationDetail.instituteName, [
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			graduationDate: new FormControl((this.scholarEducationDetail.graduationDate === null) ? "" : new Date(this.scholarEducationDetail.graduationDate), [
			]), 
			qualification: new FormControl(this.scholarEducationDetail.qualification, [
			]), 
			instituteLocation: new FormControl(this.scholarEducationDetail.instituteLocation, [
				Validators.minLength(3),
				Validators.maxLength(120)
			]), 
			fieldStudy: new FormControl(this.scholarEducationDetail.fieldStudy, [
			]), 
			major: new FormControl(this.scholarEducationDetail.major, [
				Validators.minLength(3),
				Validators.maxLength(120)
			]), 
			grade: new FormControl(this.scholarEducationDetail.grade, [
				Validators.minLength(3),
				Validators.maxLength(120)
			]), 
			description: new FormControl(this.scholarEducationDetail.description, [
				Validators.minLength(3),
				Validators.maxLength(500)
			])
		})
		return scholarEducationDetailForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.scholarEducationDetailForm.controls[controlName].hasError(errorName);
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

	public save(scholarEducationDetail:ScholarEducationDetail) {
		scholarEducationDetail.scholar = this.scholarEducationDetail.scholar;
		scholarEducationDetail.options = this.scholarEducationDetail.options;
		if (scholarEducationDetail.graduationDate !== null) {
			scholarEducationDetail.graduationDate = new Date(scholarEducationDetail.graduationDate);
			scholarEducationDetail.graduationDate = new Date(scholarEducationDetail.graduationDate.getFullYear(), 
				scholarEducationDetail.graduationDate.getMonth(), scholarEducationDetail.graduationDate.getDate());
			scholarEducationDetail.graduationDate.setDate(scholarEducationDetail.graduationDate.getDate() + 1);
		}
		if (this.scholarEducationDetailForm.valid) {
			if (this.scholarEducationDetail.id === 0) {
				this.scholarEducationDetailService.save(scholarEducationDetail).subscribe((scholarEducationDetails) => {
					this.dialogRef.close(scholarEducationDetails);
				}, (error) => {
					this.errorMessage = error.message;
				})
			} else {
				scholarEducationDetail.id = this.scholarEducationDetail.id;
				this.scholarEducationDetailService.update(scholarEducationDetail.id, scholarEducationDetail).subscribe((scholarEducationDetails) => {
					this.dialogRef.close(scholarEducationDetails);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		} else {
			this.validateAllFormFields(this.scholarEducationDetailForm);
		}
	}

	public onCancel() {
		this.dialogRef.close();
	}

}
