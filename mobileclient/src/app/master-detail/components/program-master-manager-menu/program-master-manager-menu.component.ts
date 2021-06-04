import { Component, OnInit } from '@angular/core';

import { ProgramMaster } from '../../../shared/models/program/program-master';
import { ProgramMasterService } from '../../../shared/services/program/program-master.service';
import { ProgramCategory } from '../../../shared/models/program/program-category';
import { ProgramCategoryService } from '../../../shared/services/program/program-category.service';
import { ProgramType } from '../../../shared/models/program/program-type';
import { ProgramTypeService } from '../../../shared/services/program/program-type.service';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';

@Component({
	selector: 'app-program-master-manager-menu',
	templateUrl: './program-master-manager-menu.component.html',
	styleUrls: ['./program-master-manager-menu.component.css']
})
export class ProgramMasterManagerMenuComponent implements OnInit {

	public programMaster:ProgramMaster;
	public programMasterId:number;

	constructor(private router:Router, private route: ActivatedRoute, 
		private programMasterService:ProgramMasterService) {
	}

	ngOnInit() {
		this.route.paramMap.subscribe((params:ParamMap) => {
			this.programMasterId = +params.get('id');
			this.programMasterService.findById(this.programMasterId).subscribe((programMaster:ProgramMaster) => {
				this.programMaster = programMaster;
			})
		});
	}

	back() {
		this.router.navigate(['/masterdetail/programmasters']);
	}

}
