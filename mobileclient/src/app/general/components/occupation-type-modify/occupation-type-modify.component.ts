import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { OccupationType } from '../../../shared/models/general/occupation-type';
import { OccupationTypeService } from '../../../shared/services/general/occupation-type.service';

@Component({
	selector: 'app-occupation-type-modify',
	templateUrl: './occupation-type-modify.component.html',
	styleUrls: ['./occupation-type-modify.component.scss']
})
export class OccupationTypeModifyComponent implements OnInit {

	public occupationTypeForm:FormGroup;
	public occupationType:OccupationType;
	public errorMessage:string;

	constructor(private occupationTypeService:OccupationTypeService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.occupationType = this.navParams.get('occupationType');
	}

	ngOnInit() {
		if (this.occupationType.id === 0) {
			this.occupationTypeForm = this.createOccupationTypeForm();
		} else {
			this.occupationTypeForm = this.editOccupationTypeForm();
		}
	}

	createOccupationTypeForm():FormGroup {
		let occupationTypeForm = new FormGroup({
			sequence: new FormControl(this.occupationType.sequence, {
				validators: [
					Validators.required, 
					Validators.min(1),
					Validators.max(2000),
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
		return occupationTypeForm;
	}

	editOccupationTypeForm():FormGroup {
		let occupationTypeForm = new FormGroup({
			sequence: new FormControl(this.occupationType.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(2000)
			]), 
			code: new FormControl(this.occupationType.code, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(10)
			]), 
			name: new FormControl(this.occupationType.name, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			byDefault: new FormControl(
				Boolean(Number(this.occupationType.byDefault)))
		})
		return occupationTypeForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.occupationTypeForm.controls[controlName].hasError(errorName);
	}

	public save(occupationType:OccupationType) {
		if (this.occupationType.id === 0) {
			this.occupationTypeService.save(occupationType).subscribe((occupationTypes) => {
				this.modalController.dismiss({ 'dismissed': true, 'occupationTypes':occupationTypes });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			occupationType.id = this.occupationType.id;
			this.occupationTypeService.update(occupationType.id, occupationType).subscribe((occupationTypes) => {
				this.modalController.dismiss({ 'dismissed': true, 'occupationTypes':occupationTypes });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
