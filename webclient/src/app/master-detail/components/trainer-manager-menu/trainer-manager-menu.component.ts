import { Component, OnInit } from '@angular/core';

import { Trainer } from '../../../shared/models/trainer/trainer';
import { TrainerService } from '../../../shared/services/trainer/trainer.service';
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
	selector: 'app-trainer-manager-menu',
	templateUrl: './trainer-manager-menu.component.html',
	styleUrls: ['./trainer-manager-menu.component.css']
})
export class TrainerManagerMenuComponent implements OnInit {

	public trainer:Trainer;
	public trainerId:number;

	constructor(private router:Router, private route: ActivatedRoute, 
		private trainerService:TrainerService) {
	}

	ngOnInit() {
		this.route.paramMap.subscribe((params:ParamMap) => {
			this.trainerId = +params.get('id');
			this.trainerService.findById(this.trainerId).subscribe((trainer:Trainer) => {
				this.trainer = trainer;
			})
		});
	}

	back() {
		this.router.navigate(['/masterdetail/trainers']);
	}

}
