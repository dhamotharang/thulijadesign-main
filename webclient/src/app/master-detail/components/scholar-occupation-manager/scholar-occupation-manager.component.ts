import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { ScholarOccupation } from '../../../shared/models/scholar/scholar-occupation';
import { ScholarOccupationService } from '../../../shared/services/scholar/scholar-occupation.service';
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

import { ScholarOccupationManagerModifyComponent } from '../scholar-occupation-manager-modify/scholar-occupation-manager-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-scholar-occupation-manager',
	templateUrl: './scholar-occupation-manager.component.html',
	styleUrls: ['./scholar-occupation-manager.component.css']
})
export class ScholarOccupationManagerComponent implements OnInit, OnDestroy {

	public scholar:Scholar;
	public scholarId:number;
	public scholarOccupation:ScholarOccupation;
	public scholarOccupationId:number;

	public scholarOccupations:ScholarOccupation[];
	private masterSub:Subscription;
	private detailSub:Subscription;
	private listSub:Subscription;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private scholarService:ScholarService,
		private scholarOccupationService:ScholarOccupationService,
		private router:Router, private route: ActivatedRoute, 
		private dialog: MatDialog) {
			this.columnCaptions = [
				'positionTitle',
				'companyName',
				'startDate',
				'endDate',
				'specialization',
				'jobRole',
				'industry',
				'positionLevel',
				'salary',
				'action'
			];
	}
	
	ngOnInit() {
		this.route.parent.paramMap.subscribe((params:ParamMap) => {
			this.scholarId = +params.get('id');
			this.masterSub = this.scholarService.findById(this.scholarId).subscribe((scholar) => {
				this.scholar = scholar;
				this.list();
			});
		});
	}
	
	ngOnDestroy() {
		if (this.listSub) {
			this.listSub.unsubscribe();
		}
		if (this.masterSub) {
			this.masterSub.unsubscribe();
		}
		if (this.detailSub) {
			this.detailSub.unsubscribe();
		}
	}
	
	list() {
		this.listSub = this.scholarOccupationService.findByScholarId(this.scholar.id).subscribe((scholarOccupations) => {
			this.scholarOccupations = scholarOccupations;
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
		let dialogRef = this.dialog.open(ScholarOccupationManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((scholarOccupations) => {
			if (scholarOccupations !== undefined) this.scholarOccupations = scholarOccupations;
		})
	}
	
	edit(element:ScholarOccupation) {
		element.options = { masterDetail: "Scholar" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ScholarOccupationManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((scholarOccupations) => {
			if (scholarOccupations !== undefined) this.scholarOccupations = scholarOccupations;
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
	
	showDetail(element:ScholarOccupation) {
	}
	
	print(element:ScholarOccupation) {
	}

}
