import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { MaritalStatus } from '../../../shared/models/general/marital-status';
import { MaritalStatusService } from '../../../shared/services/general/marital-status.service';

@Component({
	selector: 'app-marital-status-modify',
	templateUrl: './marital-status-modify.component.html',
	styleUrls: ['./marital-status-modify.component.scss']
})
export class MaritalStatusModifyComponent implements OnInit {

	public maritalStatusForm:FormGroup;
	public maritalStatus:MaritalStatus;
	public errorMessage:string;

	constructor(private maritalStatusService:MaritalStatusService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.maritalStatus = this.navParams.get('maritalStatus');
	}

	ngOnInit() {
		if (this.maritalStatus.id === 0) {
			this.maritalStatusForm = this.createMaritalStatusForm();
		} else {
			this.maritalStatusForm = this.editMaritalStatusForm();
		}
	}

	createMaritalStatusForm():FormGroup {
		let maritalStatusForm = new FormGroup({
			sequence: new FormControl(this.maritalStatus.sequence, {
				validators: [
					Validators.required, 
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
		return maritalStatusForm;
	}

	editMaritalStatusForm():FormGroup {
		let maritalStatusForm = new FormGroup({
			sequence: new FormControl(this.maritalStatus.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.max(10)
			]), 
			code: new FormControl(this.maritalStatus.code, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(10)
			]), 
			name: new FormControl(this.maritalStatus.name, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			byDefault: new FormControl(
				Boolean(Number(this.maritalStatus.byDefault)))
		})
		return maritalStatusForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.maritalStatusForm.controls[controlName].hasError(errorName);
	}

	public save(maritalStatus:MaritalStatus) {
		if (this.maritalStatus.id === 0) {
			this.maritalStatusService.save(maritalStatus).subscribe((maritalStatuses) => {
				this.modalController.dismiss({ 'dismissed': true, 'maritalStatuses':maritalStatuses });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			maritalStatus.id = this.maritalStatus.id;
			this.maritalStatusService.update(maritalStatus.id, maritalStatus).subscribe((maritalStatuses) => {
				this.modalController.dismiss({ 'dismissed': true, 'maritalStatuses':maritalStatuses });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
