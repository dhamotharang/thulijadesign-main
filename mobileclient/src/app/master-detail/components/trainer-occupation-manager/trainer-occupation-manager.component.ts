import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

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

	constructor(private trainerService:TrainerService,
		private trainerOccupationService:TrainerOccupationService,
		private router:Router, private route: ActivatedRoute,
		private translatePipe: TranslatePipe,
		private modalController: ModalController,
		private alertController: AlertController) {
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

	async add() {
		let element = new TrainerOccupation(0, this.trainer, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Trainer" };
		const modal = await this.modalController.create({
			component: TrainerOccupationManagerModifyComponent,
			componentProps: { trainerOccupation: element }
		});
		return await modal.present();

		/*
		if (trainerOccupations !== undefined) this.trainerOccupations = trainerOccupations;
		*/
	}
	
	async edit(element:TrainerOccupation) {
		element.options = { masterDetail: "Trainer" };
		const modal = await this.modalController.create({
			component: TrainerOccupationManagerModifyComponent,
			componentProps: { trainerOccupation: element }
		});
		return await modal.present();

		/*
		if (trainerOccupations !== undefined) this.trainerOccupations = trainerOccupations;
		*/
	}
	
	async delete(element:TrainerOccupation) {
		element.options = { masterDetail: "Trainer" };
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.trainerOccupationService.delete(element).subscribe((trainerOccupations) => {
						if (trainerOccupations !== undefined) this.trainerOccupations = trainerOccupations;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}
	
	showDetail(element:TrainerOccupation) {
	}
	
	print(element:TrainerOccupation) {
	}

}
