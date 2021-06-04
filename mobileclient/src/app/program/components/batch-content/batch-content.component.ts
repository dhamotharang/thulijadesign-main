import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { BatchContent } from '../../../shared/models/program/batch-content';
import { BatchContentService } from '../../../shared/services/program/batch-content.service';
import { BatchContentModifyComponent } from '../batch-content-modify/batch-content-modify.component';
import { Batch } from '../../../shared/models/program/batch';
import { BatchService } from '../../../shared/services/program/batch.service';
import { BatchModule } from '../../../shared/models/program/batch-module';
import { BatchModuleService } from '../../../shared/services/program/batch-module.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-batch-content',
	templateUrl: './batch-content.component.html',
	styleUrls: ['./batch-content.component.scss']
})
export class BatchContentComponent implements OnInit, OnDestroy {

	public batchContents:(BatchModule | BatchContent)[];
	private listSub:Subscription;
	public columnCaptions:string[];

	constructor(private batchContentService:BatchContentService,
		private translatePipe: TranslatePipe, 
		private modalController: ModalController, 
		private alertController: AlertController) {
			this.columnCaptions = [
				'sequence',
				'name',
				'description',
				'contentUrl',
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
		this.listSub = this.batchContentService.findAll().subscribe((batchContents) => {
			this.batchContents = batchContents;
			let batchModuleIds = new Set(this.batchContents.map((item:BatchContent) => item.batchModule.id))
			let results:(BatchModule | BatchContent)[] = [];
			batchModuleIds.forEach((batchModuleId) => {
				let currentBatchContents:BatchContent[] = 
					this.batchContents.filter((batchContent:BatchContent) => batchContent.batchModule.id == batchModuleId);
				if (currentBatchContents.length > 0) {
					let currentBatchModule:BatchModule = currentBatchContents[0].batchModule;
					results.push(currentBatchModule);
					results.push(...currentBatchContents);
				}
			})
			this.batchContents = results;
		})
	}

	isGroup(index:number, item:any): boolean{
		return !(item.id !== undefined
			&& item.sequence !== undefined
			&& item.batch !== undefined
			&& item.batchModule !== undefined
			&& item.name !== undefined
			&& item.description !== undefined
			&& item.contentUrl !== undefined
		)
	}

	async add() {
		let sequence:number = 1;
		if (this.batchContents !== undefined && this.batchContents.length > 0) {
			sequence = +this.batchContents[this.batchContents.length - 1].sequence + 1;
		}
		let element = new BatchContent(0);
		element.sequence = sequence;
		const modal = await this.modalController.create({
			component: BatchContentModifyComponent,
			componentProps: { batchContent: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['batchContents'] != undefined)
				this.batchContents = data.data['batchContents'];
		});
		return await modal.present();
	}

	async edit(element:BatchContent) {
		const modal = await this.modalController.create({
			component: BatchContentModifyComponent,
			componentProps: { batchContent: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['batchContents'] != undefined)
				this.batchContents = data.data['batchContents'];
		});
		return await modal.present();
	}

	async delete(element:BatchContent) {
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.batchContentService.delete(element).subscribe((batchContents) => {
						this.batchContents = batchContents;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:BatchContent) {
	}

}