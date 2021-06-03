import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { Department } from '../../../shared/models/core/department';
import { DepartmentService } from '../../../shared/services/core/department.service';
import { DepartmentModifyComponent } from '../department-modify/department-modify.component';
import { Organization } from '../../../shared/models/core/organization';
import { OrganizationService } from '../../../shared/services/core/organization.service';
import { Branch } from '../../../shared/models/core/branch';
import { BranchService } from '../../../shared/services/core/branch.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-department',
	templateUrl: './department.component.html',
	styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit, OnDestroy {

	public departments:Department[];
	private listSub:Subscription;
	public columnCaptions:string[];

	constructor(private departmentService:DepartmentService,
		private translatePipe: TranslatePipe, 
		private modalController: ModalController, 
		private alertController: AlertController) {
			this.columnCaptions = [
				'sequence',
				'organization',
				'branch',
				'abbreviation',
				'name',
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
		this.listSub = this.departmentService.findAll().subscribe((departments) => {
			this.departments = departments;
		})
	}

	async add() {
		let sequence:number = 1;
		if (this.departments !== undefined && this.departments.length > 0) {
			sequence = +this.departments[this.departments.length - 1].sequence + 1;
		}
		let element = new Department(0);
		element.sequence = sequence;
		const modal = await this.modalController.create({
			component: DepartmentModifyComponent,
			componentProps: { department: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['departments'] != undefined)
				this.departments = data.data['departments'];
		});
		return await modal.present();
	}

	async edit(element:Department) {
		const modal = await this.modalController.create({
			component: DepartmentModifyComponent,
			componentProps: { department: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['departments'] != undefined)
				this.departments = data.data['departments'];
		});
		return await modal.present();
	}

	async delete(element:Department) {
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.departmentService.delete(element).subscribe((departments) => {
						this.departments = departments;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:Department) {
	}

}