import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { ScholarFamily } from '../../../shared/models/scholar/scholar-family';
import { ScholarFamilyService } from '../../../shared/services/scholar/scholar-family.service';
import { Scholar } from '../../../shared/models/scholar/scholar';
import { ScholarService } from '../../../shared/services/scholar/scholar.service';
import { RelationType } from '../../../shared/models/general/relation-type';
import { RelationTypeService } from '../../../shared/services/general/relation-type.service';
import { Citizen } from '../../../shared/models/general/citizen';
import { CitizenService } from '../../../shared/services/general/citizen.service';

import { ScholarFamilyManagerModifyComponent } from '../scholar-family-manager-modify/scholar-family-manager-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-scholar-family-manager',
	templateUrl: './scholar-family-manager.component.html',
	styleUrls: ['./scholar-family-manager.component.css']
})
export class ScholarFamilyManagerComponent implements OnInit, OnDestroy {

	public scholar:Scholar;
	public scholarId:number;
	public scholarFamily:ScholarFamily;
	public scholarFamilyId:number;

	public scholarFamilies:ScholarFamily[];
	private masterSub:Subscription;
	private detailSub:Subscription;
	private listSub:Subscription;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private scholarService:ScholarService,
		private scholarFamilyService:ScholarFamilyService,
		private router:Router, private route: ActivatedRoute, 
		private dialog: MatDialog) {
			this.columnCaptions = [
				'relationType',
				'name',
				'occupation',
				'citizen',
				'nricNumber',
				'email',
				'phone',
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
		this.listSub = this.scholarFamilyService.findByScholarId(this.scholar.id).subscribe((scholarFamilies) => {
			this.scholarFamilies = scholarFamilies;
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
		let dialogRef = this.dialog.open(ScholarFamilyManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((scholarFamilies) => {
			if (scholarFamilies !== undefined) this.scholarFamilies = scholarFamilies;
		})
	}
	
	edit(element:ScholarFamily) {
		element.options = { masterDetail: "Scholar" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ScholarFamilyManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((scholarFamilies) => {
			if (scholarFamilies !== undefined) this.scholarFamilies = scholarFamilies;
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
	
	showDetail(element:ScholarFamily) {
	}
	
	print(element:ScholarFamily) {
	}

}
