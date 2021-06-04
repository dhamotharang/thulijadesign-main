import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { ScholarDetail } from '../../../shared/models/scholar/scholar-detail';
import { ScholarDetailService } from '../../../shared/services/scholar/scholar-detail.service';
import { ScholarDetailModifyComponent } from '../scholar-detail-modify/scholar-detail-modify.component';
import { Scholar } from '../../../shared/models/scholar/scholar';
import { ScholarService } from '../../../shared/services/scholar/scholar.service';
import { MaritalStatus } from '../../../shared/models/general/marital-status';
import { MaritalStatusService } from '../../../shared/services/general/marital-status.service';
import { Race } from '../../../shared/models/general/race';
import { RaceService } from '../../../shared/services/general/race.service';
import { Religion } from '../../../shared/models/general/religion';
import { ReligionService } from '../../../shared/services/general/religion.service';
import { User } from '../../../shared/models/core/user';
import { LogInService } from '../../../shared/services/builtin/log-in.service';

@Component({
	selector: 'app-scholar-detail',
	templateUrl: './scholar-detail.component.html',
	styleUrls: ['./scholar-detail.component.scss']
})
export class ScholarDetailComponent implements OnInit, OnDestroy {

	public scholar:Scholar;
	public scholarDetails:ScholarDetail[];
	public user:User;
	private listSub:Subscription;

	constructor(private scholarService:ScholarService,
		private scholarDetailService:ScholarDetailService,
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
			this.listSub = this.scholarDetailService.findByScholarId(this.scholar.id).subscribe((scholarDetails) => {
				this.scholarDetails = scholarDetails;
			})
		})
	}

	async add() {
		let element = new ScholarDetail(0, this.scholar, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Scholar" };
		const modal = await this.modalController.create({
			component: ScholarDetailModifyComponent,
			componentProps: { scholarDetail: element }
		});
		return await modal.present();
	}
	
	async edit(element:ScholarDetail) {
		element.options = { masterDetail: "Scholar" };
		const modal = await this.modalController.create({
			component: ScholarDetailModifyComponent,
			componentProps: { scholarDetail: element }
		});
		return await modal.present();
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

	print(element:ScholarDetail) {

	}

}