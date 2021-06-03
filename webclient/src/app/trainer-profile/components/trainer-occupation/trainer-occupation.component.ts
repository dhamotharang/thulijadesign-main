import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { TrainerOccupation } from '../../../shared/models/trainer/trainer-occupation';
import { TrainerOccupationService } from '../../../shared/services/trainer/trainer-occupation.service';
import { TrainerOccupationModifyComponent } from '../trainer-occupation-modify/trainer-occupation-modify.component';
import { Trainer } from '../../../shared/models/trainer/trainer';
import { TrainerService } from '../../../shared/services/trainer/trainer.service';
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
	selector: 'app-trainer-occupation',
	templateUrl: './trainer-occupation.component.html',
	styleUrls: ['./trainer-occupation.component.css']
})
export class TrainerOccupationComponent implements OnInit, OnDestroy {

	public trainer:Trainer;
	public trainerOccupations:TrainerOccupation[];
	public user:User;
	private listSub:Subscription;

	constructor(private trainerService:TrainerService,
		private trainerOccupationService:TrainerOccupationService,
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
			this.listSub = this.trainerOccupationService.findByTrainerId(this.trainer.id).subscribe((trainerOccupations) => {
				this.trainerOccupations = trainerOccupations;
			})
		})
	}

	add() {
		let element = new TrainerOccupation(0, this.trainer, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Trainer" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(TrainerOccupationModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((trainerOccupations) => {
			if (trainerOccupations != undefined) this.trainerOccupations = trainerOccupations;
		})
	}
	
	edit(element:TrainerOccupation) {
		element.options = { masterDetail: "Trainer" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(TrainerOccupationModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((trainerOccupations) => {
			if (trainerOccupations != undefined) this.trainerOccupations = trainerOccupations;
		})
	}
	
	delete(element:TrainerOccupation) {
		element.options = { masterDetail: "Scholar" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.trainerOccupationService.delete(element).subscribe((trainerOccupations) => {
					if (trainerOccupations !== undefined) this.trainerOccupations = trainerOccupations;
				});
			}
		});
	}

	print(element:TrainerOccupation) {

	}

}