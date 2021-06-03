import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

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
import { User } from '../../../shared/models/core/user';
import { LogInService } from '../../../shared/services/builtin/log-in.service';

@Component({
	selector: 'app-trainer-detail',
	templateUrl: './trainer-detail.component.html',
	styleUrls: ['./trainer-detail.component.scss']
})
export class TrainerDetailComponent implements OnInit, OnDestroy {

	public trainer:Trainer;
	public trainerDetails:TrainerDetail[];
	public user:User;
	private listSub:Subscription;

	constructor(private trainerService:TrainerService,
		private trainerDetailService:TrainerDetailService,
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
			this.listSub = this.trainerDetailService.findByTrainerId(this.trainer.id).subscribe((trainerDetails) => {
				this.trainerDetails = trainerDetails;
			})
		})
	}

	async add() {
		let element = new TrainerDetail(0, this.trainer, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Trainer" };
		const modal = await this.modalController.create({
			component: TrainerDetailModifyComponent,
			componentProps: { trainerDetail: element }
		});
		return await modal.present();
	}
	
	async edit(element:TrainerDetail) {
		element.options = { masterDetail: "Trainer" };
		const modal = await this.modalController.create({
			component: TrainerDetailModifyComponent,
			componentProps: { trainerDetail: element }
		});
		return await modal.present();
	}
	
	async delete(element:TrainerDetail) {
		element.options = { masterDetail: "Trainer" };
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.trainerDetailService.delete(element).subscribe((trainerDetails) => {
						if (trainerDetails !== undefined) this.trainerDetails = trainerDetails;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:TrainerDetail) {

	}

}