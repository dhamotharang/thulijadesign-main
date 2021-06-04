import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { ScholarFamily } from '../../../shared/models/scholar/scholar-family';
import { ScholarFamilyService } from '../../../shared/services/scholar/scholar-family.service';
import { ScholarFamilyModifyComponent } from '../scholar-family-modify/scholar-family-modify.component';
import { Scholar } from '../../../shared/models/scholar/scholar';
import { ScholarService } from '../../../shared/services/scholar/scholar.service';
import { RelationType } from '../../../shared/models/general/relation-type';
import { RelationTypeService } from '../../../shared/services/general/relation-type.service';
import { Citizen } from '../../../shared/models/general/citizen';
import { CitizenService } from '../../../shared/services/general/citizen.service';
import { User } from '../../../shared/models/core/user';
import { LogInService } from '../../../shared/services/builtin/log-in.service';

@Component({
	selector: 'app-scholar-family',
	templateUrl: './scholar-family.component.html',
	styleUrls: ['./scholar-family.component.scss']
})
export class ScholarFamilyComponent implements OnInit, OnDestroy {

	public scholar:Scholar;
	public scholarFamilies:ScholarFamily[];
	public user:User;
	private listSub:Subscription;

	constructor(private scholarService:ScholarService,
		private scholarFamilyService:ScholarFamilyService,
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
		this.listSub = this.scholarService.findByUserId(this.user.id).subscribe((scholars) => {
			this.scholar = scholars[0];
			this.listSub = this.scholarFamilyService.findByScholarId(this.scholar.id).subscribe((scholarFamilies) => {
				this.scholarFamilies = scholarFamilies;
			})
		})
	}

	async add() {
		let element = new ScholarFamily(0, this.scholar, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Scholar" };
		const modal = await this.modalController.create({
			component: ScholarFamilyModifyComponent,
			componentProps: { scholarFamily: element }
		});
		return await modal.present();
	}
	
	async edit(element:ScholarFamily) {
		element.options = { masterDetail: "Scholar" };
		const modal = await this.modalController.create({
			component: ScholarFamilyModifyComponent,
			componentProps: { scholarFamily: element }
		});
		return await modal.present();
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

	print(element:ScholarFamily) {

	}

}