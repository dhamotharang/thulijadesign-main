import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { TrainerFamily } from '../../../shared/models/trainer/trainer-family';
import { TrainerFamilyService } from '../../../shared/services/trainer/trainer-family.service';
import { TrainerFamilyModifyComponent } from '../trainer-family-modify/trainer-family-modify.component';
import { Trainer } from '../../../shared/models/trainer/trainer';
import { TrainerService } from '../../../shared/services/trainer/trainer.service';
import { RelationType } from '../../../shared/models/general/relation-type';
import { RelationTypeService } from '../../../shared/services/general/relation-type.service';
import { Citizen } from '../../../shared/models/general/citizen';
import { CitizenService } from '../../../shared/services/general/citizen.service';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';
import { User } from '../../../shared/models/core/user';
import { LogInService } from '../../../shared/services/builtin/log-in.service';

@Component({
	selector: 'app-trainer-family',
	templateUrl: './trainer-family.component.html',
	styleUrls: ['./trainer-family.component.css']
})
export class TrainerFamilyComponent implements OnInit, OnDestroy {

	public trainer:Trainer;
	public trainerFamilies:TrainerFamily[];
	public user:User;
	private listSub:Subscription;

	constructor(private trainerService:TrainerService,
		private trainerFamilyService:TrainerFamilyService,
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
			this.trainer = trainers[0];
			this.listSub = this.trainerFamilyService.findByTrainerId(this.trainer.id).subscribe((trainerFamilies) => {
				this.trainerFamilies = trainerFamilies;
			})
		})
	}

	add() {
		let element = new TrainerFamily(0, this.trainer, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Trainer" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(TrainerFamilyModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((trainerFamilies) => {
			if (trainerFamilies != undefined) this.trainerFamilies = trainerFamilies;
		})
	}
	
	edit(element:TrainerFamily) {
		element.options = { masterDetail: "Trainer" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(TrainerFamilyModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((trainerFamilies) => {
			if (trainerFamilies != undefined) this.trainerFamilies = trainerFamilies;
		})
	}
	
	delete(element:TrainerFamily) {
		element.options = { masterDetail: "Scholar" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.trainerFamilyService.delete(element).subscribe((trainerFamilies) => {
					if (trainerFamilies !== undefined) this.trainerFamilies = trainerFamilies;
				});
			}
		});
	}

	print(element:TrainerFamily) {

	}

}