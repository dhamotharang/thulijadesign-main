import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { Department } from '../../../shared/models/core/department';
import { DepartmentService } from '../../../shared/services/core/department.service';
import { DepartmentModifyComponent } from '../department-modify/department-modify.component';
import { Organization } from '../../../shared/models/core/organization';
import { OrganizationService } from '../../../shared/services/core/organization.service';
import { Branch } from '../../../shared/models/core/branch';
import { BranchService } from '../../../shared/services/core/branch.service';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-department',
	templateUrl: './department.component.html',
	styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit, OnDestroy {

	public departments:Department[];
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private departmentService:DepartmentService,
		private router:Router, private dialog: MatDialog) {
			this.columnCaptions = [
				'sequence',
				'organization',
				'branch',
				'abbreviation',
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
		this.departmentService.findAll().pipe(takeUntil(this.subject)).subscribe((departments) => {
			this.departments = departments;
		}, (error) => {
			this.errorMessage = error.message;
		})
	}

	add() {
		let sequence:number = 1;
		if (this.departments !== undefined && this.departments.length > 0) {
			sequence = +this.departments[this.departments.length - 1].sequence;
		}
		let element = new Department(0);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(DepartmentModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((departments) => {
			if (departments !== undefined) this.departments = departments;
		})
	}
	
	edit(element:Department) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(DepartmentModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((departments) => {
			if (departments !== undefined) this.departments = departments;
		})
	}
	
	delete(element:Department) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.departmentService.delete(element).subscribe((departments) => {
					this.departments = departments;
				});
			}
		});
	}

	print(element:Department) {
	}

}
