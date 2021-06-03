import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { Race } from '../../../shared/models/general/race';
import { RaceService } from '../../../shared/services/general/race.service';
import { RaceModifyComponent } from '../race-modify/race-modify.component';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-race',
	templateUrl: './race.component.html',
	styleUrls: ['./race.component.scss']
})
export class RaceComponent implements OnInit, OnDestroy {

	public races:Race[];
	private listSub:Subscription;
	public columnCaptions:string[];

	constructor(private raceService:RaceService,
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
		this.listSub = this.raceService.findAll().subscribe((races) => {
			this.races = races;
		})
	}

	async add() {
		let sequence:number = 1;
		if (this.races !== undefined && this.races.length > 0) {
			sequence = +this.races[this.races.length - 1].sequence + 1;
		}
		let element = new Race(0);
		element.sequence = sequence;
		const modal = await this.modalController.create({
			component: RaceModifyComponent,
			componentProps: { race: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['races'] != undefined)
				this.races = data.data['races'];
		});
		return await modal.present();
	}

	async edit(element:Race) {
		const modal = await this.modalController.create({
			component: RaceModifyComponent,
			componentProps: { race: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['races'] != undefined)
				this.races = data.data['races'];
		});
		return await modal.present();
	}

	async delete(element:Race) {
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.raceService.delete(element).subscribe((races) => {
						this.races = races;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:Race) {
	}

}