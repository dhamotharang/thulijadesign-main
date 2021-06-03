import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { SalaryRange } from '../../../shared/models/general/salary-range';
import { SalaryRangeService } from '../../../shared/services/general/salary-range.service';
import { SalaryRangeModifyComponent } from '../salary-range-modify/salary-range-modify.component';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-salary-range',
	templateUrl: './salary-range.component.html',
	styleUrls: ['./salary-range.component.scss']
})
export class SalaryRangeComponent implements OnInit, OnDestroy {

	public salaryRanges:SalaryRange[];
	private listSub:Subscription;
	public columnCaptions:string[];

	constructor(private salaryRangeService:SalaryRangeService,
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
		this.listSub = this.salaryRangeService.findAll().subscribe((salaryRanges) => {
			this.salaryRanges = salaryRanges;
		})
	}

	async add() {
		let sequence:number = 1;
		if (this.salaryRanges !== undefined && this.salaryRanges.length > 0) {
			sequence = +this.salaryRanges[this.salaryRanges.length - 1].sequence + 1;
		}
		let element = new SalaryRange(0);
		element.sequence = sequence;
		const modal = await this.modalController.create({
			component: SalaryRangeModifyComponent,
			componentProps: { salaryRange: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['salaryRanges'] != undefined)
				this.salaryRanges = data.data['salaryRanges'];
		});
		return await modal.present();
	}

	async edit(element:SalaryRange) {
		const modal = await this.modalController.create({
			component: SalaryRangeModifyComponent,
			componentProps: { salaryRange: element }
		});
		modal.onDidDismiss().then((data) => {
			if (data.data['salaryRanges'] != undefined)
				this.salaryRanges = data.data['salaryRanges'];
		});
		return await modal.present();
	}

	async delete(element:SalaryRange) {
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.salaryRangeService.delete(element).subscribe((salaryRanges) => {
						this.salaryRanges = salaryRanges;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}

	print(element:SalaryRange) {
	}

}