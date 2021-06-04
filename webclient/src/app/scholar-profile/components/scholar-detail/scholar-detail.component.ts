import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { ScholarDetail } from '../../../shared/models/scholar/scholar-detail';
import { ScholarDetailService } from '../../../shared/services/scholar/scholar-detail.service';
import { ScholarDetailModifyComponent } from '../scholar-detail-modify/scholar-detail-modify.component';
import { Scholar } from '../../../shared/models/scholar/scholar';
import { ScholarService } from '../../../shared/services/scholar/scholar.service';
import { MaritalStatus } from '../../../shared/models/general/marital-status';
import { MaritalStatusService } from '../../../shared/services/general/marital-status.service';
import { Race } from '../../../shared/models/general/race';
import { RaceService } from '../../../shared/services/general/race.service';
import { Religion } from '../../../shared/models/general/religion';
import { ReligionService } from '../../../shared/services/general/religion.service';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';
import { User } from '../../../shared/models/core/user';
import { LogInService } from '../../../shared/services/builtin/log-in.service';

@Component({
	selector: 'app-scholar-detail',
	templateUrl: './scholar-detail.component.html',
	styleUrls: ['./scholar-detail.component.css']
})
export class ScholarDetailComponent implements OnInit, OnDestroy {

	public scholar:Scholar;
	public scholarDetails:ScholarDetail[];
	public user:User;
	private listSub:Subscription;

	constructor(private scholarService:ScholarService,
		private scholarDetailService:ScholarDetailService,
		private logInService:LogInService,
		private dialog: MatDialog) {
	}

	ngOnInit() {
		this.listSub = this.logInService.loggedInUser.subscribe((user:User) => {
			if (user !== null) {
				this.user = user;
				this.list();
			} 
		})
	}

	ngOnDestroy() {
		if (this.listSub) {
			this.listSub.unsubscribe();
		}
	}

	list() {
		this.listSub = this.scholarService.findByUserId(this.user.id).subscribe((scholars) => {
			this.scholar = scholars[0];
			this.listSub = this.scholarDetailService.findByScholarId(this.scholar.id).subscribe((scholarDetails) => {
				this.scholarDetails = scholarDetails;
			})
		})
	}

	add() {
		let element = new ScholarDetail(0, this.scholar, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Scholar" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ScholarDetailModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((scholarDetails) => {
			if (scholarDetails != undefined) this.scholarDetails = scholarDetails;
		})
	}
	
	edit(element:ScholarDetail) {
		element.options = { masterDetail: "Scholar" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ScholarDetailModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((scholarDetails) => {
			if (scholarDetails != undefined) this.scholarDetails = scholarDetails;
		})
	}
	
	delete(element:ScholarDetail) {
		element.options = { masterDetail: "Scholar" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.scholarDetailService.delete(element).subscribe((scholarDetails) => {
					if (scholarDetails !== undefined) this.scholarDetails = scholarDetails;
				});
			}
		});
	}

	print(element:ScholarDetail) {

	}

}