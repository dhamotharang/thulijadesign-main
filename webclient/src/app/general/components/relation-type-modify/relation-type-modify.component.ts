import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { RelationType } from '../../../shared/models/general/relation-type';
import { RelationTypeService } from '../../../shared/services/general/relation-type.service';

@Component({
	selector: 'app-relation-type-modify',
	templateUrl: './relation-type-modify.component.html',
	styleUrls: ['./relation-type-modify.component.css']
})
export class RelationTypeModifyComponent implements OnInit {

	public relationTypeForm:FormGroup;
	public errorMessage:string;

	constructor(private relationTypeService:RelationTypeService,
		private dialogRef: MatDialogRef<RelationTypeModifyComponent>,
		@Inject(MAT_DIALOG_DATA) public relationType:RelationType) {
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
			sequence: new FormControl('', {
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

	public save(relationType:RelationType) {
		if (this.relationTypeForm.valid) {
			if (this.relationType.id === 0) {
				this.relationTypeService.save(relationType).subscribe((relationTypes) => {
					this.dialogRef.close(relationTypes);
				}, (error) => {
					this.errorMessage = error.message;
				})
			} else {
				relationType.id = this.relationType.id;
				this.relationTypeService.update(relationType.id, relationType).subscribe((relationTypes) => {
					this.dialogRef.close(relationTypes);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		} else {
			this.validateAllFormFields(this.relationTypeForm);
		}
	}

	public onCancel() {
		this.dialogRef.close();
	}

}
