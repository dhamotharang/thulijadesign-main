import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { ScholarEducationDetail } from '../../../shared/models/scholar/scholar-education-detail';
import { ScholarEducationDetailService } from '../../../shared/services/scholar/scholar-education-detail.service';
import { Scholar } from '../../../shared/models/scholar/scholar';
import { ScholarService } from '../../../shared/services/scholar/scholar.service';
import { Qualification } from '../../../shared/models/general/qualification';
import { QualificationService } from '../../../shared/services/general/qualification.service';
import { State } from '../../../shared/models/general/state';
import { StateService } from '../../../shared/services/general/state.service';
import { Country } from '../../../shared/models/general/country';
import { CountryService } from '../../../shared/services/general/country.service';
import { FieldStudy } from '../../../shared/models/general/field-study';
import { FieldStudyService } from '../../../shared/services/general/field-study.service';

import { ScholarEducationDetailManagerModifyComponent } from '../scholar-education-detail-manager-modify/scholar-education-detail-manager-modify.component';

@Component({
	selector: 'app-scholar-education-detail-manager',
	templateUrl: './scholar-education-detail-manager.component.html',
	styleUrls: ['./scholar-education-detail-manager.component.css']
})
export class ScholarEducationDetailManagerComponent implements OnInit, OnDestroy {

	public scholar:Scholar;
	public scholarId:number;
	public scholarEducationDetail:ScholarEducationDetail;
	public scholarEducationDetailId:number;

	public scholarEducationDetails:ScholarEducationDetail[];
	private masterSub:Subscription;
	private detailSub:Subscription;
	private listSub:Subscription;

	constructor(private scholarService:ScholarService,
		private scholarEducationDetailService:ScholarEducationDetailService,
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
		this.listSub = this.scholarEducationDetailService.findByScholarId(this.scholar.id).subscribe((scholarEducationDetails) => {
			this.scholarEducationDetails = scholarEducationDetails;
		})
	}

	async add() {
		let element = new ScholarEducationDetail(0, this.scholar, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Scholar" };
		const modal = await this.modalController.create({
			component: ScholarEducationDetailManagerModifyComponent,
			componentProps: { scholarEducationDetail: element }
		});
		return await modal.present();

		/*
		if (scholarEducationDetails !== undefined) this.scholarEducationDetails = scholarEducationDetails;
		*/
	}
	
	async edit(element:ScholarEducationDetail) {
		element.options = { masterDetail: "Scholar" };
		const modal = await this.modalController.create({
			component: ScholarEducationDetailManagerModifyComponent,
			componentProps: { scholarEducationDetail: element }
		});
		return await modal.present();

		/*
		if (scholarEducationDetails !== undefined) this.scholarEducationDetails = scholarEducationDetails;
		*/
	}
	
	async delete(element:ScholarEducationDetail) {
		element.options = { masterDetail: "Scholar" };
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.scholarEducationDetailService.delete(element).subscribe((scholarEducationDetails) => {
						if (scholarEducationDetails !== undefined) this.scholarEducationDetails = scholarEducationDetails;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}
	
	showDetail(element:ScholarEducationDetail) {
	}
	
	print(element:ScholarEducationDetail) {
	}

}
