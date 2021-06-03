import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

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

	constructor(private trainerService:TrainerService,
		private trainerEducationDetailService:TrainerEducationDetailService,
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
		this.listSub = this.trainerEducationDetailService.findByTrainerId(this.trainer.id).subscribe((trainerEducationDetails) => {
			this.trainerEducationDetails = trainerEducationDetails;
		})
	}

	async add() {
		let element = new TrainerEducationDetail(0, this.trainer, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Trainer" };
		const modal = await this.modalController.create({
			component: TrainerEducationDetailManagerModifyComponent,
			componentProps: { trainerEducationDetail: element }
		});
		return await modal.present();

		/*
		if (trainerEducationDetails !== undefined) this.trainerEducationDetails = trainerEducationDetails;
		*/
	}
	
	async edit(element:TrainerEducationDetail) {
		element.options = { masterDetail: "Trainer" };
		const modal = await this.modalController.create({
			component: TrainerEducationDetailManagerModifyComponent,
			componentProps: { trainerEducationDetail: element }
		});
		return await modal.present();

		/*
		if (trainerEducationDetails !== undefined) this.trainerEducationDetails = trainerEducationDetails;
		*/
	}
	
	async delete(element:TrainerEducationDetail) {
		element.options = { masterDetail: "Trainer" };
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.trainerEducationDetailService.delete(element).subscribe((trainerEducationDetails) => {
						if (trainerEducationDetails !== undefined) this.trainerEducationDetails = trainerEducationDetails;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}
	
	showDetail(element:TrainerEducationDetail) {
	}
	
	print(element:TrainerEducationDetail) {
	}

}
