import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

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
import { User } from '../../../shared/models/core/user';
import { LogInService } from '../../../shared/services/builtin/log-in.service';

@Component({
	selector: 'app-trainer-occupation',
	templateUrl: './trainer-occupation.component.html',
	styleUrls: ['./trainer-occupation.component.scss']
})
export class TrainerOccupationComponent implements OnInit, OnDestroy {

	public trainer:Trainer;
	public trainerOccupations:TrainerOccupation[];
	public user:User;
	private listSub:Subscription;

	constructor(private trainerService:TrainerService,
		private trainerOccupationService:TrainerOccupationService,
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
			this.listSub = this.trainerOccupationService.findByTrainerId(this.trainer.id).subscribe((trainerOccupations) => {
				this.trainerOccupations = trainerOccupations;
			})
		})
	}

	async add() {
		let element = new TrainerOccupation(0, this.trainer, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Trainer" };
		const modal = await this.modalController.create({
			component: TrainerOccupationModifyComponent,
			componentProps: { trainerOccupation: element }
		});
		return await modal.present();
	}
	
	async edit(element:TrainerOccupation) {
		element.options = { masterDetail: "Trainer" };
		const modal = await this.modalController.create({
			component: TrainerOccupationModifyComponent,
			componentProps: { trainerOccupation: element }
		});
		return await modal.present();
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

	print(element:TrainerOccupation) {

	}

}