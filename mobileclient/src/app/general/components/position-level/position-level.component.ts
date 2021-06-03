import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { PositionLevel } from '../../../shared/models/general/position-level';
import { PositionLevelService } from '../../../shared/services/general/position-level.service';
import { PositionLevelModifyComponent } from '../position-level-modify/position-level-modify.component';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-position-level',
	templateUrl: './position-level.component.html',
	styleUrls: ['./position-level.component.scss']
})
export class PositionLevelComponent implements OnInit, OnDestroy {

	public positionLevels:PositionLevel[];
	private listSub:Subscription;
	public columnCaptions:string[];

	constructor(private positionLevelService:PositionLevelService,
		private translatePipe: TranslatePipe, 
		private modalController: ModalController, 
		private alertController: AlertController) {
			this.columnCaptions = [
				'sequence',
				'code',
				'name',
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
		this.listSub = this.positionLevelService.findAll().subscribe((positionLevels) => {
			this.positionLevels = positionLevels;
		})
	}

	async add() {
		let sequence:number = 1;
		if (this.positionLevels !== undefined && this.positionLevels.length > 0) {
			sequence = +this.positionLevels[this.positionLevels.length - 1].sequence + 1;
		}
		let element = new PositionLevel(0);
		element.sequence = sequence;
		const modal = await this.modalController.create({
			component: PositionLevelModifyComponent,
			componentProps: { positionLevel: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['positionLevels'] != undefined)
				this.positionLevels = data.data['positionLevels'];
		});
		return await modal.present();
	}

	async edit(element:PositionLevel) {
		const modal = await this.modalController.create({
			component: PositionLevelModifyComponent,
			componentProps: { positionLevel: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['positionLevels'] != undefined)
				this.positionLevels = data.data['positionLevels'];
		});
		return await modal.present();
	}

	async delete(element:PositionLevel) {
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.positionLevelService.delete(element).subscribe((positionLevels) => {
						this.positionLevels = positionLevels;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:PositionLevel) {
	}

}