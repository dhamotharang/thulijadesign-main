import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { State } from '../../../shared/models/general/state';
import { StateService } from '../../../shared/services/general/state.service';
import { StateModifyComponent } from '../state-modify/state-modify.component';
import { Country } from '../../../shared/models/general/country';
import { CountryService } from '../../../shared/services/general/country.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-state',
	templateUrl: './state.component.html',
	styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit, OnDestroy {

	public states:State[];
	private listSub:Subscription;
	public columnCaptions:string[];

	constructor(private stateService:StateService,
		private translatePipe: TranslatePipe, 
		private modalController: ModalController, 
		private alertController: AlertController) {
			this.columnCaptions = [
				'sequence',
				'country',
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
		this.listSub = this.stateService.findAll().subscribe((states) => {
			this.states = states;
		})
	}

	async add() {
		let sequence:number = 1;
		if (this.states !== undefined && this.states.length > 0) {
			sequence = +this.states[this.states.length - 1].sequence + 1;
		}
		let element = new State(0);
		element.sequence = sequence;
		const modal = await this.modalController.create({
			component: StateModifyComponent,
			componentProps: { state: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['states'] != undefined)
				this.states = data.data['states'];
		});
		return await modal.present();
	}

	async edit(element:State) {
		const modal = await this.modalController.create({
			component: StateModifyComponent,
			componentProps: { state: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['states'] != undefined)
				this.states = data.data['states'];
		});
		return await modal.present();
	}

	async delete(element:State) {
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.stateService.delete(element).subscribe((states) => {
						this.states = states;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:State) {
	}

}