import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { User } from '../../../shared/models/core/user';
import { UserService } from '../../../shared/services/core/user.service';
import { UserModifyComponent } from '../user-modify/user-modify.component';
import { Department } from '../../../shared/models/core/department';
import { DepartmentService } from '../../../shared/services/core/department.service';
import { Branch } from '../../../shared/models/core/branch';
import { BranchService } from '../../../shared/services/core/branch.service';
import { Organization } from '../../../shared/models/core/organization';
import { OrganizationService } from '../../../shared/services/core/organization.service';
import { Status } from '../../../shared/models/core/status';
import { StatusService } from '../../../shared/services/core/status.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

	public users:User[];
	public userSearchForm:FormGroup;
	private listSub:Subscription;
	public columnCaptions:string[];
	public alphabets: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 
		'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'All'];
	public selectedAlphabet:string = "A";
	public showRows:number = 0;

	constructor(private userService:UserService,
		private translatePipe: TranslatePipe, 
		private modalController: ModalController, 
		private alertController: AlertController) {
			this.columnCaptions = [
				'organization',
				'branch',
				'department',
				'firstName',
				'lastName',
				'emailAddress',
				'status',
				'action'
			];
	}

	ngOnInit() {
		this.userSearchForm = this.createUserSearchForm();
		this.list();
	}

	ngOnDestroy() {
		if (this.listSub) {
			this.listSub.unsubscribe();
		}
	}

	doSearch() {
		this.userService.search(
			this.userSearchForm.get('firstNameSearchText').value,
			this.userSearchForm.get('lastNameSearchText').value).subscribe(users => {
				this.users = users;
				localStorage.setItem('users', JSON.stringify(this.users));
			})
	}

	list() {
		this.listSub = this.userService.alphabetFiltering(
				this.selectedAlphabet).subscribe((users) => {
			this.users = users;
			this.showRows = this.users.length;
		})
	}

	createUserSearchForm():FormGroup {
		let userSearchForm = new FormGroup({
			firstNameSearchText: new FormControl('', []), 
			lastNameSearchText: new FormControl('', [])
		})
		return userSearchForm;
	}

	async add() {
		let element = new User(0);
		element.options = { selectedAlphabet: this.selectedAlphabet };
		const modal = await this.modalController.create({
			component: UserModifyComponent,
			componentProps: { user: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['users'] != undefined)
				this.users = data.data['users'];
		});
		return await modal.present();
	}

	async edit(element:User) {
		element.options = { selectedAlphabet: this.selectedAlphabet };
		const modal = await this.modalController.create({
			component: UserModifyComponent,
			componentProps: { user: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['users'] != undefined)
				this.users = data.data['users'];
		});
		return await modal.present();
	}

	async delete(element:User) {
		element.options = { selectedAlphabet: this.selectedAlphabet };
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.userService.delete(element).subscribe((users) => {
						this.users = users;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:User) {
	}

}