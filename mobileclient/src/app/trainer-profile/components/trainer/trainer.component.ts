import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { Trainer } from '../../../shared/models/trainer/trainer';
import { TrainerService } from '../../../shared/services/trainer/trainer.service';
import { TrainerModifyComponent } from '../trainer-modify/trainer-modify.component';
import { Salutation } from '../../../shared/models/general/salutation';
import { SalutationService } from '../../../shared/services/general/salutation.service';
import { Gender } from '../../../shared/models/general/gender';
import { GenderService } from '../../../shared/services/general/gender.service';
import { Citizen } from '../../../shared/models/general/citizen';
import { CitizenService } from '../../../shared/services/general/citizen.service';
import { Department } from '../../../shared/models/core/department';
import { DepartmentService } from '../../../shared/services/core/department.service';
import { Branch } from '../../../shared/models/core/branch';
import { BranchService } from '../../../shared/services/core/branch.service';
import { Organization } from '../../../shared/models/core/organization';
import { OrganizationService } from '../../../shared/services/core/organization.service';
import { Status } from '../../../shared/models/core/status';
import { StatusService } from '../../../shared/services/core/status.service';
import { User } from '../../../shared/models/core/user';
import { LogInService } from '../../../shared/services/builtin/log-in.service';

@Component({
	selector: 'app-trainer',
	templateUrl: './trainer.component.html',
	styleUrls: ['./trainer.component.scss']
})
export class TrainerComponent implements OnInit, OnDestroy {

	public trainers:Trainer[];
	public user:User;
	private listSub:Subscription;

	constructor(private trainerService:TrainerService,
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
			this.trainers = trainers;
		})
	}

	createTrainerSearchForm():FormGroup {
		let trainerSearchForm = new FormGroup({
			salutationSearchList: new FormControl('', []), 
			firstNameSearchText: new FormControl('', []), 
			lastNameSearchText: new FormControl('', []), 
			genderSearchList: new FormControl('', []), 
			citizenSearchList: new FormControl('', []), 
			icNumberSearchText: new FormControl('', []), 
			handphoneNumberSearchText: new FormControl('', [])
		})
		return trainerSearchForm;
	}

	async add() {
		let element = new Trainer(0, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Trainer" };
		const modal = await this.modalController.create({
			component: TrainerModifyComponent,
			componentProps: { trainer: element }
		});
		return await modal.present();
	}
	
	async edit(element:Trainer) {
		element.options = { masterDetail: "Trainer" };
		const modal = await this.modalController.create({
			component: TrainerModifyComponent,
			componentProps: { trainer: element }
		});
		return await modal.present();
	}
	
	async delete(element:Trainer) {
		element.options = { masterDetail: "Trainer" };
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.trainerService.delete(element).subscribe((trainers) => {
						if (trainers !== undefined) this.trainers = trainers;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:Trainer) {

	}

}