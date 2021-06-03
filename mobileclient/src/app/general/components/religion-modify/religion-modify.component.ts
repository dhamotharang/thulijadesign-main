import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { Religion } from '../../../shared/models/general/religion';
import { ReligionService } from '../../../shared/services/general/religion.service';

@Component({
	selector: 'app-religion-modify',
	templateUrl: './religion-modify.component.html',
	styleUrls: ['./religion-modify.component.scss']
})
export class ReligionModifyComponent implements OnInit {

	public religionForm:FormGroup;
	public religion:Religion;
	public errorMessage:string;

	constructor(private religionService:ReligionService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.religion = this.navParams.get('religion');
	}

	ngOnInit() {
		if (this.religion.id === 0) {
			this.religionForm = this.createReligionForm();
		} else {
			this.religionForm = this.editReligionForm();
		}
	}

	createReligionForm():FormGroup {
		let religionForm = new FormGroup({
			sequence: new FormControl(this.religion.sequence, {
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
		return religionForm;
	}

	editReligionForm():FormGroup {
		let religionForm = new FormGroup({
			sequence: new FormControl(this.religion.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(2000)
			]), 
			code: new FormControl(this.religion.code, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(10)
			]), 
			name: new FormControl(this.religion.name, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			byDefault: new FormControl(
				Boolean(Number(this.religion.byDefault)))
		})
		return religionForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.religionForm.controls[controlName].hasError(errorName);
	}

	public save(religion:Religion) {
		if (this.religion.id === 0) {
			this.religionService.save(religion).subscribe((religions) => {
				this.modalController.dismiss({ 'dismissed': true, 'religions':religions });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			religion.id = this.religion.id;
			this.religionService.update(religion.id, religion).subscribe((religions) => {
				this.modalController.dismiss({ 'dismissed': true, 'religions':religions });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
