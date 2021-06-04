import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { ScholarOccupation } from '../../../shared/models/scholar/scholar-occupation';
import { ScholarOccupationService } from '../../../shared/services/scholar/scholar-occupation.service';
import { Scholar } from '../../../shared/models/scholar/scholar';
import { ScholarService } from '../../../shared/services/scholar/scholar.service';
import { Qualification } from '../../../shared/models/general/qualification';
import { QualificationService } from '../../../shared/services/general/qualification.service';
import { State } from '../../../shared/models/general/state';
import { StateService } from '../../../shared/services/general/state.service';
import { Country } from '../../../shared/models/general/country';
import { CountryService } from '../../../shared/services/general/country.service';
import { PositionLevel } from '../../../shared/models/general/position-level';
import { PositionLevelService } from '../../../shared/services/general/position-level.service';

@Component({
	selector: 'app-scholar-occupation-manager-modify',
	templateUrl: './scholar-occupation-manager-modify.component.html',
	styleUrls: ['./scholar-occupation-manager-modify.component.css']
})
export class ScholarOccupationManagerModifyComponent implements OnInit {

	public scholarOccupationForm:FormGroup;
	public scholars:Scholar[];
	public currentScholar:Scholar;
	public positionLevels:PositionLevel[];
	public currentPositionLevel:PositionLevel;
	public errorMessage:string;

	compareScholar = (currentscholar: Scholar, scholar: Scholar) => currentscholar.id == scholar.id;
	
	comparePositionLevel = (currentpositionLevel: PositionLevel, positionLevel: PositionLevel) => currentpositionLevel.id == positionLevel.id;
	
	constructor(private scholarOccupationService:ScholarOccupationService,
		private scholarService:ScholarService,
		private positionLevelService:PositionLevelService,
		private dialogRef: MatDialogRef<ScholarOccupationManagerModifyComponent>,
		@Inject(MAT_DIALOG_DATA) public scholarOccupation:ScholarOccupation) {
			this.scholarService.findAllByLookup().subscribe(scholars => {
				this.scholars = scholars;
			})
			this.positionLevelService.findAllByLookup().subscribe(positionLevels => {
				this.positionLevels = positionLevels;
				if (this.scholarOccupation.id === 0) {
					this.positionLevels.forEach((positionLevel) => {
						if (positionLevel.byDefault == true) this.scholarOccupationForm.controls['positionLevel'].setValue(positionLevel);
					}, (error) => {
						this.errorMessage = error.message;
					})
				}
			})
	}

	ngOnInit() {
		if (this.scholarOccupation.id === 0) {
			this.scholarOccupationForm = this.createScholarOccupationForm();
		} else {
			this.scholarOccupationForm = this.editScholarOccupationForm();
		}
	}

	createScholarOccupationForm():FormGroup {
		let scholarOccupationForm = new FormGroup({
			scholar: new FormControl('', {
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
				]
			}),
			endDate: new FormControl('', {
				validators: [
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
		return scholarOccupationForm;
	}

	editScholarOccupationForm():FormGroup {
		this.currentScholar = this.scholarOccupation.scholar;
		this.currentPositionLevel = this.scholarOccupation.positionLevel;
		let scholarOccupationForm = new FormGroup({
			scholar: new FormControl(this.scholarOccupation.scholar, [
			]), 
			positionTitle: new FormControl(this.scholarOccupation.positionTitle, [
				Validators.minLength(3),
				Validators.maxLength(60)
			]), 
			companyName: new FormControl(this.scholarOccupation.companyName, [
				Validators.minLength(3),
				Validators.maxLength(60)
			]), 
			startDate: new FormControl((this.scholarOccupation.startDate === null) ? "" : new Date(this.scholarOccupation.startDate), [
			]), 
			endDate: new FormControl((this.scholarOccupation.endDate === null) ? "" : new Date(this.scholarOccupation.endDate), [
			]), 
			specialization: new FormControl(this.scholarOccupation.specialization, [
				Validators.minLength(3),
				Validators.maxLength(150)
			]), 
			jobRole: new FormControl(this.scholarOccupation.jobRole, [
				Validators.minLength(3),
				Validators.maxLength(150)
			]), 
			industry: new FormControl(this.scholarOccupation.industry, [
				Validators.minLength(3),
				Validators.maxLength(150)
			]), 
			positionLevel: new FormControl(this.scholarOccupation.positionLevel, [
			]), 
			salary: new FormControl(this.scholarOccupation.salary, [
				Validators.pattern("^(?:[0-9]+(?:\.[0-9]{0,2})?)?$"),
				Validators.min(1),
				Validators.max(2000)
			]), 
			description: new FormControl(this.scholarOccupation.description, [
				Validators.minLength(3),
				Validators.maxLength(500)
			])
		})
		return scholarOccupationForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.scholarOccupationForm.controls[controlName].hasError(errorName);
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

	public save(scholarOccupation:ScholarOccupation) {
		scholarOccupation.scholar = this.scholarOccupation.scholar;
		scholarOccupation.options = this.scholarOccupation.options;
		if (scholarOccupation.startDate !== null) {
			scholarOccupation.startDate = new Date(scholarOccupation.startDate);
			scholarOccupation.startDate = new Date(scholarOccupation.startDate.getFullYear(), 
				scholarOccupation.startDate.getMonth(), scholarOccupation.startDate.getDate());
			scholarOccupation.startDate.setDate(scholarOccupation.startDate.getDate() + 1);
		}
		if (scholarOccupation.endDate !== null) {
			scholarOccupation.endDate = new Date(scholarOccupation.endDate);
			scholarOccupation.endDate = new Date(scholarOccupation.endDate.getFullYear(), 
				scholarOccupation.endDate.getMonth(), scholarOccupation.endDate.getDate());
			scholarOccupation.endDate.setDate(scholarOccupation.endDate.getDate() + 1);
		}
		if (this.scholarOccupationForm.valid) {
			if (this.scholarOccupation.id === 0) {
				this.scholarOccupationService.save(scholarOccupation).subscribe((scholarOccupations) => {
					this.dialogRef.close(scholarOccupations);
				}, (error) => {
					this.errorMessage = error.message;
				})
			} else {
				scholarOccupation.id = this.scholarOccupation.id;
				this.scholarOccupationService.update(scholarOccupation.id, scholarOccupation).subscribe((scholarOccupations) => {
					this.dialogRef.close(scholarOccupations);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		} else {
			this.validateAllFormFields(this.scholarOccupationForm);
		}
	}

	public onCancel() {
		this.dialogRef.close();
	}

}
