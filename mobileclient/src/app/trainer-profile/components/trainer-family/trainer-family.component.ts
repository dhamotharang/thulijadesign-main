import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { TrainerFamily } from '../../../shared/models/trainer/trainer-family';
import { TrainerFamilyService } from '../../../shared/services/trainer/trainer-family.service';
import { TrainerFamilyModifyComponent } from '../trainer-family-modify/trainer-family-modify.component';
import { Trainer } from '../../../shared/models/trainer/trainer';
import { TrainerService } from '../../../shared/services/trainer/trainer.service';
import { RelationType } from '../../../shared/models/general/relation-type';
import { RelationTypeService } from '../../../shared/services/general/relation-type.service';
import { Citizen } from '../../../shared/models/general/citizen';
import { CitizenService } from '../../../shared/services/general/citizen.service';
import { User } from '../../../shared/models/core/user';
import { LogInService } from '../../../shared/services/builtin/log-in.service';

@Component({
	selector: 'app-trainer-family',
	templateUrl: './trainer-family.component.html',
	styleUrls: ['./trainer-family.component.scss']
})
export class TrainerFamilyComponent implements OnInit, OnDestroy {

	public trainer:Trainer;
	public trainerFamilies:TrainerFamily[];
	public user:User;
	private listSub:Subscription;

	constructor(private trainerService:TrainerService,
		private trainerFamilyService:TrainerFamilyService,
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
			this.listSub = this.trainerFamilyService.findByTrainerId(this.trainer.id).subscribe((trainerFamilies) => {
				this.trainerFamilies = trainerFamilies;
			})
		})
	}

	async add() {
		let element = new TrainerFamily(0, this.trainer, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Trainer" };
		const modal = await this.modalController.create({
			component: TrainerFamilyModifyComponent,
			componentProps: { trainerFamily: element }
		});
		return await modal.present();
	}
	
	async edit(element:TrainerFamily) {
		element.options = { masterDetail: "Trainer" };
		const modal = await this.modalController.create({
			component: TrainerFamilyModifyComponent,
			componentProps: { trainerFamily: element }
		});
		return await modal.present();
	}
	
	async delete(element:TrainerFamily) {
		element.options = { masterDetail: "Trainer" };
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.trainerFamilyService.delete(element).subscribe((trainerFamilies) => {
						if (trainerFamilies !== undefined) this.trainerFamilies = trainerFamilies;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:TrainerFamily) {

	}

}