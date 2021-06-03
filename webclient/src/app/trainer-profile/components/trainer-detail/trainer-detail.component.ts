import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { TrainerDetail } from '../../../shared/models/trainer/trainer-detail';
import { TrainerDetailService } from '../../../shared/services/trainer/trainer-detail.service';
import { TrainerDetailModifyComponent } from '../trainer-detail-modify/trainer-detail-modify.component';
import { Trainer } from '../../../shared/models/trainer/trainer';
import { TrainerService } from '../../../shared/services/trainer/trainer.service';
import { MaritalStatus } from '../../../shared/models/general/marital-status';
import { MaritalStatusService } from '../../../shared/services/general/marital-status.service';
import { Race } from '../../../shared/models/general/race';
import { RaceService } from '../../../shared/services/general/race.service';
import { Religion } from '../../../shared/models/general/religion';
import { ReligionService } from '../../../shared/services/general/religion.service';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';
import { User } from '../../../shared/models/core/user';
import { LogInService } from '../../../shared/services/builtin/log-in.service';

@Component({
	selector: 'app-trainer-detail',
	templateUrl: './trainer-detail.component.html',
	styleUrls: ['./trainer-detail.component.css']
})
export class TrainerDetailComponent implements OnInit, OnDestroy {

	public trainer:Trainer;
	public trainerDetails:TrainerDetail[];
	public user:User;
	private listSub:Subscription;

	constructor(private trainerService:TrainerService,
		private trainerDetailService:TrainerDetailService,
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
			this.listSub = this.trainerDetailService.findByTrainerId(this.trainer.id).subscribe((trainerDetails) => {
				this.trainerDetails = trainerDetails;
			})
		})
	}

	add() {
		let element = new TrainerDetail(0, this.trainer, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Trainer" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(TrainerDetailModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((trainerDetails) => {
			if (trainerDetails != undefined) this.trainerDetails = trainerDetails;
		})
	}
	
	edit(element:TrainerDetail) {
		element.options = { masterDetail: "Trainer" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(TrainerDetailModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((trainerDetails) => {
			if (trainerDetails != undefined) this.trainerDetails = trainerDetails;
		})
	}
	
	delete(element:TrainerDetail) {
		element.options = { masterDetail: "Scholar" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.trainerDetailService.delete(element).subscribe((trainerDetails) => {
					if (trainerDetails !== undefined) this.trainerDetails = trainerDetails;
				});
			}
		});
	}

	print(element:TrainerDetail) {

	}

}