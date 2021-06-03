import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { TrainerEducationDetail } from '../../../shared/models/trainer/trainer-education-detail';
import { TrainerEducationDetailService } from '../../../shared/services/trainer/trainer-education-detail.service';
import { TrainerEducationDetailModifyComponent } from '../trainer-education-detail-modify/trainer-education-detail-modify.component';
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
import { User } from '../../../shared/models/core/user';
import { LogInService } from '../../../shared/services/builtin/log-in.service';

@Component({
	selector: 'app-trainer-education-detail',
	templateUrl: './trainer-education-detail.component.html',
	styleUrls: ['./trainer-education-detail.component.scss']
})
export class TrainerEducationDetailComponent implements OnInit, OnDestroy {

	public trainer:Trainer;
	public trainerEducationDetails:TrainerEducationDetail[];
	public user:User;
	private listSub:Subscription;

	constructor(private trainerService:TrainerService,
		private trainerEducationDetailService:TrainerEducationDetailService,
		private logInService:LogInService,
		private translatePipe: TranslatePipe, 
		private modalController: ModalController,
		private alertController: AlertController) {
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
			this.listSub = this.trainerEducationDetailService.findByTrainerId(this.trainer.id).subscribe((trainerEducationDetails) => {
				this.trainerEducationDetails = trainerEducationDetails;
			})
		})
	}

	async add() {
		let element = new TrainerEducationDetail(0, this.trainer, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Trainer" };
		const modal = await this.modalController.create({
			component: TrainerEducationDetailModifyComponent,
			componentProps: { trainerEducationDetail: element }
		});
		return await modal.present();
	}
	
	async edit(element:TrainerEducationDetail) {
		element.options = { masterDetail: "Trainer" };
		const modal = await this.modalController.create({
			component: TrainerEducationDetailModifyComponent,
			componentProps: { trainerEducationDetail: element }
		});
		return await modal.present();
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

	print(element:TrainerEducationDetail) {

	}

}