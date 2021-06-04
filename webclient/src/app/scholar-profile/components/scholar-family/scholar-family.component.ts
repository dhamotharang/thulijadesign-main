import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { ScholarFamily } from '../../../shared/models/scholar/scholar-family';
import { ScholarFamilyService } from '../../../shared/services/scholar/scholar-family.service';
import { ScholarFamilyModifyComponent } from '../scholar-family-modify/scholar-family-modify.component';
import { Scholar } from '../../../shared/models/scholar/scholar';
import { ScholarService } from '../../../shared/services/scholar/scholar.service';
import { RelationType } from '../../../shared/models/general/relation-type';
import { RelationTypeService } from '../../../shared/services/general/relation-type.service';
import { Citizen } from '../../../shared/models/general/citizen';
import { CitizenService } from '../../../shared/services/general/citizen.service';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';
import { User } from '../../../shared/models/core/user';
import { LogInService } from '../../../shared/services/builtin/log-in.service';

@Component({
	selector: 'app-scholar-family',
	templateUrl: './scholar-family.component.html',
	styleUrls: ['./scholar-family.component.css']
})
export class ScholarFamilyComponent implements OnInit, OnDestroy {

	public scholar:Scholar;
	public scholarFamilies:ScholarFamily[];
	public user:User;
	private listSub:Subscription;

	constructor(private scholarService:ScholarService,
		private scholarFamilyService:ScholarFamilyService,
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
			this.listSub = this.scholarFamilyService.findByScholarId(this.scholar.id).subscribe((scholarFamilies) => {
				this.scholarFamilies = scholarFamilies;
			})
		})
	}

	add() {
		let element = new ScholarFamily(0, this.scholar, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Scholar" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ScholarFamilyModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((scholarFamilies) => {
			if (scholarFamilies != undefined) this.scholarFamilies = scholarFamilies;
		})
	}
	
	edit(element:ScholarFamily) {
		element.options = { masterDetail: "Scholar" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ScholarFamilyModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((scholarFamilies) => {
			if (scholarFamilies != undefined) this.scholarFamilies = scholarFamilies;
		})
	}
	
	delete(element:ScholarFamily) {
		element.options = { masterDetail: "Scholar" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.scholarFamilyService.delete(element).subscribe((scholarFamilies) => {
					if (scholarFamilies !== undefined) this.scholarFamilies = scholarFamilies;
				});
			}
		});
	}

	print(element:ScholarFamily) {

	}

}