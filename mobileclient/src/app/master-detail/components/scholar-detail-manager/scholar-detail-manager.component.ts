import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { ScholarDetail } from '../../../shared/models/scholar/scholar-detail';
import { ScholarDetailService } from '../../../shared/services/scholar/scholar-detail.service';
import { Scholar } from '../../../shared/models/scholar/scholar';
import { ScholarService } from '../../../shared/services/scholar/scholar.service';
import { MaritalStatus } from '../../../shared/models/general/marital-status';
import { MaritalStatusService } from '../../../shared/services/general/marital-status.service';
import { Race } from '../../../shared/models/general/race';
import { RaceService } from '../../../shared/services/general/race.service';
import { Religion } from '../../../shared/models/general/religion';
import { ReligionService } from '../../../shared/services/general/religion.service';

import { ScholarDetailManagerModifyComponent } from '../scholar-detail-manager-modify/scholar-detail-manager-modify.component';

@Component({
	selector: 'app-scholar-detail-manager',
	templateUrl: './scholar-detail-manager.component.html',
	styleUrls: ['./scholar-detail-manager.component.css']
})
export class ScholarDetailManagerComponent implements OnInit, OnDestroy {

	public scholar:Scholar;
	public scholarId:number;
	public scholarDetail:ScholarDetail;
	public scholarDetailId:number;

	public scholarDetails:ScholarDetail[];
	private masterSub:Subscription;
	private detailSub:Subscription;
	private listSub:Subscription;

	constructor(private scholarService:ScholarService,
		private scholarDetailService:ScholarDetailService,
		private router:Router, private route: ActivatedRoute,
		private translatePipe: TranslatePipe,
		private modalController: ModalController,
		private alertController: AlertController) {
	}
	
	ngOnInit() {
		this.route.parent.paramMap.subscribe((params:ParamMap) => {
			this.scholarId = +params.get('id');
			this.masterSub = this.scholarService.findById(this.scholarId).subscribe((scholar) => {
				this.scholar = scholar;
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
		this.listSub = this.scholarDetailService.findByScholarId(this.scholar.id).subscribe((scholarDetails) => {
			this.scholarDetails = scholarDetails;
		})
	}

	async add() {
		let element = new ScholarDetail(0, this.scholar, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Scholar" };
		const modal = await this.modalController.create({
			component: ScholarDetailManagerModifyComponent,
			componentProps: { scholarDetail: element }
		});
		return await modal.present();

		/*
		if (scholarDetails !== undefined) this.scholarDetails = scholarDetails;
		*/
	}
	
	async edit(element:ScholarDetail) {
		element.options = { masterDetail: "Scholar" };
		const modal = await this.modalController.create({
			component: ScholarDetailManagerModifyComponent,
			componentProps: { scholarDetail: element }
		});
		return await modal.present();

		/*
		if (scholarDetails !== undefined) this.scholarDetails = scholarDetails;
		*/
	}
	
	async delete(element:ScholarDetail) {
		element.options = { masterDetail: "Scholar" };
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.scholarDetailService.delete(element).subscribe((scholarDetails) => {
						if (scholarDetails !== undefined) this.scholarDetails = scholarDetails;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}
	
	showDetail(element:ScholarDetail) {
	}
	
	print(element:ScholarDetail) {
	}

}
