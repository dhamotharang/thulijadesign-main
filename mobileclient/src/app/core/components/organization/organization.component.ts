import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { Organization } from '../../../shared/models/core/organization';
import { OrganizationService } from '../../../shared/services/core/organization.service';
import { OrganizationModifyComponent } from '../organization-modify/organization-modify.component';
import { OrganizationType } from '../../../shared/models/core/organization-type';
import { OrganizationTypeService } from '../../../shared/services/core/organization-type.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-organization',
	templateUrl: './organization.component.html',
	styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit, OnDestroy {

	public organizations:Organization[];
	private listSub:Subscription;
	public columnCaptions:string[];

	constructor(private organizationService:OrganizationService,
		private translatePipe: TranslatePipe, 
		private modalController: ModalController, 
		private alertController: AlertController) {
			this.columnCaptions = [
				'organizationType',
				'abbreviation',
				'name',
				'profile',
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
		this.listSub = this.organizationService.findAll().subscribe((organizations) => {
			this.organizations = organizations;
		})
	}

	async add() {
		let element = new Organization(0);
		const modal = await this.modalController.create({
			component: OrganizationModifyComponent,
			componentProps: { organization: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['organizations'] != undefined)
				this.organizations = data.data['organizations'];
		});
		return await modal.present();
	}

	async edit(element:Organization) {
		const modal = await this.modalController.create({
			component: OrganizationModifyComponent,
			componentProps: { organization: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['organizations'] != undefined)
				this.organizations = data.data['organizations'];
		});
		return await modal.present();
	}

	async delete(element:Organization) {
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.organizationService.delete(element).subscribe((organizations) => {
						this.organizations = organizations;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:Organization) {
	}

}