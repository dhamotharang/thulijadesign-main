import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { ProgramMaster } from '../../../shared/models/program/program-master';
import { ProgramMasterService } from '../../../shared/services/program/program-master.service';
import { ProgramCategory } from '../../../shared/models/program/program-category';
import { ProgramCategoryService } from '../../../shared/services/program/program-category.service';
import { ProgramType } from '../../../shared/models/program/program-type';
import { ProgramTypeService } from '../../../shared/services/program/program-type.service';
import { ProgramMasterManagerModifyComponent } from '../program-master-manager-modify/program-master-manager-modify.component';

@Component({
	selector: 'app-program-master-manager',
	templateUrl: './program-master-manager.component.html',
	styleUrls: ['./program-master-manager.component.css']
})
export class ProgramMasterManagerComponent implements OnInit, OnDestroy {

	public programMasters:ProgramMaster[];
	private listSub:Subscription;
	public columnCaptions:string[];
	
	constructor(private programMasterService:ProgramMasterService,
		private router:Router,
		private translatePipe: TranslatePipe,
		private modalController: ModalController,
		private alertController: AlertController) {
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
		this.listSub = this.programMasterService.findAll().subscribe((programMasters) => {
			this.programMasters = programMasters;
		})
	}

	async add() {
		let sequence:number = 1;
		if (this.programMasters !== undefined && this.programMasters.length > 0) {
			sequence = +this.programMasters[this.programMasters.length - 1].sequence;
		}
		let element = new ProgramMaster(0);
		const modal = await this.modalController.create({
			component: ProgramMasterManagerModifyComponent,
			componentProps: { programMaster: element }
		});
		return await modal.present();
	}

	async edit(element:ProgramMaster) {
		const modal = await this.modalController.create({
			component: ProgramMasterManagerModifyComponent,
			componentProps: { programMaster: element }
		});
		return await modal.present();
	}

	async delete(element:ProgramMaster) {
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.programMasterService.delete(element).subscribe((programMasters) => {
						this.programMasters = programMasters;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}
	
	showDetail(element:ProgramMaster) {
		this.router.navigate(['/masterdetail/programmastermanagers', element.id])
	}

	print(element:ProgramMaster) {
	}

}
