import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { ScholarRegistration } from '../../../shared/models/registration/scholar-registration';
import { ScholarRegistrationService } from '../../../shared/services/registration/scholar-registration.service';
import { ScholarRegistrationModifyComponent } from '../scholar-registration-modify/scholar-registration-modify.component';
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
import { OrganizationType } from '../../../shared/models/core/organization-type';
import { OrganizationTypeService } from '../../../shared/services/core/organization-type.service';
import { User } from '../../../shared/models/core/user';
import { UserService } from '../../../shared/services/core/user.service';
import { Scholar } from '../../../shared/models/scholar/scholar';
import { ScholarService } from '../../../shared/services/scholar/scholar.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-scholar-registration',
	templateUrl: './scholar-registration.component.html',
	styleUrls: ['./scholar-registration.component.scss']
})
export class ScholarRegistrationComponent implements OnInit, OnDestroy {

	public scholarRegistrations:ScholarRegistration[];
	private listSub:Subscription;
	public columnCaptions:string[];

	constructor(private scholarRegistrationService:ScholarRegistrationService,
		private translatePipe: TranslatePipe, 
		private modalController: ModalController, 
		private alertController: AlertController) {
			this.columnCaptions = [
				'organization',
				'branch',
				'department',
				'firstName',
				'lastName',
				'icNumber',
				'gender',
				'handphoneNumber',
				'emailAddress',
				'status',
				'action'
			];
	}

	ngOnInit() {
		this.list();
	}

	ngOnDestroy() {
		if (this.listSub) {
			this.listSub.unsubscribe();
		}
	}

	list() {
		this.listSub = this.scholarRegistrationService.findAll().subscribe((scholarRegistrations) => {
			this.scholarRegistrations = scholarRegistrations;
		})
	}

	async add() {
		let element = new ScholarRegistration(0);
		const modal = await this.modalController.create({
			component: ScholarRegistrationModifyComponent,
			componentProps: { scholarRegistration: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['scholarRegistrations'] != undefined)
				this.scholarRegistrations = data.data['scholarRegistrations'];
		});
		return await modal.present();
	}

	async edit(element:ScholarRegistration) {
		const modal = await this.modalController.create({
			component: ScholarRegistrationModifyComponent,
			componentProps: { scholarRegistration: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['scholarRegistrations'] != undefined)
				this.scholarRegistrations = data.data['scholarRegistrations'];
		});
		return await modal.present();
	}

	async delete(element:ScholarRegistration) {
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.scholarRegistrationService.delete(element).subscribe((scholarRegistrations) => {
						this.scholarRegistrations = scholarRegistrations;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:ScholarRegistration) {
	}

}