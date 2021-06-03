import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { TrainerDetail } from '../../../shared/models/trainer/trainer-detail';
import { TrainerDetailService } from '../../../shared/services/trainer/trainer-detail.service';
import { Trainer } from '../../../shared/models/trainer/trainer';
import { TrainerService } from '../../../shared/services/trainer/trainer.service';
import { MaritalStatus } from '../../../shared/models/general/marital-status';
import { MaritalStatusService } from '../../../shared/services/general/marital-status.service';
import { Race } from '../../../shared/models/general/race';
import { RaceService } from '../../../shared/services/general/race.service';
import { Religion } from '../../../shared/models/general/religion';
import { ReligionService } from '../../../shared/services/general/religion.service';

import { TrainerDetailManagerModifyComponent } from '../trainer-detail-manager-modify/trainer-detail-manager-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-trainer-detail-manager',
	templateUrl: './trainer-detail-manager.component.html',
	styleUrls: ['./trainer-detail-manager.component.css']
})
export class TrainerDetailManagerComponent implements OnInit, OnDestroy {

	public trainer:Trainer;
	public trainerId:number;
	public trainerDetail:TrainerDetail;
	public trainerDetailId:number;

	public trainerDetails:TrainerDetail[];
	private masterSub:Subscription;
	private detailSub:Subscription;
	private listSub:Subscription;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private trainerService:TrainerService,
		private trainerDetailService:TrainerDetailService,
		private router:Router, private route: ActivatedRoute, 
		private dialog: MatDialog) {
			this.columnCaptions = [
				'trainer',
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
		this.listSub = this.trainerDetailService.findByTrainerId(this.trainer.id).subscribe((trainerDetails) => {
			this.trainerDetails = trainerDetails;
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
		let dialogRef = this.dialog.open(TrainerDetailManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((trainerDetails) => {
			if (trainerDetails !== undefined) this.trainerDetails = trainerDetails;
		})
	}
	
	edit(element:TrainerDetail) {
		element.options = { masterDetail: "Trainer" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(TrainerDetailManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((trainerDetails) => {
			if (trainerDetails !== undefined) this.trainerDetails = trainerDetails;
		})
	}
	
	delete(element:TrainerDetail) {
		element.options = { masterDetail: "Trainer" };
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
	
	showDetail(element:TrainerDetail) {
	}
	
	print(element:TrainerDetail) {
	}

}
