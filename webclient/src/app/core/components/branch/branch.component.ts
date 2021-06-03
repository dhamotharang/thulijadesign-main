import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { Branch } from '../../../shared/models/core/branch';
import { BranchService } from '../../../shared/services/core/branch.service';
import { BranchModifyComponent } from '../branch-modify/branch-modify.component';
import { Organization } from '../../../shared/models/core/organization';
import { OrganizationService } from '../../../shared/services/core/organization.service';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-branch',
	templateUrl: './branch.component.html',
	styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit, OnDestroy {

	public branches:Branch[];
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private branchService:BranchService,
		private router:Router, private dialog: MatDialog) {
			this.columnCaptions = [
				'sequence',
				'organization',
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
		this.branchService.findAll().pipe(takeUntil(this.subject)).subscribe((branches) => {
			this.branches = branches;
		}, (error) => {
			this.errorMessage = error.message;
		})
	}

	add() {
		let sequence:number = 1;
		if (this.branches !== undefined && this.branches.length > 0) {
			sequence = +this.branches[this.branches.length - 1].sequence;
		}
		let element = new Branch(0);
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(BranchModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((branches) => {
			if (branches !== undefined) this.branches = branches;
		})
	}
	
	edit(element:Branch) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(BranchModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((branches) => {
			if (branches !== undefined) this.branches = branches;
		})
	}
	
	delete(element:Branch) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.branchService.delete(element).subscribe((branches) => {
					this.branches = branches;
				});
			}
		});
	}

	print(element:Branch) {
	}

}
