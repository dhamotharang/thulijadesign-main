import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { TrainerOccupation } from '../../../shared/models/trainer/trainer-occupation';
import { TrainerOccupationService } from '../../../shared/services/trainer/trainer-occupation.service';
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

import { TrainerOccupationManagerModifyComponent } from '../trainer-occupation-manager-modify/trainer-occupation-manager-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-trainer-occupation-manager',
	templateUrl: './trainer-occupation-manager.component.html',
	styleUrls: ['./trainer-occupation-manager.component.css']
})
export class TrainerOccupationManagerComponent implements OnInit, OnDestroy {

	public trainer:Trainer;
	public trainerId:number;
	public trainerOccupation:TrainerOccupation;
	public trainerOccupationId:number;

	public trainerOccupations:TrainerOccupation[];
	private masterSub:Subscription;
	private detailSub:Subscription;
	private listSub:Subscription;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private trainerService:TrainerService,
		private trainerOccupationService:TrainerOccupationService,
		private router:Router, private route: ActivatedRoute, 
		private dialog: MatDialog) {
			this.columnCaptions = [
				'trainer',
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
			this.trainerId = +params.get('id');
			this.masterSub = this.trainerService.findById(this.trainerId).subscribe((trainer) => {
				this.trainer = trainer;
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
		this.listSub = this.trainerOccupationService.findByTrainerId(this.trainer.id).subscribe((trainerOccupations) => {
			this.trainerOccupations = trainerOccupations;
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
		let dialogRef = this.dialog.open(TrainerOccupationManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((trainerOccupations) => {
			if (trainerOccupations !== undefined) this.trainerOccupations = trainerOccupations;
		})
	}
	
	edit(element:TrainerOccupation) {
		element.options = { masterDetail: "Trainer" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(TrainerOccupationManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((trainerOccupations) => {
			if (trainerOccupations !== undefined) this.trainerOccupations = trainerOccupations;
		})
	}
	
	delete(element:TrainerOccupation) {
		element.options = { masterDetail: "Trainer" };
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
	
	showDetail(element:TrainerOccupation) {
	}
	
	print(element:TrainerOccupation) {
	}

}
