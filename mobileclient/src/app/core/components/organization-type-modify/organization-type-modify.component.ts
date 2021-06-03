import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { OrganizationType } from '../../../shared/models/core/organization-type';
import { OrganizationTypeService } from '../../../shared/services/core/organization-type.service';

@Component({
	selector: 'app-organization-type-modify',
	templateUrl: './organization-type-modify.component.html',
	styleUrls: ['./organization-type-modify.component.scss']
})
export class OrganizationTypeModifyComponent implements OnInit {

	public organizationTypeForm:FormGroup;
	public organizationType:OrganizationType;
	public errorMessage:string;

	constructor(private organizationTypeService:OrganizationTypeService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.organizationType = this.navParams.get('organizationType');
	}

	ngOnInit() {
		if (this.organizationType.id === 0) {
			this.organizationTypeForm = this.createOrganizationTypeForm();
		} else {
			this.organizationTypeForm = this.editOrganizationTypeForm();
		}
	}

	createOrganizationTypeForm():FormGroup {
		let organizationTypeForm = new FormGroup({
			sequence: new FormControl(this.organizationType.sequence, {
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
					Validators.maxLength(150)
				]
			}),
			byDefault: new FormControl(0)
		})
		return organizationTypeForm;
	}

	editOrganizationTypeForm():FormGroup {
		let organizationTypeForm = new FormGroup({
			sequence: new FormControl(this.organizationType.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(2000)
			]), 
			code: new FormControl(this.organizationType.code, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(10)
			]), 
			name: new FormControl(this.organizationType.name, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(150)
			]), 
			byDefault: new FormControl(
				Boolean(Number(this.organizationType.byDefault)))
		})
		return organizationTypeForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.organizationTypeForm.controls[controlName].hasError(errorName);
	}

	public save(organizationType:OrganizationType) {
		if (this.organizationType.id === 0) {
			this.organizationTypeService.save(organizationType).subscribe((organizationTypes) => {
				this.modalController.dismiss({ 'dismissed': true, 'organizationTypes':organizationTypes });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			organizationType.id = this.organizationType.id;
			this.organizationTypeService.update(organizationType.id, organizationType).subscribe((organizationTypes) => {
				this.modalController.dismiss({ 'dismissed': true, 'organizationTypes':organizationTypes });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
