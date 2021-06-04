import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { ProgramMaster } from '../../../shared/models/program/program-master';
import { ProgramMasterService } from '../../../shared/services/program/program-master.service';
import { ProgramCategory } from '../../../shared/models/program/program-category';
import { ProgramCategoryService } from '../../../shared/services/program/program-category.service';
import { ProgramType } from '../../../shared/models/program/program-type';
import { ProgramTypeService } from '../../../shared/services/program/program-type.service';

@Component({
	selector: 'app-program-master-manager-modify',
	templateUrl: './program-master-manager-modify.component.html',
	styleUrls: ['./program-master-manager-modify.component.css']
})
export class ProgramMasterManagerModifyComponent implements OnInit {

	public programMasterForm:FormGroup;
	public programMaster:ProgramMaster;
	public programCategories:ProgramCategory[];
	public currentProgramCategory:ProgramCategory;
	public programTypes:ProgramType[];
	public currentProgramType:ProgramType;
	public errorMessage:string;

	compareProgramCategory = (currentprogramCategory: ProgramCategory, programCategory: ProgramCategory) => currentprogramCategory.id == programCategory.id;

	compareProgramType = (currentprogramType: ProgramType, programType: ProgramType) => currentprogramType.id == programType.id;

	constructor(private programMasterService:ProgramMasterService,
			private programCategoryService:ProgramCategoryService,
			private programTypeService:ProgramTypeService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.programMaster = this.navParams.get('programMaster');
		this.programCategoryService.findAllByLookup().subscribe(programCategories => {
			this.programCategories = programCategories;
			if (this.programMaster.id === 0) {
				this.programCategories.forEach((programCategory) => {
					if (programCategory.byDefault == true) this.programMasterForm.controls['programCategory'].setValue(programCategory);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		})
		this.programTypeService.findAllByLookup().subscribe(programTypes => {
			this.programTypes = programTypes;
			if (this.programMaster.id === 0) {
				this.programTypes.forEach((programType) => {
					if (programType.byDefault == true) this.programMasterForm.controls['programType'].setValue(programType);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		})
	}

	ngOnInit() {
		if (this.programMaster.id === 0) {
			this.programMasterForm = this.createProgramMasterForm();
		} else {
			this.programMasterForm = this.editProgramMasterForm();
		}
	}

	createProgramMasterForm():FormGroup {
		let programMasterForm = new FormGroup({
			sequence: new FormControl(this.programMaster.sequence, {
				validators: [
					Validators.required, 
					Validators.min(1),
					Validators.max(2000),
					Validators.pattern("^[0-9]*$")
				]
			}),
			title: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(1),
					Validators.maxLength(60)
				]
			}),
			programCategory: new FormControl('', {
				validators: [
				]
			}),
			programType: new FormControl('', {
				validators: [
				]
			}),
			description: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(1),
					Validators.maxLength(500)
				]
			}),
			objective: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(1),
					Validators.maxLength(500)
				]
			}),
			targetParticipants: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(1),
					Validators.maxLength(500)
				]
			}),
			programPrerequisites: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(1),
					Validators.maxLength(500)
				]
			}),
			deliveryMode: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(1),
					Validators.maxLength(500)
				]
			}),
			moreInfo: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(1),
					Validators.maxLength(500)
				]
			})
		})
		return programMasterForm;
	}

	editProgramMasterForm():FormGroup {
		this.currentProgramCategory = this.programMaster.programCategory;
		this.currentProgramType = this.programMaster.programType;
		let programMasterForm = new FormGroup({
			sequence: new FormControl(this.programMaster.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(2000)
			]), 
			title: new FormControl(this.programMaster.title, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			programCategory: new FormControl(this.programMaster.programCategory, [
			]), 
			programType: new FormControl(this.programMaster.programType, [
			]), 
			description: new FormControl(this.programMaster.description, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(500)
			]), 
			objective: new FormControl(this.programMaster.objective, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(500)
			]), 
			targetParticipants: new FormControl(this.programMaster.targetParticipants, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(500)
			]), 
			programPrerequisites: new FormControl(this.programMaster.programPrerequisites, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(500)
			]), 
			deliveryMode: new FormControl(this.programMaster.deliveryMode, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(500)
			]), 
			moreInfo: new FormControl(this.programMaster.moreInfo, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(500)
			])
		})
		return programMasterForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.programMasterForm.controls[controlName].hasError(errorName);
	}

	public save(programMaster:ProgramMaster) {
		if (this.programMaster.id === 0) {
			this.programMasterService.save(programMaster).subscribe((programMasters) => {
				this.modalController.dismiss({ 'dismissed': true, 'programMasters':programMasters });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			programMaster.id = this.programMaster.id;
			this.programMasterService.update(programMaster.id, programMaster).subscribe((programMasters) => {
				this.modalController.dismiss({ 'dismissed': true, 'programMasters':programMasters });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
