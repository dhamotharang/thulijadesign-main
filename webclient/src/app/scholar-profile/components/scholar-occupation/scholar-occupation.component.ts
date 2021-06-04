import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { ScholarOccupation } from '../../../shared/models/scholar/scholar-occupation';
import { ScholarOccupationService } from '../../../shared/services/scholar/scholar-occupation.service';
import { ScholarOccupationModifyComponent } from '../scholar-occupation-modify/scholar-occupation-modify.component';
import { Scholar } from '../../../shared/models/scholar/scholar';
import { ScholarService } from '../../../shared/services/scholar/scholar.service';
import { Qualification } from '../../../shared/models/general/qualification';
import { QualificationService } from '../../../shared/services/general/qualification.service';
import { State } from '../../../shared/models/general/state';
import { StateService } from '../../../shared/services/general/state.service';
import { Country } from '../../../shared/models/general/country';
import { CountryService } from '../../../shared/services/general/country.service';
import { PositionLevel } from '../../../shared/models/general/position-level';
import { PositionLevelService } from '../../../shared/services/general/position-level.service';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';
import { User } from '../../../shared/models/core/user';
import { LogInService } from '../../../shared/services/builtin/log-in.service';

@Component({
	selector: 'app-scholar-occupation',
	templateUrl: './scholar-occupation.component.html',
	styleUrls: ['./scholar-occupation.component.css']
})
export class ScholarOccupationComponent implements OnInit, OnDestroy {

	public scholar:Scholar;
	public scholarOccupations:ScholarOccupation[];
	public user:User;
	private listSub:Subscription;

	constructor(private scholarService:ScholarService,
		private scholarOccupationService:ScholarOccupationService,
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
			this.listSub = this.scholarOccupationService.findByScholarId(this.scholar.id).subscribe((scholarOccupations) => {
				this.scholarOccupations = scholarOccupations;
			})
		})
	}

	add() {
		let element = new ScholarOccupation(0, this.scholar, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Scholar" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ScholarOccupationModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((scholarOccupations) => {
			if (scholarOccupations != undefined) this.scholarOccupations = scholarOccupations;
		})
	}
	
	edit(element:ScholarOccupation) {
		element.options = { masterDetail: "Scholar" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ScholarOccupationModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((scholarOccupations) => {
			if (scholarOccupations != undefined) this.scholarOccupations = scholarOccupations;
		})
	}
	
	delete(element:ScholarOccupation) {
		element.options = { masterDetail: "Scholar" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.scholarOccupationService.delete(element).subscribe((scholarOccupations) => {
					if (scholarOccupations !== undefined) this.scholarOccupations = scholarOccupations;
				});
			}
		});
	}

	print(element:ScholarOccupation) {

	}

}