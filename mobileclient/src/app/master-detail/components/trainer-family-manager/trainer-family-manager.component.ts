import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { TrainerFamily } from '../../../shared/models/trainer/trainer-family';
import { TrainerFamilyService } from '../../../shared/services/trainer/trainer-family.service';
import { Trainer } from '../../../shared/models/trainer/trainer';
import { TrainerService } from '../../../shared/services/trainer/trainer.service';
import { RelationType } from '../../../shared/models/general/relation-type';
import { RelationTypeService } from '../../../shared/services/general/relation-type.service';
import { Citizen } from '../../../shared/models/general/citizen';
import { CitizenService } from '../../../shared/services/general/citizen.service';

import { TrainerFamilyManagerModifyComponent } from '../trainer-family-manager-modify/trainer-family-manager-modify.component';

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

	constructor(private trainerService:TrainerService,
		private trainerFamilyService:TrainerFamilyService,
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
		this.listSub = this.trainerFamilyService.findByTrainerId(this.trainer.id).subscribe((trainerFamilies) => {
			this.trainerFamilies = trainerFamilies;
		})
	}

	async add() {
		let element = new TrainerFamily(0, this.trainer, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Trainer" };
		const modal = await this.modalController.create({
			component: TrainerFamilyManagerModifyComponent,
			componentProps: { trainerFamily: element }
		});
		return await modal.present();

		/*
		if (trainerFamilies !== undefined) this.trainerFamilies = trainerFamilies;
		*/
	}
	
	async edit(element:TrainerFamily) {
		element.options = { masterDetail: "Trainer" };
		const modal = await this.modalController.create({
			component: TrainerFamilyManagerModifyComponent,
			componentProps: { trainerFamily: element }
		});
		return await modal.present();

		/*
		if (trainerFamilies !== undefined) this.trainerFamilies = trainerFamilies;
		*/
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
	
	showDetail(element:TrainerFamily) {
	}
	
	print(element:TrainerFamily) {
	}

}
