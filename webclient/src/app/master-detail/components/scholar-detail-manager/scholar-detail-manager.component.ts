import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { ScholarDetail } from '../../../shared/models/scholar/scholar-detail';
import { ScholarDetailService } from '../../../shared/services/scholar/scholar-detail.service';
import { Scholar } from '../../../shared/models/scholar/scholar';
import { ScholarService } from '../../../shared/services/scholar/scholar.service';
import { MaritalStatus } from '../../../shared/models/general/marital-status';
import { MaritalStatusService } from '../../../shared/services/general/marital-status.service';
import { Race } from '../../../shared/models/general/race';
import { RaceService } from '../../../shared/services/general/race.service';
import { Religion } from '../../../shared/models/general/religion';
import { ReligionService } from '../../../shared/services/general/religion.service';

import { ScholarDetailManagerModifyComponent } from '../scholar-detail-manager-modify/scholar-detail-manager-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-scholar-detail-manager',
	templateUrl: './scholar-detail-manager.component.html',
	styleUrls: ['./scholar-detail-manager.component.css']
})
export class ScholarDetailManagerComponent implements OnInit, OnDestroy {

	public scholar:Scholar;
	public scholarId:number;
	public scholarDetail:ScholarDetail;
	public scholarDetailId:number;

	public scholarDetails:ScholarDetail[];
	private masterSub:Subscription;
	private detailSub:Subscription;
	private listSub:Subscription;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private scholarService:ScholarService,
		private scholarDetailService:ScholarDetailService,
		private router:Router, private route: ActivatedRoute, 
		private dialog: MatDialog) {
			this.columnCaptions = [
				'dateOfBirth',
				'age',
				'maritalStatus',
				'dependents',
				'race',
				'religion',
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
		this.listSub = this.scholarDetailService.findByScholarId(this.scholar.id).subscribe((scholarDetails) => {
			this.scholarDetails = scholarDetails;
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
		let dialogRef = this.dialog.open(ScholarDetailManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((scholarDetails) => {
			if (scholarDetails !== undefined) this.scholarDetails = scholarDetails;
		})
	}
	
	edit(element:ScholarDetail) {
		element.options = { masterDetail: "Scholar" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ScholarDetailManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((scholarDetails) => {
			if (scholarDetails !== undefined) this.scholarDetails = scholarDetails;
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
	
	showDetail(element:ScholarDetail) {
	}
	
	print(element:ScholarDetail) {
	}

}
