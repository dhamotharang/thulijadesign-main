import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { BatchScholar } from '../../../shared/models/program/batch-scholar';
import { BatchScholarService } from '../../../shared/services/program/batch-scholar.service';
import { Scholar } from '../../../shared/models/scholar/scholar';
import { ScholarService } from '../../../shared/services/scholar/scholar.service';
import { Batch } from '../../../shared/models/program/batch';
import { BatchService } from '../../../shared/services/program/batch.service';
import { Program } from '../../../shared/models/program/program';
import { ProgramService } from '../../../shared/services/program/program.service';

import { BatchScholarManagerModifyComponent } from '../batch-scholar-manager-modify/batch-scholar-manager-modify.component';

@Component({
	selector: 'app-batch-scholar-manager',
	templateUrl: './batch-scholar-manager.component.html',
	styleUrls: ['./batch-scholar-manager.component.css']
})
export class BatchScholarManagerComponent implements OnInit, OnDestroy {

	public program:Program;
	public programId:number;
	public batch:Batch;
	public batchId:number;
	public batchScholar:BatchScholar;
	public batchScholarId:number;

	public batchScholars:BatchScholar[];
	private masterSub:Subscription;
	private detailSub:Subscription;
	private listSub:Subscription;

	constructor(private programService:ProgramService,
		private batchService:BatchService,
		private batchScholarService:BatchScholarService,
		private router:Router, private route: ActivatedRoute,
		private translatePipe: TranslatePipe,
		private modalController: ModalController,
		private alertController: AlertController) {
	}
	
	ngOnInit() {
		this.route.parent.paramMap.subscribe((params:ParamMap) => {
			this.programId = +params.get('id');
			this.masterSub = this.programService.findById(this.programId).subscribe((program) => {
				this.program = program;
			});
		});
		this.route.parent.paramMap.subscribe((params:ParamMap) => {
			this.batchId = +params.get('batchid');
			this.detailSub = this.batchService.findById(this.batchId).subscribe((batch) => {
				this.batch = batch;
				this.list();
			});
		});
	}
	
	ngOnDestroy() {
		if (this.listSub) {
			this.listSub.unsubscribe();
		}
		if (this.masterSub) {
			this.masterSub.unsubscribe();
		}
		if (this.detailSub) {
			this.detailSub.unsubscribe();
		}
	}
	
	list() {
		this.listSub = this.batchScholarService.findByBatchId(this.batch.id).subscribe((batchScholars) => {
			this.batchScholars = batchScholars;
		})
	}

	async add() {
		let element = new BatchScholar(0, this.batch, undefined );
		element.options = { masterDetail: "Batch" };
		const modal = await this.modalController.create({
			component: BatchScholarManagerModifyComponent,
			componentProps: { batchScholar: element }
		});
		return await modal.present();

		/*
		if (batchScholars !== undefined) this.batchScholars = batchScholars;
		*/
	}
	
	async edit(element:BatchScholar) {
		element.options = { masterDetail: "Batch" };
		const modal = await this.modalController.create({
			component: BatchScholarManagerModifyComponent,
			componentProps: { batchScholar: element }
		});
		return await modal.present();

		/*
		if (batchScholars !== undefined) this.batchScholars = batchScholars;
		*/
	}
	
	async delete(element:BatchScholar) {
		element.options = { masterDetail: "Program" };
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.batchScholarService.delete(element).subscribe((batchScholars) => {
						if (batchScholars !== undefined) this.batchScholars = batchScholars;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}
	
	showDetail(element:BatchScholar) {
		this.router.navigate(['/masterdetail/programmanagers/' + this.programId + '/batchmanagers/' + this.batchId + '/batchscholarmanagers', element.id]);
	}
	
	print(element:BatchScholar) {
	}

}
