import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { BatchScholar } from '../../models/program/batch-scholar';

@Injectable({
  providedIn: 'root'
})
export class BatchScholarService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<BatchScholar[]> {
		return this.http.get<BatchScholar[]>(
			environment.apiEndpoint + '/batchscholars')
	}

	findById(id:number):Observable<BatchScholar> {
		return this.http.get<BatchScholar>(
			environment.apiEndpoint + '/batchscholars/' + id)
	}

	findByBatchId(id:number):Observable<BatchScholar[]> {
		return this.http.get<BatchScholar[]>(
			environment.apiEndpoint + '/batchscholarslist/batch/' + id)
	}

	findByScholarId(id:number):Observable<BatchScholar[]> {
		return this.http.get<BatchScholar[]>(
			environment.apiEndpoint + '/batchscholarslist/scholar/' + id)
	}

	findAllByLookup():Observable<BatchScholar[]> {
		return this.http.get<BatchScholar[]>(
			environment.apiEndpoint + '/batchscholarslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<BatchScholar[]> {
		return this.http.get<BatchScholar[]>(
			environment.apiEndpoint + '/batchscholarslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<BatchScholar[]> {
		return this.http.get<BatchScholar[]>(
			environment.apiEndpoint + '/batchscholarslist/createdbyorganizationid/' + id)
	}

	save(batchscholar:BatchScholar):Observable<BatchScholar[]> {
		return this.http.post<BatchScholar[]>(
			environment.apiEndpoint + '/batchscholars', batchscholar);
	}

	saveBatchScholar(batchscholar:BatchScholar):Observable<BatchScholar> {
		return this.http.post<BatchScholar>(
			environment.apiEndpoint + '/batchscholars/storebatchscholar', batchscholar);
	}

	update(id:number, batchscholar:BatchScholar):Observable<BatchScholar[]> {
		return this.http.put<BatchScholar[]>(
			environment.apiEndpoint + '/batchscholars/' + id, batchscholar);
	}

	delete(batchscholar:BatchScholar):Observable<BatchScholar[]> {
		if (batchscholar.options != undefined && batchscholar.options["masterDetail"] == "Batch") {
			return this.http.delete<BatchScholar[]>(
				environment.apiEndpoint + '/batchscholars/' + batchscholar.id + "?masterDetail=Batch&batch_id=" + batchscholar.batch.id);
		} else {
			return this.http.delete<BatchScholar[]>(
				environment.apiEndpoint + '/batchscholars/' + batchscholar.id);
		}
	}

}
