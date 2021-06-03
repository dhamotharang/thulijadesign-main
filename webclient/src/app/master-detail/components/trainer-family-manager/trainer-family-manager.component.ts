import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { TrainerFamily } from '../../../shared/models/trainer/trainer-family';
import { TrainerFamilyService } from '../../../shared/services/trainer/trainer-family.service';
import { Trainer } from '../../../shared/models/trainer/trainer';
import { TrainerService } from '../../../shared/services/trainer/trainer.service';
import { RelationType } from '../../../shared/models/general/relation-type';
import { RelationTypeService } from '../../../shared/services/general/relation-type.service';
import { Citizen } from '../../../shared/models/general/citizen';
import { CitizenService } from '../../../shared/services/general/citizen.service';

import { TrainerFamilyManagerModifyComponent } from '../trainer-family-manager-modify/trainer-family-manager-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-trainer-family-manager',
	templateUrl: './trainer-family-manager.component.html',
	styleUrls: ['./trainer-family-manager.component.css']
})
export class TrainerFamilyManagerComponent implements OnInit, OnDestroy {

	public trainer:Trainer;
	public trainerId:number;
	public trainerFamily:TrainerFamily;
	public trainerFamilyId:number;

	public trainerFamilies:TrainerFamily[];
	private masterSub:Subscription;
	private detailSub:Subscription;
	private listSub:Subscription;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private trainerService:TrainerService,
		private trainerFamilyService:TrainerFamilyService,
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
		this.listSub = this.trainerFamilyService.findByTrainerId(this.trainer.id).subscribe((trainerFamilies) => {
			this.trainerFamilies = trainerFamilies;
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
		let dialogRef = this.dialog.open(TrainerFamilyManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((trainerFamilies) => {
			if (trainerFamilies !== undefined) this.trainerFamilies = trainerFamilies;
		})
	}
	
	edit(element:TrainerFamily) {
		element.options = { masterDetail: "Trainer" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(TrainerFamilyManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((trainerFamilies) => {
			if (trainerFamilies !== undefined) this.trainerFamilies = trainerFamilies;
		})
	}
	
	delete(element:TrainerFamily) {
		element.options = { masterDetail: "Trainer" };
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
	
	showDetail(element:TrainerFamily) {
	}
	
	print(element:TrainerFamily) {
	}

}
