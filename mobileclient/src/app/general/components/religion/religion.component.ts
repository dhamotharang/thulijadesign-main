import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { Religion } from '../../../shared/models/general/religion';
import { ReligionService } from '../../../shared/services/general/religion.service';
import { ReligionModifyComponent } from '../religion-modify/religion-modify.component';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-religion',
	templateUrl: './religion.component.html',
	styleUrls: ['./religion.component.scss']
})
export class ReligionComponent implements OnInit, OnDestroy {

	public religions:Religion[];
	private listSub:Subscription;
	public columnCaptions:string[];

	constructor(private religionService:ReligionService,
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
		this.listSub = this.religionService.findAll().subscribe((religions) => {
			this.religions = religions;
		})
	}

	async add() {
		let sequence:number = 1;
		if (this.religions !== undefined && this.religions.length > 0) {
			sequence = +this.religions[this.religions.length - 1].sequence + 1;
		}
		let element = new Religion(0);
		element.sequence = sequence;
		const modal = await this.modalController.create({
			component: ReligionModifyComponent,
			componentProps: { religion: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['religions'] != undefined)
				this.religions = data.data['religions'];
		});
		return await modal.present();
	}

	async edit(element:Religion) {
		const modal = await this.modalController.create({
			component: ReligionModifyComponent,
			componentProps: { religion: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['religions'] != undefined)
				this.religions = data.data['religions'];
		});
		return await modal.present();
	}

	async delete(element:Religion) {
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.religionService.delete(element).subscribe((religions) => {
						this.religions = religions;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:Religion) {
	}

}