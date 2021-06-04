import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { BatchScholar } from '../../../shared/models/program/batch-scholar';
import { BatchScholarService } from '../../../shared/services/program/batch-scholar.service';
import { Scholar } from '../../../shared/models/scholar/scholar';
import { ScholarService } from '../../../shared/services/scholar/scholar.service';
import { Batch } from '../../../shared/models/program/batch';
import { BatchService } from '../../../shared/services/program/batch.service';
import { Program } from '../../../shared/models/program/program';
import { ProgramService } from '../../../shared/services/program/program.service';

@Component({
	selector: 'app-batch-scholar-manager-modify',
	templateUrl: './batch-scholar-manager-modify.component.html',
	styleUrls: ['./batch-scholar-manager-modify.component.css']
})
export class BatchScholarManagerModifyComponent implements OnInit {

	public batchScholarForm:FormGroup;
	public batchScholar:BatchScholar;
	public batches:Batch[];
	public currentBatch:Batch;
	public scholars:Scholar[];
	public currentScholar:Scholar;
	public filteredScholars: Observable<Scholar[]>;
	public errorMessage:string;

	compareBatch = (currentbatch: Batch, batch: Batch) => currentbatch.id == batch.id;

	compareScholar = (currentscholar: Scholar, scholar: Scholar) => currentscholar.id == scholar.id;

	constructor(private batchScholarService:BatchScholarService,
			private batchService:BatchService,
			private scholarService:ScholarService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.batchScholar = this.navParams.get('batchScholar');
		this.batchService.findAllByLookup().subscribe(batches => {
			this.batches = batches;
		})
		this.scholarService.findAllByLookup().subscribe(scholars => {
			this.scholars = scholars;
		})
	}

	ngOnInit() {
		if (this.batchScholar.id === 0) {
			this.batchScholarForm = this.createBatchScholarForm();
		} else {
			this.batchScholarForm = this.editBatchScholarForm();
		}
		this.filteredScholars = this.batchScholarForm.controls["scholar"].valueChanges
		.pipe(
			startWith(''),
			map(value => this._filterScholars(value))
		);
	}

	private _filterScholars(value: any): Scholar[] {
		if (value) {
			if (typeof value === "string") {
				if (this.scholars != undefined && this.scholars.length > 0)
					return this.scholars.filter(scholar => 
						scholar.user.firstName.toLowerCase().indexOf(value.toLowerCase()) === 0);
			}
		}
	}

	public displayScholar(scholar:Scholar):String {
		return scholar ? scholar.user.firstName + " " + scholar.user.lastName : undefined;
	}

	createBatchScholarForm():FormGroup {
		let batchScholarForm = new FormGroup({
			batch: new FormControl('', {
				validators: [
				]
			}),
			scholar: new FormControl('', {
				validators: [
				]
			})
		})
		return batchScholarForm;
	}

	editBatchScholarForm():FormGroup {
		this.currentBatch = this.batchScholar.batch;
		this.currentScholar = this.batchScholar.scholar;
		let batchScholarForm = new FormGroup({
			batch: new FormControl(this.batchScholar.batch, [
			]), 
			scholar: new FormControl(this.batchScholar.scholar, [
			])
		})
		return batchScholarForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.batchScholarForm.controls[controlName].hasError(errorName);
	}

	public save(batchScholar:BatchScholar) {
		batchScholar.batch = this.batchScholar.batch;
		batchScholar.options = this.batchScholar.options;
		if (this.batchScholar.id === 0) {
			this.batchScholarService.save(batchScholar).subscribe((batchScholars) => {
				this.modalController.dismiss({ 'dismissed': true, 'batchScholars':batchScholars });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			batchScholar.id = this.batchScholar.id;
			this.batchScholarService.update(batchScholar.id, batchScholar).subscribe((batchScholars) => {
				this.modalController.dismiss({ 'dismissed': true, 'batchScholars':batchScholars });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

}
