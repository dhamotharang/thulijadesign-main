import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { BatchContent } from '../../../shared/models/program/batch-content';
import { BatchContentService } from '../../../shared/services/program/batch-content.service';
import { Batch } from '../../../shared/models/program/batch';
import { BatchService } from '../../../shared/services/program/batch.service';
import { BatchModule } from '../../../shared/models/program/batch-module';
import { BatchModuleService } from '../../../shared/services/program/batch-module.service';
import { BatchScholar } from '../../../shared/models/program/batch-scholar';
import { BatchScholarService } from '../../../shared/services/program/batch-scholar.service';
import { Scholar } from '../../../shared/models/scholar/scholar';
import { ScholarService } from '../../../shared/services/scholar/scholar.service';

import { MultimediaDetail } from '../../../shared/models/multimedia-detail';
import { MediaService } from '../../../shared/services/builtin/media.service';
import { User } from '../../../shared/models/core/user';
import { LogInService } from '../../../shared/services/builtin/log-in.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

interface ModuleContent {
    module: BatchModule;
    contents: BatchContent[];
}

@Component({
	selector: 'app-batch-content-player',
	templateUrl: './batch-content-player.component.html',
	styleUrls: ['./batch-content-player.component.css']
})
export class BatchContentPlayerComponent implements OnInit, OnDestroy {

	public batchContent:BatchContent;
	public batchScholar:BatchScholar;
	public scholar:Scholar;
	public batchModuleContents:ModuleContent[];

	private scholarSub:Subscription;
	private routeSub:Subscription;
	private batchScholarSub:Subscription;
	private contentSub:Subscription;

	public multimediaDetail:MultimediaDetail;
	public safeUrl:SafeUrl;

	constructor(private logInService:LogInService,
		private scholarService:ScholarService,
		private batchScholarService:BatchScholarService,
		private batchContentService:BatchContentService,
		private mediaService:MediaService,
		private route: ActivatedRoute, 
		private domSanitizer:DomSanitizer) {
	}
	
	ngOnInit() {
		this.logInService.loggedInUser.subscribe((user:User) => {
			this.scholarSub = this.scholarService.findByUserId(user.id).subscribe((scholars) => {
				this.scholar = scholars[0];
				this.routeSub = this.route.parent.paramMap.subscribe((params:ParamMap) => {
					let batchScholarId:number = +params.get('batchscholarid');
					this.batchScholarSub = this.batchScholarService.findById(batchScholarId).subscribe((batchScholar) => {
						this.batchScholar = batchScholar;
						if (this.batchScholar.scholar.id === this.scholar.id) this.list();
					});
				});		
			});
		});
	}
	
	ngOnDestroy() {
		if (this.scholarSub) {
			this.scholarSub.unsubscribe();
		}
		if (this.routeSub) {
			this.routeSub.unsubscribe();
		}
		if (this.batchScholarSub) {
			this.batchScholarSub.unsubscribe();
		}
		if (this.contentSub) {
			this.contentSub.unsubscribe();
		}
	}
	
	list() {
		this.contentSub = this.batchContentService.findByBatchId(this.batchScholar.batch.id).subscribe((batchContents) => {
			let batchModuleIds = new Set(batchContents.map((item:BatchContent) => item.batchModule.id))
			this.batchModuleContents = [];
			batchModuleIds.forEach((batchModuleId) => {
				let currentBatchContents:BatchContent[] = batchContents.filter(
					(batchContent:BatchContent) => batchContent.batchModule.id == batchModuleId);
				if (currentBatchContents.length > 0) {
					let currentBatchModule:BatchModule = currentBatchContents[0].batchModule;
					this.batchModuleContents.push({ "module":currentBatchModule, "contents":currentBatchContents })
				}
			})
			this.showDetail(this.batchModuleContents[0].contents[0]);
		})
	}

	showDetail(element:BatchContent) {
		this.multimediaDetail = this.mediaService.parse(element.contentUrl);
		if (this.multimediaDetail.mediaSource === "youtube" && this.multimediaDetail.mediaType === "video") {
			this.safeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
				"https://www.youtube.com/embed/" + this.multimediaDetail.mediaId + "?rel=0&autoplay=1");
		}
		if (this.multimediaDetail.mediaSource === "frompc" && this.multimediaDetail.mediaType === "pdf") {
			this.safeUrl = environment.apiEndpoint + "/download?relativepath=" + this.multimediaDetail.mediaUrl;
		}
	}

}
