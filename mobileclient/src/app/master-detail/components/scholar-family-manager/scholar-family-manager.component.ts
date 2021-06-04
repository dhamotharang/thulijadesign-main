import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { ScholarFamily } from '../../../shared/models/scholar/scholar-family';
import { ScholarFamilyService } from '../../../shared/services/scholar/scholar-family.service';
import { Scholar } from '../../../shared/models/scholar/scholar';
import { ScholarService } from '../../../shared/services/scholar/scholar.service';
import { RelationType } from '../../../shared/models/general/relation-type';
import { RelationTypeService } from '../../../shared/services/general/relation-type.service';
import { Citizen } from '../../../shared/models/general/citizen';
import { CitizenService } from '../../../shared/services/general/citizen.service';

import { ScholarFamilyManagerModifyComponent } from '../scholar-family-manager-modify/scholar-family-manager-modify.component';

@Component({
	selector: 'app-scholar-family-manager',
	templateUrl: './scholar-family-manager.component.html',
	styleUrls: ['./scholar-family-manager.component.css']
})
export class ScholarFamilyManagerComponent implements OnInit, OnDestroy {

	public scholar:Scholar;
	public scholarId:number;
	public scholarFamily:ScholarFamily;
	public scholarFamilyId:number;

	public scholarFamilies:ScholarFamily[];
	private masterSub:Subscription;
	private detailSub:Subscription;
	private listSub:Subscription;

	constructor(private scholarService:ScholarService,
		private scholarFamilyService:ScholarFamilyService,
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
		this.listSub = this.scholarFamilyService.findByScholarId(this.scholar.id).subscribe((scholarFamilies) => {
			this.scholarFamilies = scholarFamilies;
		})
	}

	async add() {
		let element = new ScholarFamily(0, this.scholar, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Scholar" };
		const modal = await this.modalController.create({
			component: ScholarFamilyManagerModifyComponent,
			componentProps: { scholarFamily: element }
		});
		return await modal.present();

		/*
		if (scholarFamilies !== undefined) this.scholarFamilies = scholarFamilies;
		*/
	}
	
	async edit(element:ScholarFamily) {
		element.options = { masterDetail: "Scholar" };
		const modal = await this.modalController.create({
			component: ScholarFamilyManagerModifyComponent,
			componentProps: { scholarFamily: element }
		});
		return await modal.present();

		/*
		if (scholarFamilies !== undefined) this.scholarFamilies = scholarFamilies;
		*/
	}
	
	async delete(element:ScholarFamily) {
		element.options = { masterDetail: "Scholar" };
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.scholarFamilyService.delete(element).subscribe((scholarFamilies) => {
						if (scholarFamilies !== undefined) this.scholarFamilies = scholarFamilies;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}
	
	showDetail(element:ScholarFamily) {
	}
	
	print(element:ScholarFamily) {
	}

}
