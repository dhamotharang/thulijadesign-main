import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { Group } from '../../../shared/models/core/group';
import { GroupService } from '../../../shared/services/core/group.service';
import { GroupManagerModifyComponent } from '../group-manager-modify/group-manager-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-group-manager',
	templateUrl: './group-manager.component.html',
	styleUrls: ['./group-manager.component.css']
})
export class GroupManagerComponent implements OnInit, OnDestroy {

	public groups:Group[];
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private groupService:GroupService,
		private router:Router, private dialog: MatDialog) {
			this.columnCaptions = [
				'sequence', 
				'name', 
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
		this.groupService.findAll().pipe(takeUntil(this.subject)).subscribe((groups) => {
			this.groups = groups;
		})
	}

	add() {
		let sequence:number = 1;
		if (this.groups !== undefined && this.groups.length > 0) {
			sequence = +this.groups[this.groups.length - 1].sequence;
		}
		let element = new Group(0);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.minWidth = 600;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(GroupManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((groups) => {
			if (groups !== undefined) this.groups = groups;
		})
	}
	
	edit(element:Group) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.minWidth = 600;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(GroupManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((groups) => {
			if (groups !== undefined) this.groups = groups;
		})
	}
	
	delete(element:Group) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.groupService.delete(element).subscribe((groups) => {
					this.groups = groups;
				});
			}
		});
	}
	
	showDetail(element:Group) {
		this.router.navigate(['/masterdetail/groupmanagers', element.id])
	}

	print(element:Group) {
	}

}
