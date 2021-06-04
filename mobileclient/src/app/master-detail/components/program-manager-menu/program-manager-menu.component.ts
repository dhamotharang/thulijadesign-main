import { Component, OnInit } from '@angular/core';

import { Program } from '../../../shared/models/program/program';
import { ProgramService } from '../../../shared/services/program/program.service';
import { ProgramMaster } from '../../../shared/models/program/program-master';
import { ProgramMasterService } from '../../../shared/services/program/program-master.service';
import { TrainingDelivery } from '../../../shared/models/program/training-delivery';
import { TrainingDeliveryService } from '../../../shared/services/program/training-delivery.service';
import { TrainingMode } from '../../../shared/models/program/training-mode';
import { TrainingModeService } from '../../../shared/services/program/training-mode.service';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';

@Component({
	selector: 'app-program-manager-menu',
	templateUrl: './program-manager-menu.component.html',
	styleUrls: ['./program-manager-menu.component.css']
})
export class ProgramManagerMenuComponent implements OnInit {

	public program:Program;
	public programId:number;

	constructor(private router:Router, private route: ActivatedRoute, 
		private programService:ProgramService) {
	}

	ngOnInit() {
		this.route.paramMap.subscribe((params:ParamMap) => {
			this.programId = +params.get('id');
			this.programService.findById(this.programId).subscribe((program:Program) => {
				this.program = program;
			})
		});
	}

	back() {
		this.router.navigate(['/masterdetail/programs']);
	}

}
