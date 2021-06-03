import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { TrainerDetail } from '../../../shared/models/trainer/trainer-detail';
import { TrainerDetailService } from '../../../shared/services/trainer/trainer-detail.service';
import { Trainer } from '../../../shared/models/trainer/trainer';
import { TrainerService } from '../../../shared/services/trainer/trainer.service';
import { MaritalStatus } from '../../../shared/models/general/marital-status';
import { MaritalStatusService } from '../../../shared/services/general/marital-status.service';
import { Race } from '../../../shared/models/general/race';
import { RaceService } from '../../../shared/services/general/race.service';
import { Religion } from '../../../shared/models/general/religion';
import { ReligionService } from '../../../shared/services/general/religion.service';

import { TrainerDetailManagerModifyComponent } from '../trainer-detail-manager-modify/trainer-detail-manager-modify.component';

@Component({
	selector: 'app-trainer-detail-manager',
	templateUrl: './trainer-detail-manager.component.html',
	styleUrls: ['./trainer-detail-manager.component.css']
})
export class TrainerDetailManagerComponent implements OnInit, OnDestroy {

	public trainer:Trainer;
	public trainerId:number;
	public trainerDetail:TrainerDetail;
	public trainerDetailId:number;

	public trainerDetails:TrainerDetail[];
	private masterSub:Subscription;
	private detailSub:Subscription;
	private listSub:Subscription;

	constructor(private trainerService:TrainerService,
		private trainerDetailService:TrainerDetailService,
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
		this.listSub = this.trainerDetailService.findByTrainerId(this.trainer.id).subscribe((trainerDetails) => {
			this.trainerDetails = trainerDetails;
		})
	}

	async add() {
		let element = new TrainerDetail(0, this.trainer, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Trainer" };
		const modal = await this.modalController.create({
			component: TrainerDetailManagerModifyComponent,
			componentProps: { trainerDetail: element }
		});
		return await modal.present();

		/*
		if (trainerDetails !== undefined) this.trainerDetails = trainerDetails;
		*/
	}
	
	async edit(element:TrainerDetail) {
		element.options = { masterDetail: "Trainer" };
		const modal = await this.modalController.create({
			component: TrainerDetailManagerModifyComponent,
			componentProps: { trainerDetail: element }
		});
		return await modal.present();

		/*
		if (trainerDetails !== undefined) this.trainerDetails = trainerDetails;
		*/
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
	
	showDetail(element:TrainerDetail) {
	}
	
	print(element:TrainerDetail) {
	}

}
