import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toTwentyFourHours, toTwelveHours } from '../../../shared/services/builtin/format-timepicker';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

import { BatchContent } from '../../../shared/models/program/batch-content';
import { BatchContentService } from '../../../shared/services/program/batch-content.service';
import { Batch } from '../../../shared/models/program/batch';
import { BatchService } from '../../../shared/services/program/batch.service';
import { BatchModule } from '../../../shared/models/program/batch-module';
import { BatchModuleService } from '../../../shared/services/program/batch-module.service';
import { Program } from '../../../shared/models/program/program';
import { ProgramService } from '../../../shared/services/program/program.service';
import { MediaService } from '../../../shared/services/builtin/media.service';

@Component({
	selector: 'app-batch-content-manager-modify',
	templateUrl: './batch-content-manager-modify.component.html',
	styleUrls: ['./batch-content-manager-modify.component.css']
})
export class BatchContentManagerModifyComponent implements OnInit {

	public batchContentForm:FormGroup;
	public batchContent:BatchContent;
	public batches:Batch[];
	public currentBatch:Batch;
	public batchModules:BatchModule[];
	public currentBatchModule:BatchModule;
	public contentUrlObject:any;
	public errorMessage:string;

	compareBatch = (currentbatch: Batch, batch: Batch) => currentbatch.id == batch.id;

	compareBatchModule = (currentbatchModule: BatchModule, batchModule: BatchModule) => currentbatchModule.id == batchModule.id;

	constructor(private batchContentService:BatchContentService,
			private batchService:BatchService,
			private batchModuleService:BatchModuleService,
			private mediaService:MediaService,
			private modalController: ModalController,
			private navParams: NavParams) {
		this.batchContent = this.navParams.get('batchContent');
		this.batchService.findAllByLookup().subscribe(batches => {
			this.batches = batches;
		})
		this.batchModuleService.findAllByLookup().subscribe(batchModules => {
			this.batchModules = batchModules;
		})
			if (this.batchContent.contentUrl)
				this.contentUrlObject = this.mediaService.parse(this.batchContent.contentUrl);
	}

	ngOnInit() {
		if (this.batchContent.id === 0) {
			this.batchContentForm = this.createBatchContentForm();
		} else {
			this.batchContentForm = this.editBatchContentForm();
		}
	}

	createBatchContentForm():FormGroup {
		let batchContentForm = new FormGroup({
			sequence: new FormControl(this.batchContent.sequence, {
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
			batchModule: new FormControl('', {
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
			}),
			contentUrlMediaType: new FormControl('', [
				Validators.required
			]),
			contentUrlMediaSource: new FormControl('', [
				Validators.required
			]),
			contentUrl: new FormControl('', {
				validators: [
					Validators.minLength(1),
					Validators.maxLength(300)
				]
			})
		})
		return batchContentForm;
	}

	editBatchContentForm():FormGroup {
		this.currentBatch = this.batchContent.batch;
		this.currentBatchModule = this.batchContent.batchModule;
		let batchContentForm = new FormGroup({
			sequence: new FormControl(this.batchContent.sequence, [
				Validators.required, 
				Validators.pattern("^[0-9]*$"),
				Validators.min(1),
				Validators.max(2000)
			]), 
			batch: new FormControl(this.batchContent.batch, [
			]), 
			batchModule: new FormControl(this.batchContent.batchModule, [
			]), 
			name: new FormControl(this.batchContent.name, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(120)
			]), 
			description: new FormControl(this.batchContent.description, [
				Validators.required, 
				Validators.minLength(1),
				Validators.maxLength(500)
			]), 
			contentUrlMediaType: new FormControl(this.contentUrlObject.mediaType, [
				Validators.required
			]),
			contentUrlMediaSource: new FormControl(this.contentUrlObject.mediaSource, [
				Validators.required
			]),
			contentUrl: new FormControl(this.contentUrlObject.mediaUrl, [
				Validators.minLength(1),
				Validators.maxLength(300)
			])
		})
		return batchContentForm;
	}

	public hasError = (controlName:string, errorName:string):boolean => {
		return this.batchContentForm.controls[controlName].hasError(errorName);
	}

	public save(batchContent:BatchContent) {
		batchContent.batch = this.batchContent.batch;
		
		let formData:FormData = new FormData();
		formData.append("id", batchContent.id + "");
		formData.append("sequence", batchContent.sequence + "");
		formData.append("batch", JSON.stringify(batchContent.batch));
		formData.append("batchModule", JSON.stringify(batchContent.batchModule));
		formData.append("name", batchContent.name);
		formData.append("description", batchContent.description);
		formData.append("contentUrl", batchContent.contentUrl + "");
		formData.append("contentUrlMediaType", this.batchContentForm.value.contentUrlMediaType);
		formData.append("contentUrlMediaSource", this.batchContentForm.value.contentUrlMediaSource);
		if (this.batchContent.id === 0) {
			batchContent.contentUrl = this.batchContentForm.controls["contentUrlMediaSource"].value + "-"
				+ this.batchContentForm.controls["contentUrlMediaType"].value + ":"
				+ this.batchContentForm.controls["contentUrl"].value;
			this.batchContentService.save(formData).subscribe((batchContents) => {
				this.modalController.dismiss({ 'dismissed': true, 'batchContents':batchContents });
			}, (error) => {
					this.errorMessage = error.message;
			})
		} else {
			batchContent.id = this.batchContent.id;
			batchContent.contentUrl = this.batchContentForm.controls["contentUrlMediaSource"].value + "-"
				+ this.batchContentForm.controls["contentUrlMediaType"].value + ":"
				+ this.batchContentForm.controls["contentUrl"].value;
			this.batchContentService.update(batchContent.id, batchContent).subscribe((batchContents) => {
				this.modalController.dismiss({ 'dismissed': true, 'batchContents':batchContents });
			}, (error) => {
					this.errorMessage = error.message;
			})
		}
	}

	public onCancel() {
		this.modalController.dismiss({ 'dismissed': true });
	}

	public uploadContentUrl(event:any, contentUrl:string) {
		this.batchContentForm.controls[contentUrl].setValue(event.target.files[0].name);
		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();
			reader.onload = () => {
				this.batchContent[contentUrl] = event.target.files[0];
			};
			reader.readAsDataURL(event.target.files[0]);
		}
	}

}
