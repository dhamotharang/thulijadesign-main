import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';

import { BatchContent } from '../../../shared/models/program/batch-content';
import { BatchContentService } from '../../../shared/services/program/batch-content.service';
import { Batch } from '../../../shared/models/program/batch';
import { BatchService } from '../../../shared/services/program/batch.service';
import { BatchModule } from '../../../shared/models/program/batch-module';
import { BatchModuleService } from '../../../shared/services/program/batch-module.service';
import { Program } from '../../../shared/models/program/program';
import { ProgramService } from '../../../shared/services/program/program.service';

import { MultimediaDetail } from '../../../shared/models/multimedia-detail';
import { MediaService } from '../../../shared/services/builtin/media.service';
import { MultimediaPopupService } from '../../../shared/services/builtin/multimedia-popup.service';
import { BatchContentManagerModifyComponent } from '../batch-content-manager-modify/batch-content-manager-modify.component';
import { SystemDeleteConfirmationComponent } from '../system-delete-confirmation/system-delete-confirmation.component';

@Component({
	selector: 'app-batch-content-manager',
	templateUrl: './batch-content-manager.component.html',
	styleUrls: ['./batch-content-manager.component.css']
})
export class BatchContentManagerComponent implements OnInit, OnDestroy {

	public program:Program;
	public programId:number;
	public batch:Batch;
	public batchId:number;
	public batchContent:BatchContent;
	public batchContentId:number;

	public batchContents:(BatchModule | BatchContent)[];
	private masterSub:Subscription;
	private detailSub:Subscription;
	private listSub:Subscription;
	public columnCaptions:string[];
	public errorMessage:string;

	public multimediaDetail:MultimediaDetail;

	constructor(private programService:ProgramService,
		private batchService:BatchService,
		private batchContentService:BatchContentService,
		private mediaService:MediaService,
		private multimediaPopupService:MultimediaPopupService,
		private router:Router, private route: ActivatedRoute, 
		private dialog: MatDialog) {
			this.columnCaptions = [
				'sequence',
				'name',
				'description',
				'contentUrl',
				'action'
			];
	}
	
	ngOnInit() {
		this.route.parent.paramMap.subscribe((params:ParamMap) => {
			this.programId = +params.get('id');
			this.masterSub = this.programService.findById(this.programId).subscribe((program) => {
				this.program = program;
			});
		});
		this.route.parent.paramMap.subscribe((params:ParamMap) => {
			this.batchId = +params.get('batchid');
			this.detailSub = this.batchService.findById(this.batchId).subscribe((batch) => {
				this.batch = batch;
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
		this.listSub = this.batchContentService.findByBatchId(this.batch.id).subscribe((batchContents) => {
			this.batchContents = batchContents;
			this.batchContents.forEach((batchContent:BatchContent) => {
				let mediaInformation = this.mediaService.parse(batchContent.contentUrl);
				batchContent.contentUrlImageUrl = mediaInformation.mediaImageUrl;
			})
			let batchModuleIds = new Set(this.batchContents.map((item:BatchContent) => item.batchModule.id))
			let results:(BatchModule | BatchContent)[] = [];
			batchModuleIds.forEach((batchModuleId) => {
				let currentBatchContents:BatchContent[] = 
					this.batchContents.filter((batchContent:BatchContent) => batchContent.batchModule.id == batchModuleId);
				if (currentBatchContents.length > 0) {
					let currentBatchModule:BatchModule = currentBatchContents[0].batchModule;
					results.push(currentBatchModule);
					results.push(...currentBatchContents);
				}
			})
			this.batchContents = results;
		})
	}

	isGroup(index:number, item:any): boolean{
		return !(item.id !== undefined
			&& item.sequence !== undefined
			&& item.batch !== undefined
			&& item.batchModule !== undefined
			&& item.name !== undefined
			&& item.description !== undefined
			&& item.contentUrl !== undefined
		)
	}

	add() {
		let sequence:number = 1;
		if (this.batchContents !== undefined && this.batchContents.length > 0) {
			sequence = +this.batchContents[this.batchContents.length - 1].sequence;
		}
		let element = new BatchContent(0, undefined, this.batch, undefined, undefined, undefined, undefined );
		element.options = { masterDetail: "Batch" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(BatchContentManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((batchContents) => {
			if (batchContents !== undefined) {
				this.batchContents = batchContents;
				this.batchContents.forEach((batchContent:BatchContent) => {
					let mediaInformation = this.mediaService.parse(batchContent.contentUrl);
					batchContent.contentUrlImageUrl = mediaInformation.mediaImageUrl;
				})
			}
		})
	}
	
	edit(element:BatchContent) {
		element.options = { masterDetail: "Batch" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		let dialogRef = this.dialog.open(BatchContentManagerModifyComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((batchContents) => {
			if (batchContents !== undefined) {
				this.batchContents = batchContents;
				this.batchContents.forEach((batchContent:BatchContent) => {
					let mediaInformation = this.mediaService.parse(batchContent.contentUrl);
					batchContent.contentUrlImageUrl = mediaInformation.mediaImageUrl;
				})
			}
		})
	}
	
	delete(element:BatchContent) {
		element.options = { masterDetail: "Program" };
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.disableClose = true;
		dialogConfig.data = element;
		dialogConfig.maxWidth = 800;
		const dialogRef = this.dialog.open(SystemDeleteConfirmationComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((data) => {
			if (data === true) {
				this.batchContentService.delete(element).subscribe((batchContents) => {
					if (batchContents !== undefined) {
						this.batchContents = batchContents;
						this.batchContents.forEach((batchContent:BatchContent) => {
							let mediaInformation = this.mediaService.parse(batchContent.contentUrl);
							batchContent.contentUrlImageUrl = mediaInformation.mediaImageUrl;
						})
					}
				});
			}
		});
	}
	
	showDetail(element:BatchContent) {
	}
	
	print(element:BatchContent) {
	}

	open(element:BatchContent) {
		let multimediaDetail:MultimediaDetail = this.mediaService.parse(element.contentUrl);
		const ref = this.multimediaPopupService.open(multimediaDetail);
		ref.afterClosed$.subscribe(res => {
			let response = res.data;
		});
	}

}
