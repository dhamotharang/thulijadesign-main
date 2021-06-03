import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { Group } from '../../../shared/models/core/group';
import { GroupService } from '../../../shared/services/core/group.service';

@Component({
	selector: 'app-group-modify',
	templateUrl: './group-modify.component.html',
	styleUrls: ['./group-modify.component.scss']
})
export class GroupModifyComponent implements OnInit {

	public groupForm:FormGroup;
	public group:Group;
	public errorMessage:string;

	constructor(private groupService:GroupService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.group = this.navParams.get('group');
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
			sequence: new FormControl(this.group.sequence, {
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

	public save(group:Group) {
		if (this.group.id === 0) {
			this.groupService.save(group).subscribe((groups) => {
				this.modalController.dismiss({ 'dismissed': true, 'groups':groups });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			group.id = this.group.id;
			this.groupService.update(group.id, group).subscribe((groups) => {
				this.modalController.dismiss({ 'dismissed': true, 'groups':groups });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
