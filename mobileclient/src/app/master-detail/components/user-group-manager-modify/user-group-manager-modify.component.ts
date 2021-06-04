import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { UserGroup } from '../../../shared/models/core/user-group';
import { UserGroupService } from '../../../shared/services/core/user-group.service';
import { Group } from '../../../shared/models/core/group';
import { GroupService } from '../../../shared/services/core/group.service';
import { User } from '../../../shared/models/core/user';
import { UserService } from '../../../shared/services/core/user.service';

@Component({
	selector: 'app-user-group-manager-modify',
	templateUrl: './user-group-manager-modify.component.html',
	styleUrls: ['./user-group-manager-modify.component.css']
})
export class UserGroupManagerModifyComponent implements OnInit {

	public userGroupForm:FormGroup;
	public userGroup:UserGroup;
	public groups:Group[];
	public currentGroup:Group;
	public users:User[];
	public currentUser:User;
	public errorMessage:string;

	compareGroup = (currentgroup: Group, group: Group) => currentgroup.id == group.id;

	compareUser = (currentuser: User, user: User) => currentuser.id == user.id;

	constructor(private userGroupService:UserGroupService,
			private groupService:GroupService,
			private userService:UserService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.userGroup = this.navParams.get('userGroup');
		this.groupService.findAllByLookup().subscribe(groups => {
			this.groups = groups;
		})
		this.userService.findAllByLookup().subscribe(users => {
			this.users = users;
		})
	}

	ngOnInit() {
		if (this.userGroup.id === 0) {
			this.userGroupForm = this.createUserGroupForm();
		} else {
			this.userGroupForm = this.editUserGroupForm();
		}
	}

	createUserGroupForm():FormGroup {
		let userGroupForm = new FormGroup({
			sequence: new FormControl(this.userGroup.sequence, {
				validators: [
					Validators.required, 
					Validators.min(1),
					Validators.max(25),
					Validators.pattern("^[0-9]*$")
				]
			}),
			group: new FormControl('', {
				validators: [
				]
			}),
			user: new FormControl('', {
				validators: [
				]
			})
		})
		return userGroupForm;
	}

	editUserGroupForm():FormGroup {
		this.currentGroup = this.userGroup.group;
		this.currentUser = this.userGroup.user;
		let userGroupForm = new FormGroup({
			sequence: new FormControl(this.userGroup.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(25)
			]), 
			group: new FormControl(this.userGroup.group, [
			]), 
			user: new FormControl(this.userGroup.user, [
			])
		})
		return userGroupForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.userGroupForm.controls[controlName].hasError(errorName);
	}

	public save(userGroup:UserGroup) {
		userGroup.group = this.userGroup.group;
		userGroup.options = this.userGroup.options;
		if (this.userGroup.id === 0) {
			this.userGroupService.save(userGroup).subscribe((userGroups) => {
				this.modalController.dismiss({ 'dismissed': true, 'userGroups':userGroups });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			userGroup.id = this.userGroup.id;
			this.userGroupService.update(userGroup.id, userGroup).subscribe((userGroups) => {
				this.modalController.dismiss({ 'dismissed': true, 'userGroups':userGroups });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
