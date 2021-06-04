import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { Group } from '../../../shared/models/core/group';
import { GroupService } from '../../../shared/services/core/group.service';

@Component({
	selector: 'app-group-manager-modify',
	templateUrl: './group-manager-modify.component.html',
	styleUrls: ['./group-manager-modify.component.css']
})
export class GroupManagerModifyComponent implements OnInit {

	public groupForm:FormGroup;
	public errorMessage:string;

	constructor(private groupService:GroupService,
		private dialogRef: MatDialogRef<GroupManagerModifyComponent>,
		@Inject(MAT_DIALOG_DATA) public group:Group) {
	}

	ngOnInit() {
		if (this.group.id === 0) {
			this.groupForm = this.createGroupForm();
		} else {
			this.groupForm = this.editGroupForm();
		}
	}

	createGroupForm():FormGroup {
		let groupForm = new FormGroup({
			sequence: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.min(1),
					Validators.max(25),
					Validators.pattern("^[0-9]*$")
				]
			}),
			name: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(1),
					Validators.maxLength(60)
				]
			})
		})
		return groupForm;
	}

	editGroupForm():FormGroup {
		let groupForm = new FormGroup({
			sequence: new FormControl(this.group.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(25)
			]), 
			name: new FormControl(this.group.name, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(60)
			])
		})
		return groupForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.groupForm.controls[controlName].hasError(errorName);
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

	public save(group:Group) {
		if (this.groupForm.valid) {
			if (this.group.id === 0) {
				this.groupService.save(group).subscribe((groups) => {
					this.dialogRef.close(groups);
				}, (error) => {
					this.errorMessage = error.message;
				})
			} else {
				group.id = this.group.id;
				this.groupService.update(group.id, group).subscribe((groups) => {
					this.dialogRef.close(groups);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		} else {
			this.validateAllFormFields(this.groupForm);
		}
	}

	public onCancel() {
		this.dialogRef.close();
	}

}
