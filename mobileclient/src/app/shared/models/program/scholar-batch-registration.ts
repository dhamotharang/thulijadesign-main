import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Batch } from '../../../shared/models/program/batch';
import { BatchScholar } from '../../../shared/models/program/batch-scholar';
import { BatchPrerequisite } from '../../../shared/models/program/batch-prerequisite';

export class ScholarBatchRegistration {

	public options:{} = {};

    constructor(public id?:number, 
		public batch?:Batch,
		public batchScholar?:BatchScholar,
		public batchPrerequisite?:BatchPrerequisite,
		public response?:boolean,
		public attachment?:string,
		public remarks?:string) {
	}

	asFormGroup(): FormGroup {
		const formGroup = new FormGroup({
			id:new FormControl(this.id, [
			]),
			batch: new FormControl(this.batch, [
			]),
			batchScholar: new FormControl(this.batchScholar, [
			]),
			batchPrerequisite: new FormControl(this.batchPrerequisite, [
			]),
			response: new FormControl(this.response),
			attachment: new FormControl(this.attachment, [
				Validators.minLength(1),
				Validators.maxLength(250)
			]),
			remarks: new FormControl(this.remarks, [
				Validators.minLength(1),
				Validators.maxLength(500)
			])
		});
		return formGroup;
	}

}