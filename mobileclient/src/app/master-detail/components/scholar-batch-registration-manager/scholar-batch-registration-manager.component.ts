import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { ScholarBatchRegistration } from '../../../shared/models/program/scholar-batch-registration';
import { ScholarBatchRegistrationService } from '../../../shared/services/program/scholar-batch-registration.service';
import { Batch } from '../../../shared/models/program/batch';
import { BatchService } from '../../../shared/services/program/batch.service';
import { BatchScholar } from '../../../shared/models/program/batch-scholar';
import { BatchScholarService } from '../../../shared/services/program/batch-scholar.service';
import { BatchPrerequisite } from '../../../shared/models/program/batch-prerequisite';
import { BatchPrerequisiteService } from '../../../shared/services/program/batch-prerequisite.service';
import { Program } from '../../../shared/models/program/program';
import { ProgramService } from '../../../shared/services/program/program.service';

import { MultimediaDetail } from '../../../shared/models/multimedia-detail';
import { MediaService } from '../../../shared/services/builtin/media.service';
import { MultimediaPopupService } from '../../../shared/services/builtin/multimedia-popup.service';

@Component({
	selector: 'app-scholar-batch-registration-manager',
	templateUrl: './scholar-batch-registration-manager.component.html',
	styleUrls: ['./scholar-batch-registration-manager.component.css']
})
export class ScholarBatchRegistrationManagerComponent implements OnInit, OnDestroy {

	public program:Program;
	public programId:number;
	public batch:Batch;
	public batchId:number;
	public batchScholar:BatchScholar;
	public batchScholarId:number;
	public scholarBatchRegistration:ScholarBatchRegistration;
	public scholarBatchRegistrationId:number;

	public scholarBatchRegistrations:ScholarBatchRegistration[];
	public batchPrerequisites:BatchPrerequisite[];
	private masterSub:Subscription;
	private detailSub:Subscription;
	private listSub:Subscription;
	public scholarBatchRegistrationFormArray:FormArray;
	public scholarBatchRegistrationFormGroup:FormGroup;

	public multimediaDetail:MultimediaDetail;

	constructor(private programService:ProgramService,
		private batchService:BatchService,
		private batchScholarService:BatchScholarService,
		private scholarBatchRegistrationService:ScholarBatchRegistrationService,
		private batchPrerequisiteService:BatchPrerequisiteService,
		private mediaService:MediaService,
		private multimediaPopupService:MultimediaPopupService,
		private router:Router, private route: ActivatedRoute) {
	}
	
	ngOnInit() {
		this.route.parent.parent.parent.paramMap.subscribe((params:ParamMap) => {
			this.programId = +params.get('id');
			this.masterSub = this.programService.findById(this.programId).subscribe((program) => {
				this.program = program;
			});
		});
		this.route.parent.parent.paramMap.subscribe((params:ParamMap) => {
			this.batchId = +params.get('batchid');
			this.detailSub = this.batchService.findById(this.batchId).subscribe((batch) => {
				this.batch = batch;
			});
		});
		this.route.parent.paramMap.subscribe((params:ParamMap) => {
			this.batchScholarId = +params.get('batchscholarid');
			this.detailSub = this.batchScholarService.findById(this.batchScholarId).subscribe((batchScholar) => {
				this.batchScholar = batchScholar;
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
		this.listSub = this.scholarBatchRegistrationService.findByBatchScholarId(this.batchScholar.id).subscribe((scholarBatchRegistrations) => {
			this.listSub = this.batchPrerequisiteService.findByBatchId(this.batchScholar.batch.id).subscribe((batchPrerequisites) => {
				this.batchPrerequisites = batchPrerequisites;
				let localScholarBatchRegistrations:ScholarBatchRegistration[] = [];
				this.batchPrerequisites.forEach((batchPrerequisite:BatchPrerequisite) => {
					let currentScholarBatchRegistration:ScholarBatchRegistration = undefined;
					scholarBatchRegistrations.forEach((scholarBatchRegistration:ScholarBatchRegistration) => {
						if (scholarBatchRegistration.batchPrerequisite.id === batchPrerequisite.id) 
							currentScholarBatchRegistration = scholarBatchRegistration;
					})
					if (currentScholarBatchRegistration !== undefined) {
						localScholarBatchRegistrations.push(
							new ScholarBatchRegistration(currentScholarBatchRegistration.id, this.batch, this.batchScholar, batchPrerequisite, currentScholarBatchRegistration.response, currentScholarBatchRegistration.attachment, currentScholarBatchRegistration.remarks));
					} else {
						localScholarBatchRegistrations.push(
							new ScholarBatchRegistration(0, this.batch, this.batchScholar, batchPrerequisite, undefined, undefined, undefined));
					}
				})
				this.scholarBatchRegistrations = localScholarBatchRegistrations.slice();
				this.createScholarBatchRegistrationForm();
			})
		})
	}

	createScholarBatchRegistrationForm() {
		this.scholarBatchRegistrationFormArray = this.createUsingBatchPrerequisites();
		this.scholarBatchRegistrationFormGroup = 
			new FormGroup({ 'scholarBatchRegistrationForm':this.scholarBatchRegistrationFormArray });
	}

	createUsingBatchPrerequisites():FormArray {
		let scholarBatchRegistrationFormControls:FormArray = new FormArray([]);
		this.scholarBatchRegistrations.forEach((scholarBatchRegistration:ScholarBatchRegistration) => {
			let scholarBatchRegistrationFormGroup:FormGroup = scholarBatchRegistration.asFormGroup();
			scholarBatchRegistrationFormControls.push(scholarBatchRegistrationFormGroup);
		})
		return scholarBatchRegistrationFormControls;
	}

	save() {
		let index:number = 0;
		for (let formGroup of this.scholarBatchRegistrationFormArray.controls) {
			this.scholarBatchRegistrations[index].response = formGroup.get("response").value;
			this.scholarBatchRegistrations[index].remarks = formGroup.get("remarks").value;
			index = index + 1;
		}
		let formData:FormData = new FormData();
		this.scholarBatchRegistrations.forEach((scholarBatchRegistration:ScholarBatchRegistration, index:number) => {
			formData.append(index + "id", scholarBatchRegistration.id + "");
			formData.append(index + "batch", JSON.stringify(scholarBatchRegistration.batch));
			formData.append(index + "batchScholar", JSON.stringify(scholarBatchRegistration.batchScholar));
			formData.append(index + "batchPrerequisite", JSON.stringify(scholarBatchRegistration.batchPrerequisite));
			formData.append(index + "response", scholarBatchRegistration.response + "");
			formData.append(index + "attachment", scholarBatchRegistration.attachment);
			formData.append(index + "remarks", scholarBatchRegistration.remarks);
		})
		this.scholarBatchRegistrationService.saveAll(formData).subscribe(() => {
			this.list();
		});
	}

	public hasError = (index:number, controlName:string, errorName:string):boolean => {
		return this.scholarBatchRegistrationFormArray.controls[index]['controls'][controlName].hasError(errorName);
	}

	public uploadAttachment(event:any, attachment:any, index:number) {
		attachment.value = event.target.files[0].name;
		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();
			reader.onload = () => {
				this.scholarBatchRegistrations[index]["attachment"] = event.target.files[0];
			};
			reader.readAsDataURL(event.target.files[0]);
		}
	}

	public open(element:ScholarBatchRegistration) {
		let multimediaDetail:MultimediaDetail = this.mediaService.parse(element.attachment);
		const ref = this.multimediaPopupService.open(multimediaDetail);
		ref.afterClosed$.subscribe(res => {
			let response = res.data;
		});
	}

}