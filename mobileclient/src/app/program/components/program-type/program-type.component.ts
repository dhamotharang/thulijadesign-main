import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { ProgramType } from '../../../shared/models/program/program-type';
import { ProgramTypeService } from '../../../shared/services/program/program-type.service';
import { ProgramTypeModifyComponent } from '../program-type-modify/program-type-modify.component';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-program-type',
	templateUrl: './program-type.component.html',
	styleUrls: ['./program-type.component.scss']
})
export class ProgramTypeComponent implements OnInit, OnDestroy {

	public programTypes:ProgramType[];
	private listSub:Subscription;
	public columnCaptions:string[];

	constructor(private programTypeService:ProgramTypeService,
		private translatePipe: TranslatePipe, 
		private modalController: ModalController, 
		private alertController: AlertController) {
			this.columnCaptions = [
				'sequence',
				'name',
				'description',
				'byDefault',
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
		this.listSub = this.programTypeService.findAll().subscribe((programTypes) => {
			this.programTypes = programTypes;
		})
	}

	async add() {
		let sequence:number = 1;
		if (this.programTypes !== undefined && this.programTypes.length > 0) {
			sequence = +this.programTypes[this.programTypes.length - 1].sequence + 1;
		}
		let element = new ProgramType(0);
		element.sequence = sequence;
		const modal = await this.modalController.create({
			component: ProgramTypeModifyComponent,
			componentProps: { programType: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['programTypes'] != undefined)
				this.programTypes = data.data['programTypes'];
		});
		return await modal.present();
	}

	async edit(element:ProgramType) {
		const modal = await this.modalController.create({
			component: ProgramTypeModifyComponent,
			componentProps: { programType: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['programTypes'] != undefined)
				this.programTypes = data.data['programTypes'];
		});
		return await modal.present();
	}

	async delete(element:ProgramType) {
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.programTypeService.delete(element).subscribe((programTypes) => {
						this.programTypes = programTypes;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:ProgramType) {
	}

}