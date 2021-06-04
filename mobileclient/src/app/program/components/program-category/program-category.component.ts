import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { ProgramCategory } from '../../../shared/models/program/program-category';
import { ProgramCategoryService } from '../../../shared/services/program/program-category.service';
import { ProgramCategoryModifyComponent } from '../program-category-modify/program-category-modify.component';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-program-category',
	templateUrl: './program-category.component.html',
	styleUrls: ['./program-category.component.scss']
})
export class ProgramCategoryComponent implements OnInit, OnDestroy {

	public programCategories:ProgramCategory[];
	private listSub:Subscription;
	public columnCaptions:string[];

	constructor(private programCategoryService:ProgramCategoryService,
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
		this.listSub = this.programCategoryService.findAll().subscribe((programCategories) => {
			this.programCategories = programCategories;
		})
	}

	async add() {
		let sequence:number = 1;
		if (this.programCategories !== undefined && this.programCategories.length > 0) {
			sequence = +this.programCategories[this.programCategories.length - 1].sequence + 1;
		}
		let element = new ProgramCategory(0);
		element.sequence = sequence;
		const modal = await this.modalController.create({
			component: ProgramCategoryModifyComponent,
			componentProps: { programCategory: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['programCategories'] != undefined)
				this.programCategories = data.data['programCategories'];
		});
		return await modal.present();
	}

	async edit(element:ProgramCategory) {
		const modal = await this.modalController.create({
			component: ProgramCategoryModifyComponent,
			componentProps: { programCategory: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['programCategories'] != undefined)
				this.programCategories = data.data['programCategories'];
		});
		return await modal.present();
	}

	async delete(element:ProgramCategory) {
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.programCategoryService.delete(element).subscribe((programCategories) => {
						this.programCategories = programCategories;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:ProgramCategory) {
	}

}