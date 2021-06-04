import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { BatchContent } from '../../models/program/batch-content';

@Injectable({
  providedIn: 'root'
})
export class BatchContentService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<BatchContent[]> {
		return this.http.get<BatchContent[]>(
			environment.apiEndpoint + '/batchcontents')
	}

	findById(id:number):Observable<BatchContent> {
		return this.http.get<BatchContent>(
			environment.apiEndpoint + '/batchcontents/' + id)
	}

	findByBatchId(id:number):Observable<BatchContent[]> {
		return this.http.get<BatchContent[]>(
			environment.apiEndpoint + '/batchcontentslist/batch/' + id)
	}

	findByBatchModuleId(id:number):Observable<BatchContent[]> {
		return this.http.get<BatchContent[]>(
			environment.apiEndpoint + '/batchcontentslist/batchmodule/' + id)
	}

	findAllByName(name:string):Observable<BatchContent[]> {
		return this.http.get<BatchContent[]>(
			environment.apiEndpoint + '/batchcontentslist/name/' + name);
	}

	findAllByCreatedById(id:number):Observable<BatchContent[]> {
		return this.http.get<BatchContent[]>(
			environment.apiEndpoint + '/batchcontentslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<BatchContent[]> {
		return this.http.get<BatchContent[]>(
			environment.apiEndpoint + '/batchcontentslist/createdbyorganizationid/' + id)
	}

	save(batchcontent:FormData):Observable<BatchContent[]> {
		return this.http.post<BatchContent[]>(
			environment.apiEndpoint + '/batchcontents', batchcontent);
	}

	saveBatchContent(batchcontent:FormData):Observable<BatchContent> {
		return this.http.post<BatchContent>(
			environment.apiEndpoint + '/batchcontents/storebatchcontent', batchcontent);
	}

	update(id:number, batchcontent:FormData):Observable<BatchContent[]> {
		return this.http.post<BatchContent[]>(
			environment.apiEndpoint + '/batchcontents/' + id, batchcontent);
	}

	delete(batchcontent:BatchContent):Observable<BatchContent[]> {
		if (batchcontent.options != undefined && batchcontent.options["masterDetail"] == "Batch") {
			return this.http.delete<BatchContent[]>(
				environment.apiEndpoint + '/batchcontents/' + batchcontent.id + "?masterDetail=Batch&batch_id=" + batchcontent.batch.id);
		} else {
			return this.http.delete<BatchContent[]>(
				environment.apiEndpoint + '/batchcontents/' + batchcontent.id);
		}
	}

}
