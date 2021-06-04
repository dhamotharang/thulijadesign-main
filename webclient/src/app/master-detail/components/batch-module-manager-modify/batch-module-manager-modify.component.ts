import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

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
	public batches:Batch[];
	public currentBatch:Batch;
	public errorMessage:string;

	compareBatch = (currentbatch: Batch, batch: Batch) => currentbatch.id == batch.id;
	
	constructor(private batchModuleService:BatchModuleService,
		private batchService:BatchService,
		private dialogRef: MatDialogRef<BatchModuleManagerModifyComponent>,
		@Inject(MAT_DIALOG_DATA) public batchModule:BatchModule) {
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
			sequence: new FormControl('', {
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

	private validateAllFormFields(formGroup: FormGroup) {
		Object.keys(formGroup.controls).forEach(field => {
			const control = formGroup.get(field);
			if (control instanceof FormControl) {
				control.markAsTouched({ onlySelf: true });
			} else if (control instanceof FormGroup) {
				this.validateAllFormFields(control);
			}
		});
	}

	public save(batchModule:BatchModule) {
		batchModule.batch = this.batchModule.batch;
		batchModule.options = this.batchModule.options;
		if (this.batchModuleForm.valid) {
			if (this.batchModule.id === 0) {
				this.batchModuleService.save(batchModule).subscribe((batchModules) => {
					this.dialogRef.close(batchModules);
				}, (error) => {
					this.errorMessage = error.message;
				})
			} else {
				batchModule.id = this.batchModule.id;
				this.batchModuleService.update(batchModule.id, batchModule).subscribe((batchModules) => {
					this.dialogRef.close(batchModules);
				}, (error) => {
					this.errorMessage = error.message;
				})
			}
		} else {
			this.validateAllFormFields(this.batchModuleForm);
		}
	}

	public onCancel() {
		this.dialogRef.close();
	}

}
