import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { RelationType } from '../../../shared/models/general/relation-type';
import { RelationTypeService } from '../../../shared/services/general/relation-type.service';
import { RelationTypeModifyComponent } from '../relation-type-modify/relation-type-modify.component';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-relation-type',
	templateUrl: './relation-type.component.html',
	styleUrls: ['./relation-type.component.scss']
})
export class RelationTypeComponent implements OnInit, OnDestroy {

	public relationTypes:RelationType[];
	private listSub:Subscription;
	public columnCaptions:string[];

	constructor(private relationTypeService:RelationTypeService,
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
		this.listSub = this.relationTypeService.findAll().subscribe((relationTypes) => {
			this.relationTypes = relationTypes;
		})
	}

	async add() {
		let sequence:number = 1;
		if (this.relationTypes !== undefined && this.relationTypes.length > 0) {
			sequence = +this.relationTypes[this.relationTypes.length - 1].sequence + 1;
		}
		let element = new RelationType(0);
		element.sequence = sequence;
		const modal = await this.modalController.create({
			component: RelationTypeModifyComponent,
			componentProps: { relationType: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['relationTypes'] != undefined)
				this.relationTypes = data.data['relationTypes'];
		});
		return await modal.present();
	}

	async edit(element:RelationType) {
		const modal = await this.modalController.create({
			component: RelationTypeModifyComponent,
			componentProps: { relationType: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['relationTypes'] != undefined)
				this.relationTypes = data.data['relationTypes'];
		});
		return await modal.present();
	}

	async delete(element:RelationType) {
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.relationTypeService.delete(element).subscribe((relationTypes) => {
						this.relationTypes = relationTypes;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:RelationType) {
	}

}