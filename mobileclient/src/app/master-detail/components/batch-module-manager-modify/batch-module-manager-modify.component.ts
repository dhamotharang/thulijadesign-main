import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { BatchModule } from '../../../shared/models/program/batch-module';
import { BatchModuleService } from '../../../shared/services/program/batch-module.service';
import { Batch } from '../../../shared/models/program/batch';
import { BatchService } from '../../../shared/services/program/batch.service';
import { Program } from '../../../shared/models/program/program';
import { ProgramService } from '../../../shared/services/program/program.service';

@Component({
	selector: 'app-batch-module-manager-modify',
	templateUrl: './batch-module-manager-modify.component.html',
	styleUrls: ['./batch-module-manager-modify.component.css']
})
export class BatchModuleManagerModifyComponent implements OnInit {

	public batchModuleForm:FormGroup;
	public batchModule:BatchModule;
	public batches:Batch[];
	public currentBatch:Batch;
	public errorMessage:string;

	compareBatch = (currentbatch: Batch, batch: Batch) => currentbatch.id == batch.id;

	constructor(private batchModuleService:BatchModuleService,
			private batchService:BatchService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.batchModule = this.navParams.get('batchModule');
		this.batchService.findAllByLookup().subscribe(batches => {
			this.batches = batches;
		})
	}

	ngOnInit() {
		if (this.batchModule.id === 0) {
			this.batchModuleForm = this.createBatchModuleForm();
		} else {
			this.batchModuleForm = this.editBatchModuleForm();
		}
	}

	createBatchModuleForm():FormGroup {
		let batchModuleForm = new FormGroup({
			sequence: new FormControl(this.batchModule.sequence, {
				validators: [
					Validators.required, 
					Validators.min(1),
					Validators.max(2000),
					Validators.pattern("^[0-9]*$")
				]
			}),
			batch: new FormControl('', {
				validators: [
				]
			}),
			name: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(1),
					Validators.maxLength(120)
				]
			}),
			description: new FormControl('', {
				validators: [
					Validators.required, 
					Validators.minLength(1),
					Validators.maxLength(500)
				]
			})
		})
		return batchModuleForm;
	}

	editBatchModuleForm():FormGroup {
		this.currentBatch = this.batchModule.batch;
		let batchModuleForm = new FormGroup({
			sequence: new FormControl(this.batchModule.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(2000)
			]), 
			batch: new FormControl(this.batchModule.batch, [
			]), 
			name: new FormControl(this.batchModule.name, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(120)
			]), 
			description: new FormControl(this.batchModule.description, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(500)
			])
		})
		return batchModuleForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.batchModuleForm.controls[controlName].hasError(errorName);
	}

	public save(batchModule:BatchModule) {
		batchModule.batch = this.batchModule.batch;
		batchModule.options = this.batchModule.options;
		if (this.batchModule.id === 0) {
			this.batchModuleService.save(batchModule).subscribe((batchModules) => {
				this.modalController.dismiss({ 'dismissed': true, 'batchModules':batchModules });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			batchModule.id = this.batchModule.id;
			this.batchModuleService.update(batchModule.id, batchModule).subscribe((batchModules) => {
				this.modalController.dismiss({ 'dismissed': true, 'batchModules':batchModules });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
