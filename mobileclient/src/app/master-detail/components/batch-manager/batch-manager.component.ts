import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

import { Batch } from '../../../shared/models/program/batch';
import { BatchService } from '../../../shared/services/program/batch.service';
import { Program } from '../../../shared/models/program/program';
import { ProgramService } from '../../../shared/services/program/program.service';
import { State } from '../../../shared/models/general/state';
import { StateService } from '../../../shared/services/general/state.service';
import { Country } from '../../../shared/models/general/country';
import { CountryService } from '../../../shared/services/general/country.service';

import { BatchManagerModifyComponent } from '../batch-manager-modify/batch-manager-modify.component';

@Component({
	selector: 'app-batch-manager',
	templateUrl: './batch-manager.component.html',
	styleUrls: ['./batch-manager.component.css']
})
export class BatchManagerComponent implements OnInit, OnDestroy {

	public program:Program;
	public programId:number;
	public batch:Batch;
	public batchId:number;

	public batches:Batch[];
	private masterSub:Subscription;
	private detailSub:Subscription;
	private listSub:Subscription;

	constructor(private programService:ProgramService,
		private batchService:BatchService,
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
		this.listSub = this.batchService.findByProgramId(this.program.id).subscribe((batches) => {
			this.batches = batches;
		})
	}

	async add() {
		let element = new Batch(0, this.program, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Program" };
		const modal = await this.modalController.create({
			component: BatchManagerModifyComponent,
			componentProps: { batch: element }
		});
		return await modal.present();

		/*
		if (batches !== undefined) this.batches = batches;
		*/
	}
	
	async edit(element:Batch) {
		element.options = { masterDetail: "Program" };
		const modal = await this.modalController.create({
			component: BatchManagerModifyComponent,
			componentProps: { batch: element }
		});
		return await modal.present();

		/*
		if (batches !== undefined) this.batches = batches;
		*/
	}
	
	async delete(element:Batch) {
		element.options = { masterDetail: "Program" };
		let alertConfirm = await this.alertController.create({
			header: this.translatePipe.transform("DELETE-CONFIRMATION-TITLE"),
			message: this.translatePipe.transform("DELETE-CONFIRMATION-MESSAGE"),
			buttons: [{
				text: "Ok",
				handler: () => {
					this.batchService.delete(element).subscribe((batches) => {
						if (batches !== undefined) this.batches = batches;
					});
				}
			}, {
				text: "Cancel",
				role: "cancel"
			}]
		});
		await alertConfirm.present();
	}
	
	showDetail(element:Batch) {
		this.router.navigate(['/masterdetail/programmanagers/' + this.programId + '/batchmanagers', element.id]);
	}
	
	print(element:Batch) {
	}

}
