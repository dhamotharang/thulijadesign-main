import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { RelationType } from '../../../shared/models/general/relation-type';
import { RelationTypeService } from '../../../shared/services/general/relation-type.service';

@Component({
	selector: 'app-relation-type-modify',
	templateUrl: './relation-type-modify.component.html',
	styleUrls: ['./relation-type-modify.component.scss']
})
export class RelationTypeModifyComponent implements OnInit {

	public relationTypeForm:FormGroup;
	public relationType:RelationType;
	public errorMessage:string;

	constructor(private relationTypeService:RelationTypeService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.relationType = this.navParams.get('relationType');
	}

	ngOnInit() {
		if (this.relationType.id === 0) {
			this.relationTypeForm = this.createRelationTypeForm();
		} else {
			this.relationTypeForm = this.editRelationTypeForm();
		}
	}

	createRelationTypeForm():FormGroup {
		let relationTypeForm = new FormGroup({
			sequence: new FormControl(this.relationType.sequence, {
				validators: [
					Validators.required, 
					Validators.min(1),
					Validators.max(25),
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
		return relationTypeForm;
	}

	editRelationTypeForm():FormGroup {
		let relationTypeForm = new FormGroup({
			sequence: new FormControl(this.relationType.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(25)
			]), 
			code: new FormControl(this.relationType.code, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(10)
			]), 
			name: new FormControl(this.relationType.name, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(60)
			]), 
			byDefault: new FormControl(
				Boolean(Number(this.relationType.byDefault)))
		})
		return relationTypeForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.relationTypeForm.controls[controlName].hasError(errorName);
	}

	public save(relationType:RelationType) {
		if (this.relationType.id === 0) {
			this.relationTypeService.save(relationType).subscribe((relationTypes) => {
				this.modalController.dismiss({ 'dismissed': true, 'relationTypes':relationTypes });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			relationType.id = this.relationType.id;
			this.relationTypeService.update(relationType.id, relationType).subscribe((relationTypes) => {
				this.modalController.dismiss({ 'dismissed': true, 'relationTypes':relationTypes });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
