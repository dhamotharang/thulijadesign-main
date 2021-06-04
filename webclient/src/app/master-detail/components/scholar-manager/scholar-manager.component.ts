import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { Scholar } from '../../../shared/models/scholar/scholar';
import { ScholarService } from '../../../shared/services/scholar/scholar.service';
import { Salutation } from '../../../shared/models/general/salutation';
import { SalutationService } from '../../../shared/services/general/salutation.service';
import { Gender } from '../../../shared/models/general/gender';
import { GenderService } from '../../../shared/services/general/gender.service';
import { Citizen } from '../../../shared/models/general/citizen';
import { CitizenService } from '../../../shared/services/general/citizen.service';
import { Department } from '../../../shared/models/core/department';
import { DepartmentService } from '../../../shared/services/core/department.service';
import { Branch } from '../../../shared/models/core/branch';
import { BranchService } from '../../../shared/services/core/branch.service';
import { Organization } from '../../../shared/models/core/organization';
import { OrganizationService } from '../../../shared/services/core/organization.service';
import { Status } from '../../../shared/models/core/status';
import { StatusService } from '../../../shared/services/core/status.service';
import { ScholarManagerModifyComponent } from '../scholar-manager-modify/scholar-manager-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-scholar-manager',
	templateUrl: './scholar-manager.component.html',
	styleUrls: ['./scholar-manager.component.css']
})
export class ScholarManagerComponent implements OnInit, OnDestroy {

	public scholars:Scholar[];
	public scholarSearchForm:FormGroup;
	public salutations:Salutation[];
	public genders:Gender[];
	public citizens:Citizen[];
	private subject:Subject<boolean>;
	public columnCaptions:string[];
	public alphabets: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 
		'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'All'];
	public selectedAlphabet:string = "A";
	public showRows:number = 0;
	public errorMessage:string;

	constructor(private scholarService:ScholarService,
		private salutationService:SalutationService,
		private genderService:GenderService,
		private citizenService:CitizenService,
		private router:Router, private dialog: MatDialog) {
			this.columnCaptions = [
				'firstName', 
				'lastName', 
				'icNumber', 
				'gender', 
				'handphoneNumber', 
				'emailAddress', 
				'status', 
				'action'
			];
			this.subject = new Subject<boolean>();
			this.salutationService.findAll().subscribe(salutations => {
				this.salutations = salutations;
			})
			this.genderService.findAll().subscribe(genders => {
				this.genders = genders;
			})
			this.citizenService.findAll().subscribe(citizens => {
				this.citizens = citizens;
			})
	}

	ngOnInit() {
		this.scholarSearchForm = this.createScholarSearchForm();
		this.list();
	}
	
	ngOnDestroy() {
		this.subject.next(true);
		this.subject.unsubscribe();
	}

	doSearch() {
		this.scholarService.search(
			this.scholarSearchForm.get('salutationSearchList').value.id,
			this.scholarSearchForm.get('firstNameSearchText').value,
			this.scholarSearchForm.get('lastNameSearchText').value,
			this.scholarSearchForm.get('genderSearchList').value.id,
			this.scholarSearchForm.get('citizenSearchList').value.id,
			this.scholarSearchForm.get('icNumberSearchText').value,
			this.scholarSearchForm.get('handphoneNumberSearchText').value).subscribe(scholars => {
				this.scholars = scholars;
				localStorage.setItem('salutations', this.salutations.toString());
				localStorage.setItem('genders', this.genders.toString());
				localStorage.setItem('citizens', this.citizens.toString());
				localStorage.setItem('scholars', JSON.stringify(this.scholars));
			})
	}

	list() {
		this.scholarService.alphabetFiltering(
				this.selectedAlphabet).pipe(takeUntil(this.subject)).subscribe((scholars) => {
			this.scholars = scholars;
			this.showRows = this.scholars.length;
		}, (error) => {
			this.errorMessage = error.message;
		})
	}

	createScholarSearchForm():FormGroup {
		let scholarSearchForm = new FormGroup({
			salutationSearchList: new FormControl('', []), 
			firstNameSearchText: new FormControl('', []), 
			lastNameSearchText: new FormControl('', []), 
			genderSearchList: new FormControl('', []), 
			citizenSearchList: new FormControl('', []), 
			icNumberSearchText: new FormControl('', []), 
			handphoneNumberSearchText: new FormControl('', [])
		})
		return scholarSearchForm;
	}

	add() {
		let element = new Scholar(0);
		element.options = { selectedAlphabet: this.selectedAlphabet };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ScholarManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((scholars) => {
			if (scholars !== undefined) this.scholars = scholars;
		})
	}
	
	edit(element:Scholar) {
		element.options = { selectedAlphabet: this.selectedAlphabet };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(ScholarManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((scholars) => {
			if (scholars !== undefined) this.scholars = scholars;
		})
	}
	
	delete(element:Scholar) {
		element.options = { selectedAlphabet: this.selectedAlphabet };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.scholarService.delete(element).subscribe((scholars) => {
					this.scholars = scholars;
				});
			}
		});
	}
	
	showDetail(element:Scholar) {
		this.router.navigate(['/masterdetail/scholarmanagers', element.id])
	}

	print(element:Scholar) {
	}

}
