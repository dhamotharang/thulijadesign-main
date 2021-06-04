import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { Scholar } from '../../../shared/models/scholar/scholar';
import { ScholarService } from '../../../shared/services/scholar/scholar.service';
import { RelationType } from '../../../shared/models/general/relation-type';
import { RelationTypeService } from '../../../shared/services/general/relation-type.service';
import { Citizen } from '../../../shared/models/general/citizen';
import { CitizenService } from '../../../shared/services/general/citizen.service';
import { ScholarFamily } from '../../../shared/models/scholar/scholar-family';
import { ScholarFamilyService } from '../../../shared/services/scholar/scholar-family.service';

@Component({
	selector: 'app-scholar-family-modify',
	templateUrl: './scholar-family-modify.component.html',
	styleUrls: ['./scholar-family-modify.component.css']
})
export class ScholarFamilyModifyComponent implements OnInit {

	public scholarFamilyForm:FormGroup;
	public scholars:Scholar[];
	public currentScholar:Scholar;
	public relationTypes:RelationType[];
	public currentRelationType:RelationType;
	public citizens:Citizen[];
	public currentCitizen:Citizen;
	public errorMessage:string;

	compareScholar = (currentscholar: Scholar, scholar: Scholar) => currentscholar.id == scholar.id;
	
	compareRelationType = (currentrelationType: RelationType, relationType: RelationType) => currentrelationType.id == relationType.id;
	
	compareCitizen = (currentcitizen: Citizen, citizen: Citizen) => currentcitizen.id == citizen.id;
	
	constructor(private scholarFamilyService:ScholarFamilyService,
		private scholarService:ScholarService,
		private relationTypeService:RelationTypeService,
		private citizenService:CitizenService,
		private dialogRef: MatDialogRef<ScholarFamilyModifyComponent>,
		@Inject(MAT_DIALOG_DATA) public scholarFamily:ScholarFamily) {
			this.scholarService.findAllByLookup().subscribe(scholars => {
				this.scholars = scholars;
			})
			this.relationTypeService.findAllByLookup().subscribe(relationTypes => {
				this.relationTypes = relationTypes;
				if (this.scholarFamily.id === 0) {
					this.relationTypes.forEach((relationType) => {
						if (relationType.byDefault == true) this.scholarFamilyForm.controls['relationType'].setValue(relationType);
					}, (error) => {
						this.errorMessage = error.message;
					})
				}
			})
			this.citizenService.findAllByLookup().subscribe(citizens => {
				this.citizens = citizens;
				if (this.scholarFamily.id === 0) {
					this.citizens.forEach((citizen) => {
						if (citizen.byDefault == true) this.scholarFamilyForm.controls['citizen'].setValue(citizen);
					}, (error) => {
						this.errorMessage = error.message;
					})
				}
			})
	}

	ngOnInit() {
		if (this.scholarFamily.id === 0) {
			this.scholarFamilyForm = this.createScholarFamilyForm();
		} else {
			this.scholarFamilyForm = this.editScholarFamilyForm();
		}
	}

	createScholarFamilyForm():FormGroup {
		let scholarFamilyForm = new FormGroup({
			scholar: new FormControl('', {
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
		return scholarFamilyForm;
	}

	editScholarFamilyForm():FormGroup {
		this.currentScholar = this.scholarFamily.scholar;
		this.currentRelationType = this.scholarFamily.relationType;
		this.currentCitizen = this.scholarFamily.citizen;
		let scholarFamilyForm = new FormGroup({
			scholar: new FormControl(this.scholarFamily.scholar, [
			]), 
			relationType: new FormControl(this.scholarFamily.relationType, [
			]), 
			name: new FormControl(this.scholarFamily.name, [
				Validators.required, 
				Validators.minLength(3),
				Validators.maxLength(60)
			]), 
			occupation: new FormControl(this.scholarFamily.occupation, [
				Validators.minLength(3),
				Validators.maxLength(60)
			]), 
			citizen: new FormControl(this.scholarFamily.citizen, [
			]), 
			nricNumber: new FormControl(this.scholarFamily.nricNumber, [
				Validators.minLength(3),
				Validators.maxLength(20)
			]), 
			email: new FormControl(this.scholarFamily.email, [
				Validators.minLength(1),
				Validators.maxLength(80)
			]), 
			phone: new FormControl(this.scholarFamily.phone, [
				Validators.minLength(1),
				Validators.maxLength(20)
			])
		})
		return scholarFamilyForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.scholarFamilyForm.controls[controlName].hasError(errorName);
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

	public save(scholarFamily:ScholarFamily) {
		scholarFamily.scholar = this.scholarFamily.scholar;
		scholarFamily.options = this.scholarFamily.options;
		if (this.scholarFamilyForm.valid) {
			if (this.scholarFamily.id === 0) {
				this.scholarFamilyService.save(scholarFamily).subscribe((scholarFamilies) => {
					this.dialogRef.close(scholarFamilies);
				}, (error) => {
					this.errorMessage = error.message;
				})
			} else {
				scholarFamily.id = this.scholarFamily.id;
				this.scholarFamilyService.update(scholarFamily.id, scholarFamily).subscribe((scholarFamilies) => {
					this.dialogRef.close(scholarFamilies);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		} else {
			this.validateAllFormFields(this.scholarFamilyForm);
		}
	}

	public onCancel() {
		this.dialogRef.close();
	}

}
