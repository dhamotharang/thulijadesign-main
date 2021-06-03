import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { Trainer } from '../../../shared/models/trainer/trainer';
import { TrainerService } from '../../../shared/services/trainer/trainer.service';
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
import { TrainerManagerModifyComponent } from '../trainer-manager-modify/trainer-manager-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-trainer-manager',
	templateUrl: './trainer-manager.component.html',
	styleUrls: ['./trainer-manager.component.css']
})
export class TrainerManagerComponent implements OnInit, OnDestroy {

	public trainers:Trainer[];
	public trainerSearchForm:FormGroup;
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

	constructor(private trainerService:TrainerService,
		private salutationService:SalutationService,
		private genderService:GenderService,
		private citizenService:CitizenService,
		private router:Router, private dialog: MatDialog) {
			this.columnCaptions = [
				'icNumber', 
				'firstName', 
				'lastName', 
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
		this.trainerSearchForm = this.createTrainerSearchForm();
		this.list();
	}
	
	ngOnDestroy() {
		this.subject.next(true);
		this.subject.unsubscribe();
	}

	doSearch() {
		this.trainerService.search(
			this.trainerSearchForm.get('salutationSearchList').value.id,
			this.trainerSearchForm.get('firstNameSearchText').value,
			this.trainerSearchForm.get('lastNameSearchText').value,
			this.trainerSearchForm.get('genderSearchList').value.id,
			this.trainerSearchForm.get('citizenSearchList').value.id,
			this.trainerSearchForm.get('icNumberSearchText').value,
			this.trainerSearchForm.get('handphoneNumberSearchText').value).subscribe(trainers => {
				this.trainers = trainers;
				localStorage.setItem('salutations', this.salutations.toString());
				localStorage.setItem('genders', this.genders.toString());
				localStorage.setItem('citizens', this.citizens.toString());
				localStorage.setItem('trainers', JSON.stringify(this.trainers));
			})
	}

	list() {
		this.trainerService.alphabetFiltering(
				this.selectedAlphabet).pipe(takeUntil(this.subject)).subscribe((trainers) => {
			this.trainers = trainers;
			this.showRows = this.trainers.length;
		}, (error) => {
			this.errorMessage = error.message;
		})
	}

	createTrainerSearchForm():FormGroup {
		let trainerSearchForm = new FormGroup({
			salutationSearchList: new FormControl('', []), 
			firstNameSearchText: new FormControl('', []), 
			lastNameSearchText: new FormControl('', []), 
			genderSearchList: new FormControl('', []), 
			citizenSearchList: new FormControl('', []), 
			icNumberSearchText: new FormControl('', []), 
			handphoneNumberSearchText: new FormControl('', [])
		})
		return trainerSearchForm;
	}

	add() {
		let element = new Trainer(0);
		element.options = { selectedAlphabet: this.selectedAlphabet };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(TrainerManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((trainers) => {
			if (trainers !== undefined) this.trainers = trainers;
		})
	}
	
	edit(element:Trainer) {
		element.options = { selectedAlphabet: this.selectedAlphabet };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(TrainerManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((trainers) => {
			if (trainers !== undefined) this.trainers = trainers;
		})
	}
	
	delete(element:Trainer) {
		element.options = { selectedAlphabet: this.selectedAlphabet };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.trainerService.delete(element).subscribe((trainers) => {
					this.trainers = trainers;
				});
			}
		});
	}
	
	showDetail(element:Trainer) {
		this.router.navigate(['/masterdetail/trainermanagers', element.id])
	}

	print(element:Trainer) {
	}

}
