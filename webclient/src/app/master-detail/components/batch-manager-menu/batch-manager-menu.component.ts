import { Component, OnInit } from '@angular/core';

import { Batch } from '../../../shared/models/program/batch';
import { BatchService } from '../../../shared/services/program/batch.service';
import { Program } from '../../../shared/models/program/program';
import { ProgramService } from '../../../shared/services/program/program.service';
import { State } from '../../../shared/models/general/state';
import { StateService } from '../../../shared/services/general/state.service';
import { Country } from '../../../shared/models/general/country';
import { CountryService } from '../../../shared/services/general/country.service';
import { BatchContent } from '../../../shared/models/program/batch-content';
import { BatchContentService } from '../../../shared/services/program/batch-content.service';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';

@Component({
	selector: 'app-batch-manager-menu',
	templateUrl: './batch-manager-menu.component.html',
	styleUrls: ['./batch-manager-menu.component.css']
})
export class BatchManagerMenuComponent implements OnInit {

	public program:Program;
	public programId:number;
	public batch:Batch;
	public batchId:number;

	constructor(private router:Router, private route: ActivatedRoute, 
		private programService:ProgramService, 
		private batchContentService:BatchContentService,
		private batchService:BatchService) {
	}

	ngOnInit() {
		this.route.parent.paramMap.subscribe((params:ParamMap) => {
			this.programId = +params.get('id');
			this.programService.findById(this.programId).subscribe((program:Program) => {
				this.program = program;
			})
		});
		this.route.paramMap.subscribe((params:ParamMap) => {
			this.batchId = +params.get('batchid');
			this.batchService.findById(this.batchId).subscribe((batch:Batch) => {
				this.batch = batch;
			})			
		});
	}

	back() {
		this.router.navigate(['/masterdetail/batches']);
	}

}
