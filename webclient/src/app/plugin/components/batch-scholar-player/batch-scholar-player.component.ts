import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { BatchScholar } from '../../../shared/models/program/batch-scholar';
import { BatchScholarService } from '../../../shared/services/program/batch-scholar.service';
import { Scholar } from '../../../shared/models/scholar/scholar';
import { ScholarService } from '../../../shared/services/scholar/scholar.service';
import { Batch } from '../../../shared/models/program/batch';
import { BatchService } from '../../../shared/services/program/batch.service';

import { LogInService } from '../../../shared/services/builtin/log-in.service';
import { User } from '../../../shared/models/core/user';

@Component({
	selector: 'app-batch-scholar-player',
	templateUrl: './batch-scholar-player.component.html',
	styleUrls: ['./batch-scholar-player.component.css']
})
export class BatchScholarPlayerComponent implements OnInit, OnDestroy {

	public user:User;
	public scholar:Scholar;
	public batchScholar:BatchScholar;
	public batchScholars:BatchScholar[];
	private scholarSub:Subscription;
	private listSub:Subscription;
	public columnCaptions:string[];
	public errorMessage:string;

	constructor(private logInService:LogInService,
		private scholarService:ScholarService,
		private batchScholarService:BatchScholarService,
		private router:Router, private route: ActivatedRoute) {
			this.columnCaptions = [
				'program',
				'batch',
				'startDate',
				'endDate',
				'action'
			];
	}

	ngOnInit() {
		this.logInService.loggedInUser.subscribe((user:User) => {
			this.user = user;
			this.scholarSub = this.scholarService.findByUserId(this.user.id).subscribe((scholars) => {
				this.scholar = scholars[0];
				this.list();
			})
		});
	}
	
	ngOnDestroy() {
		if (this.scholarSub) {
			this.scholarSub.unsubscribe();
		}
		if (this.listSub) {
			this.listSub.unsubscribe();
		}
	}

	list() {
		this.listSub = this.batchScholarService.findByScholarId(this.scholar.id).subscribe((batchScholars) => {
			this.batchScholars = batchScholars;
		})
	}

	showDetail(element:BatchScholar) {
		this.router.navigate(['/plugin/batchscholarplayers', element.id]);
	}

}
