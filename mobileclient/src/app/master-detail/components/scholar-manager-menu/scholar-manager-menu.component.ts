import { Component, OnInit } from '@angular/core';

import { Scholar } from '../../../shared/models/scholar/scholar';
import { ScholarService } from '../../../shared/services/scholar/scholar.service';
import { Salutation } from '../../../shared/models/general/salutation';
import { SalutationService } from '../../../shared/services/general/salutation.service';
import { Gender } from '../../../shared/models/general/gender';
import { GenderService } from '../../../shared/services/general/gender.service';
import { Citizen } from '../../../shared/models/general/citizen';
import { CitizenService } from '../../../shared/services/general/citizen.service';
import { Department } from '../../../shared/models/core/department';
import { DepartmentService } from '../../../shared/services/core/department.service';
import { Branch } from '../../../shared/models/core/branch';
import { BranchService } from '../../../shared/services/core/branch.service';
import { Organization } from '../../../shared/models/core/organization';
import { OrganizationService } from '../../../shared/services/core/organization.service';
import { Status } from '../../../shared/models/core/status';
import { StatusService } from '../../../shared/services/core/status.service';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';

@Component({
	selector: 'app-scholar-manager-menu',
	templateUrl: './scholar-manager-menu.component.html',
	styleUrls: ['./scholar-manager-menu.component.css']
})
export class ScholarManagerMenuComponent implements OnInit {

	public scholar:Scholar;
	public scholarId:number;

	constructor(private router:Router, private route: ActivatedRoute, 
		private scholarService:ScholarService) {
	}

	ngOnInit() {
		this.route.paramMap.subscribe((params:ParamMap) => {
			this.scholarId = +params.get('id');
			this.scholarService.findById(this.scholarId).subscribe((scholar:Scholar) => {
				this.scholar = scholar;
			})
		});
	}

	back() {
		this.router.navigate(['/masterdetail/scholars']);
	}

}
