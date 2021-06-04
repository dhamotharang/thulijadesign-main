import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { ScholarOccupation } from '../../../shared/models/scholar/scholar-occupation';
import { ScholarOccupationService } from '../../../shared/services/scholar/scholar-occupation.service';
import { ScholarOccupationModifyComponent } from '../scholar-occupation-modify/scholar-occupation-modify.component';
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
import { User } from '../../../shared/models/core/user';
import { LogInService } from '../../../shared/services/builtin/log-in.service';

@Component({
	selector: 'app-scholar-occupation',
	templateUrl: './scholar-occupation.component.html',
	styleUrls: ['./scholar-occupation.component.scss']
})
export class ScholarOccupationComponent implements OnInit, OnDestroy {

	public scholar:Scholar;
	public scholarOccupations:ScholarOccupation[];
	public user:User;
	private listSub:Subscription;

	constructor(private scholarService:ScholarService,
		private scholarOccupationService:ScholarOccupationService,
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
			this.listSub = this.scholarOccupationService.findByScholarId(this.scholar.id).subscribe((scholarOccupations) => {
				this.scholarOccupations = scholarOccupations;
			})
		})
	}

	async add() {
		let element = new ScholarOccupation(0, this.scholar, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Scholar" };
		const modal = await this.modalController.create({
			component: ScholarOccupationModifyComponent,
			componentProps: { scholarOccupation: element }
		});
		return await modal.present();
	}
	
	async edit(element:ScholarOccupation) {
		element.options = { masterDetail: "Scholar" };
		const modal = await this.modalController.create({
			component: ScholarOccupationModifyComponent,
			componentProps: { scholarOccupation: element }
		});
		return await modal.present();
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

	print(element:ScholarOccupation) {

	}

}