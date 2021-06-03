import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { TrainerEducationDetail } from '../../../shared/models/trainer/trainer-education-detail';
import { TrainerEducationDetailService } from '../../../shared/services/trainer/trainer-education-detail.service';
import { Trainer } from '../../../shared/models/trainer/trainer';
import { TrainerService } from '../../../shared/services/trainer/trainer.service';
import { Qualification } from '../../../shared/models/general/qualification';
import { QualificationService } from '../../../shared/services/general/qualification.service';
import { State } from '../../../shared/models/general/state';
import { StateService } from '../../../shared/services/general/state.service';
import { Country } from '../../../shared/models/general/country';
import { CountryService } from '../../../shared/services/general/country.service';
import { FieldStudy } from '../../../shared/models/general/field-study';
import { FieldStudyService } from '../../../shared/services/general/field-study.service';

import { TrainerEducationDetailManagerModifyComponent } from '../trainer-education-detail-manager-modify/trainer-education-detail-manager-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-trainer-education-detail-manager',
	templateUrl: './trainer-education-detail-manager.component.html',
	styleUrls: ['./trainer-education-detail-manager.component.css']
})
export class TrainerEducationDetailManagerComponent implements OnInit, OnDestroy {

	public trainer:Trainer;
	public trainerId:number;
	public trainerEducationDetail:TrainerEducationDetail;
	public trainerEducationDetailId:number;

	public trainerEducationDetails:TrainerEducationDetail[];
	private masterSub:Subscription;
	private detailSub:Subscription;
	private listSub:Subscription;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private trainerService:TrainerService,
		private trainerEducationDetailService:TrainerEducationDetailService,
		private router:Router, private route: ActivatedRoute, 
		private dialog: MatDialog) {
			this.columnCaptions = [
				'trainer',
				'instituteName',
				'graduationDate',
				'qualification',
				'fieldStudy',
				'major',
				'grade',
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
		this.listSub = this.trainerEducationDetailService.findByTrainerId(this.trainer.id).subscribe((trainerEducationDetails) => {
			this.trainerEducationDetails = trainerEducationDetails;
		})
	}

	add() {
		let element = new TrainerEducationDetail(0, this.trainer, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Trainer" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(TrainerEducationDetailManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((trainerEducationDetails) => {
			if (trainerEducationDetails !== undefined) this.trainerEducationDetails = trainerEducationDetails;
		})
	}
	
	edit(element:TrainerEducationDetail) {
		element.options = { masterDetail: "Trainer" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(TrainerEducationDetailManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((trainerEducationDetails) => {
			if (trainerEducationDetails !== undefined) this.trainerEducationDetails = trainerEducationDetails;
		})
	}
	
	delete(element:TrainerEducationDetail) {
		element.options = { masterDetail: "Trainer" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.trainerEducationDetailService.delete(element).subscribe((trainerEducationDetails) => {
					if (trainerEducationDetails !== undefined) this.trainerEducationDetails = trainerEducationDetails;
				});
			}
		});
	}
	
	showDetail(element:TrainerEducationDetail) {
	}
	
	print(element:TrainerEducationDetail) {
	}

}
