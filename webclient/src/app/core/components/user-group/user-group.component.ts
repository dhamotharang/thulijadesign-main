import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { UserGroup } from '../../../shared/models/core/user-group';
import { UserGroupService } from '../../../shared/services/core/user-group.service';
import { UserGroupModifyComponent } from '../user-group-modify/user-group-modify.component';
import { Group } from '../../../shared/models/core/group';
import { GroupService } from '../../../shared/services/core/group.service';
import { User } from '../../../shared/models/core/user';
import { UserService } from '../../../shared/services/core/user.service';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-user-group',
	templateUrl: './user-group.component.html',
	styleUrls: ['./user-group.component.css']
})
export class UserGroupComponent implements OnInit, OnDestroy {

	public userGroups:UserGroup[];
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private userGroupService:UserGroupService,
		private router:Router, private dialog: MatDialog) {
			this.columnCaptions = [
				'sequence',
				'group',
				'user',
				'action'
			];
			this.subject = new Subject<boolean>();
	}

	ngOnInit() {
		this.list();
	}

	ngOnDestroy() {
		this.subject.next(true);
		this.subject.unsubscribe();
	}

	list() {
		this.userGroupService.findAll().pipe(takeUntil(this.subject)).subscribe((userGroups) => {
			this.userGroups = userGroups;
		}, (error) => {
			this.errorMessage = error.message;
		})
	}

	add() {
		let sequence:number = 1;
		if (this.userGroups !== undefined && this.userGroups.length > 0) {
			sequence = +this.userGroups[this.userGroups.length - 1].sequence;
		}
		let element = new UserGroup(0);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(UserGroupModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((userGroups) => {
			if (userGroups !== undefined) this.userGroups = userGroups;
		})
	}
	
	edit(element:UserGroup) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(UserGroupModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((userGroups) => {
			if (userGroups !== undefined) this.userGroups = userGroups;
		})
	}
	
	delete(element:UserGroup) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.userGroupService.delete(element).subscribe((userGroups) => {
					this.userGroups = userGroups;
				});
			}
		});
	}

	print(element:UserGroup) {
	}

}
