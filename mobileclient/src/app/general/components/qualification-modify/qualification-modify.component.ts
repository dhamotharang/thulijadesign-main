import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { Qualification } from '../../../shared/models/general/qualification';
import { QualificationService } from '../../../shared/services/general/qualification.service';

@Component({
	selector: 'app-qualification-modify',
	templateUrl: './qualification-modify.component.html',
	styleUrls: ['./qualification-modify.component.scss']
})
export class QualificationModifyComponent implements OnInit {

	public qualificationForm:FormGroup;
	public qualification:Qualification;
	public errorMessage:string;

	constructor(private qualificationService:QualificationService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.qualification = this.navParams.get('qualification');
	}

	ngOnInit() {
		if (this.qualification.id === 0) {
			this.qualificationForm = this.createQualificationForm();
		} else {
			this.qualificationForm = this.editQualificationForm();
		}
	}

	createQualificationForm():FormGroup {
		let qualificationForm = new FormGroup({
			sequence: new FormControl(this.qualification.sequence, {
				validators: [
					Validators.required, 
					Validators.min(1),
					Validators.max(500),
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
		return qualificationForm;
	}

	editQualificationForm():FormGroup {
		let qualificationForm = new FormGroup({
			sequence: new FormControl(this.qualification.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(500)
			]), 
			code: new FormControl(this.qualification.code, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(10)
			]), 
			name: new FormControl(this.qualification.name, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			byDefault: new FormControl(
				Boolean(Number(this.qualification.byDefault)))
		})
		return qualificationForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.qualificationForm.controls[controlName].hasError(errorName);
	}

	public save(qualification:Qualification) {
		if (this.qualification.id === 0) {
			this.qualificationService.save(qualification).subscribe((qualifications) => {
				this.modalController.dismiss({ 'dismissed': true, 'qualifications':qualifications });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			qualification.id = this.qualification.id;
			this.qualificationService.update(qualification.id, qualification).subscribe((qualifications) => {
				this.modalController.dismiss({ 'dismissed': true, 'qualifications':qualifications });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
