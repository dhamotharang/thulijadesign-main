import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { Batch } from '../../../shared/models/program/batch';
import { BatchService } from '../../../shared/services/program/batch.service';
import { BatchPrerequisite } from '../../../shared/models/program/batch-prerequisite';
import { BatchPrerequisiteService } from '../../../shared/services/program/batch-prerequisite.service';

@Component({
	selector: 'app-batch-prerequisite-modify',
	templateUrl: './batch-prerequisite-modify.component.html',
	styleUrls: ['./batch-prerequisite-modify.component.scss']
})
export class BatchPrerequisiteModifyComponent implements OnInit {

	public batchPrerequisiteForm:FormGroup;
	public batchPrerequisite:BatchPrerequisite;
	public batches:Batch[];
	public currentBatch:Batch;
	public errorMessage:string;

	compareBatch = (currentbatch: Batch, batch: Batch) => currentbatch.id == batch.id;

	constructor(private batchPrerequisiteService:BatchPrerequisiteService,
			private batchService:BatchService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.batchPrerequisite = this.navParams.get('batchPrerequisite');
		this.batchService.findAllByLookup().subscribe(batches => {
			this.batches = batches;
		})
	}

	ngOnInit() {
		if (this.batchPrerequisite.id === 0) {
			this.batchPrerequisiteForm = this.createBatchPrerequisiteForm();
		} else {
			this.batchPrerequisiteForm = this.editBatchPrerequisiteForm();
		}
	}

	createBatchPrerequisiteForm():FormGroup {
		let batchPrerequisiteForm = new FormGroup({
			sequence: new FormControl(this.batchPrerequisite.sequence, {
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
			description: new FormControl('', {
				validators: [
					Validators.minLength(1),
					Validators.maxLength(100)
				]
			})
		})
		return batchPrerequisiteForm;
	}

	editBatchPrerequisiteForm():FormGroup {
		this.currentBatch = this.batchPrerequisite.batch;
		let batchPrerequisiteForm = new FormGroup({
			sequence: new FormControl(this.batchPrerequisite.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(2000)
			]), 
			batch: new FormControl(this.batchPrerequisite.batch, [
			]), 
			description: new FormControl(this.batchPrerequisite.description, [
				Validators.minLength(1),
				Validators.maxLength(100)
			])
		})
		return batchPrerequisiteForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.batchPrerequisiteForm.controls[controlName].hasError(errorName);
	}

	public save(batchPrerequisite:BatchPrerequisite) {
		if (this.batchPrerequisite.id === 0) {
			this.batchPrerequisiteService.save(batchPrerequisite).subscribe((batchPrerequisites) => {
				this.modalController.dismiss({ 'dismissed': true, 'batchPrerequisites':batchPrerequisites });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			batchPrerequisite.id = this.batchPrerequisite.id;
			this.batchPrerequisiteService.update(batchPrerequisite.id, batchPrerequisite).subscribe((batchPrerequisites) => {
				this.modalController.dismiss({ 'dismissed': true, 'batchPrerequisites':batchPrerequisites });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
