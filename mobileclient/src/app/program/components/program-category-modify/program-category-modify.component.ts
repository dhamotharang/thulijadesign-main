import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { ProgramCategory } from '../../../shared/models/program/program-category';
import { ProgramCategoryService } from '../../../shared/services/program/program-category.service';

@Component({
	selector: 'app-program-category-modify',
	templateUrl: './program-category-modify.component.html',
	styleUrls: ['./program-category-modify.component.scss']
})
export class ProgramCategoryModifyComponent implements OnInit {

	public programCategoryForm:FormGroup;
	public programCategory:ProgramCategory;
	public errorMessage:string;

	constructor(private programCategoryService:ProgramCategoryService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.programCategory = this.navParams.get('programCategory');
	}

	ngOnInit() {
		if (this.programCategory.id === 0) {
			this.programCategoryForm = this.createProgramCategoryForm();
		} else {
			this.programCategoryForm = this.editProgramCategoryForm();
		}
	}

	createProgramCategoryForm():FormGroup {
		let programCategoryForm = new FormGroup({
			sequence: new FormControl(this.programCategory.sequence, {
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
		return programCategoryForm;
	}

	editProgramCategoryForm():FormGroup {
		let programCategoryForm = new FormGroup({
			sequence: new FormControl(this.programCategory.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(2000)
			]), 
			name: new FormControl(this.programCategory.name, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			description: new FormControl(this.programCategory.description, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(250)
			]), 
			byDefault: new FormControl(
				Boolean(Number(this.programCategory.byDefault)))
		})
		return programCategoryForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.programCategoryForm.controls[controlName].hasError(errorName);
	}

	public save(programCategory:ProgramCategory) {
		if (this.programCategory.id === 0) {
			this.programCategoryService.save(programCategory).subscribe((programCategories) => {
				this.modalController.dismiss({ 'dismissed': true, 'programCategories':programCategories });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			programCategory.id = this.programCategory.id;
			this.programCategoryService.update(programCategory.id, programCategory).subscribe((programCategories) => {
				this.modalController.dismiss({ 'dismissed': true, 'programCategories':programCategories });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
