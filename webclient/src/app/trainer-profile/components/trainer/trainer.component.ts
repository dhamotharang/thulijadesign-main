import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { Trainer } from '../../../shared/models/trainer/trainer';
import { TrainerService } from '../../../shared/services/trainer/trainer.service';
import { TrainerModifyComponent } from '../trainer-modify/trainer-modify.component';
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
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';
import { User } from '../../../shared/models/core/user';
import { LogInService } from '../../../shared/services/builtin/log-in.service';

@Component({
	selector: 'app-trainer',
	templateUrl: './trainer.component.html',
	styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit, OnDestroy {

	public trainers:Trainer[];
	public user:User;
	private listSub:Subscription;

	constructor(private trainerService:TrainerService,
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
		this.listSub = this.trainerService.findByUserId(this.user.id).subscribe((trainers) => {
			this.trainers = trainers;
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
		let element = new Trainer(0, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Trainer" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(TrainerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((trainers) => {
			if (trainers != undefined) this.trainers = trainers;
		})
	}
	
	edit(element:Trainer) {
		element.options = { masterDetail: "Trainer" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(TrainerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((trainers) => {
			if (trainers != undefined) this.trainers = trainers;
		})
	}
	
	delete(element:Trainer) {
		element.options = { masterDetail: "Scholar" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.trainerService.delete(element).subscribe((trainers) => {
					if (trainers !== undefined) this.trainers = trainers;
				});
			}
		});
	}

	print(element:Trainer) {

	}

}