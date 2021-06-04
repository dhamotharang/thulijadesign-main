import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { ScholarOccupation } from '../../../shared/models/scholar/scholar-occupation';
import { ScholarOccupationService } from '../../../shared/services/scholar/scholar-occupation.service';
import { Scholar } from '../../../shared/models/scholar/scholar';
import { ScholarService } from '../../../shared/services/scholar/scholar.service';
import { Qualification } from '../../../shared/models/general/qualification';
import { QualificationService } from '../../../shared/services/general/qualification.service';
import { State } from '../../../shared/models/general/state';
import { StateService } from '../../../shared/services/general/state.service';
import { Country } from '../../../shared/models/general/country';
import { CountryService } from '../../../shared/services/general/country.service';
import { PositionLevel } from '../../../shared/models/general/position-level';
import { PositionLevelService } from '../../../shared/services/general/position-level.service';

import { ScholarOccupationManagerModifyComponent } from '../scholar-occupation-manager-modify/scholar-occupation-manager-modify.component';

@Component({
	selector: 'app-scholar-occupation-manager',
	templateUrl: './scholar-occupation-manager.component.html',
	styleUrls: ['./scholar-occupation-manager.component.css']
})
export class ScholarOccupationManagerComponent implements OnInit, OnDestroy {

	public scholar:Scholar;
	public scholarId:number;
	public scholarOccupation:ScholarOccupation;
	public scholarOccupationId:number;

	public scholarOccupations:ScholarOccupation[];
	private masterSub:Subscription;
	private detailSub:Subscription;
	private listSub:Subscription;

	constructor(private scholarService:ScholarService,
		private scholarOccupationService:ScholarOccupationService,
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
		this.listSub = this.scholarOccupationService.findByScholarId(this.scholar.id).subscribe((scholarOccupations) => {
			this.scholarOccupations = scholarOccupations;
		})
	}

	async add() {
		let element = new ScholarOccupation(0, this.scholar, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Scholar" };
		const modal = await this.modalController.create({
			component: ScholarOccupationManagerModifyComponent,
			componentProps: { scholarOccupation: element }
		});
		return await modal.present();

		/*
		if (scholarOccupations !== undefined) this.scholarOccupations = scholarOccupations;
		*/
	}
	
	async edit(element:ScholarOccupation) {
		element.options = { masterDetail: "Scholar" };
		const modal = await this.modalController.create({
			component: ScholarOccupationManagerModifyComponent,
			componentProps: { scholarOccupation: element }
		});
		return await modal.present();

		/*
		if (scholarOccupations !== undefined) this.scholarOccupations = scholarOccupations;
		*/
	}
	
	async delete(element:ScholarOccupation) {
		element.options = { masterDetail: "Scholar" };
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.scholarOccupationService.delete(element).subscribe((scholarOccupations) => {
						if (scholarOccupations !== undefined) this.scholarOccupations = scholarOccupations;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}
	
	showDetail(element:ScholarOccupation) {
	}
	
	print(element:ScholarOccupation) {
	}

}
