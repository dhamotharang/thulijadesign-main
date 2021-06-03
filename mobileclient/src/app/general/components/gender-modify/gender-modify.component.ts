import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { Gender } from '../../../shared/models/general/gender';
import { GenderService } from '../../../shared/services/general/gender.service';

@Component({
	selector: 'app-gender-modify',
	templateUrl: './gender-modify.component.html',
	styleUrls: ['./gender-modify.component.scss']
})
export class GenderModifyComponent implements OnInit {

	public genderForm:FormGroup;
	public gender:Gender;
	public errorMessage:string;

	constructor(private genderService:GenderService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.gender = this.navParams.get('gender');
	}

	ngOnInit() {
		if (this.gender.id === 0) {
			this.genderForm = this.createGenderForm();
		} else {
			this.genderForm = this.editGenderForm();
		}
	}

	createGenderForm():FormGroup {
		let genderForm = new FormGroup({
			sequence: new FormControl(this.gender.sequence, {
				validators: [
					Validators.required, 
					Validators.min(1),
					Validators.max(10),
					Validators.pattern("^[0-9]*$")
				]
			}),
			code: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(1),
					Validators.maxLength(10)
				]
			}),
			name: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(1),
					Validators.maxLength(60)
				]
			}),
			byDefault: new FormControl(0)
		})
		return genderForm;
	}

	editGenderForm():FormGroup {
		let genderForm = new FormGroup({
			sequence: new FormControl(this.gender.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(10)
			]), 
			code: new FormControl(this.gender.code, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(10)
			]), 
			name: new FormControl(this.gender.name, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			byDefault: new FormControl(
				Boolean(Number(this.gender.byDefault)))
		})
		return genderForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.genderForm.controls[controlName].hasError(errorName);
	}

	public save(gender:Gender) {
		if (this.gender.id === 0) {
			this.genderService.save(gender).subscribe((genders) => {
				this.modalController.dismiss({ 'dismissed': true, 'genders':genders });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			gender.id = this.gender.id;
			this.genderService.update(gender.id, gender).subscribe((genders) => {
				this.modalController.dismiss({ 'dismissed': true, 'genders':genders });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
