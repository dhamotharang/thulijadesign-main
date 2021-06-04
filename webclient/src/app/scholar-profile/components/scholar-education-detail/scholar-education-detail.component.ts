import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { ScholarEducationDetail } from '../../../shared/models/scholar/scholar-education-detail';
import { ScholarEducationDetailService } from '../../../shared/services/scholar/scholar-education-detail.service';
import { ScholarEducationDetailModifyComponent } from '../scholar-education-detail-modify/scholar-education-detail-modify.component';
import { Scholar } from '../../../shared/models/scholar/scholar';
import { ScholarService } from '../../../shared/services/scholar/scholar.service';
import { Qualification } from '../../../shared/models/general/qualification';
import { QualificationService } from '../../../shared/services/general/qualification.service';
import { State } from '../../../shared/models/general/state';
import { StateService } from '../../../shared/services/general/state.service';
import { Country } from '../../../shared/models/general/country';
import { CountryService } from '../../../shared/services/general/country.service';
import { FieldStudy } from '../../../shared/models/general/field-study';
import { FieldStudyService } from '../../../shared/services/general/field-study.service';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';
import { User } from '../../../shared/models/core/user';
import { LogInService } from '../../../shared/services/builtin/log-in.service';

@Component({
	selector: 'app-scholar-education-detail',
	templateUrl: './scholar-education-detail.component.html',
	styleUrls: ['./scholar-education-detail.component.css']
})
export class ScholarEducationDetailComponent implements OnInit, OnDestroy {

	public scholar:Scholar;
	public scholarEducationDetails:ScholarEducationDetail[];
	public user:User;
	private listSub:Subscription;

	constructor(private scholarService:ScholarService,
		private scholarEducationDetailService:ScholarEducationDetailService,
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
			this.listSub = this.scholarEducationDetailService.findByScholarId(this.scholar.id).subscribe((scholarEducationDetails) => {
				this.scholarEducationDetails = scholarEducationDetails;
			})
		})
	}

	add() {
		let element = new ScholarEducationDetail(0, this.scholar, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Scholar" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ScholarEducationDetailModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((scholarEducationDetails) => {
			if (scholarEducationDetails != undefined) this.scholarEducationDetails = scholarEducationDetails;
		})
	}
	
	edit(element:ScholarEducationDetail) {
		element.options = { masterDetail: "Scholar" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ScholarEducationDetailModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((scholarEducationDetails) => {
			if (scholarEducationDetails != undefined) this.scholarEducationDetails = scholarEducationDetails;
		})
	}
	
	delete(element:ScholarEducationDetail) {
		element.options = { masterDetail: "Scholar" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.scholarEducationDetailService.delete(element).subscribe((scholarEducationDetails) => {
					if (scholarEducationDetails !== undefined) this.scholarEducationDetails = scholarEducationDetails;
				});
			}
		});
	}

	print(element:ScholarEducationDetail) {

	}

}