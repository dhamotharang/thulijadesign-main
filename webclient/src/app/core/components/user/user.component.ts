import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

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
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

	public users:User[];
	public userSearchForm:FormGroup;
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	public alphabets: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 
		'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'All'];
	public selectedAlphabet:string = "A";
	public showRows:number = 0;
	public errorMessage:string;

	constructor(private userService:UserService,
		private router:Router, private dialog: MatDialog) {
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
			this.subject = new Subject<boolean>();
	}

	ngOnInit() {
		this.userSearchForm = this.createUserSearchForm();
		this.list();
	}

	ngOnDestroy() {
		this.subject.next(true);
		this.subject.unsubscribe();
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
		this.userService.alphabetFiltering(
				this.selectedAlphabet).pipe(takeUntil(this.subject)).subscribe((users) => {
			this.users = users;
			this.showRows = this.users.length;
		}, (error) => {
			this.errorMessage = error.message;
		})
	}

	createUserSearchForm():FormGroup {
		let userSearchForm = new FormGroup({
			firstNameSearchText: new FormControl('', []), 
			lastNameSearchText: new FormControl('', [])
		})
		return userSearchForm;
	}

	add() {
		let element = new User(0);
		element.options = { selectedAlphabet: this.selectedAlphabet };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(UserModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((users) => {
			if (users !== undefined) this.users = users;
		})
	}
	
	edit(element:User) {
		element.options = { selectedAlphabet: this.selectedAlphabet };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(UserModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((users) => {
			if (users !== undefined) this.users = users;
		})
	}
	
	delete(element:User) {
		element.options = { selectedAlphabet: this.selectedAlphabet };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.userService.delete(element).subscribe((users) => {
					this.users = users;
				});
			}
		});
	}

	print(element:User) {
	}

}
