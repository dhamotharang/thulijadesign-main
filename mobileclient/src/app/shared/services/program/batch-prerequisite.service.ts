import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { BatchPrerequisite } from '../../models/program/batch-prerequisite';

@Injectable({
  providedIn: 'root'
})
export class BatchPrerequisiteService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<BatchPrerequisite[]> {
		return this.http.get<BatchPrerequisite[]>(
			environment.apiEndpoint + '/batchprerequisites')
	}

	findById(id:number):Observable<BatchPrerequisite> {
		return this.http.get<BatchPrerequisite>(
			environment.apiEndpoint + '/batchprerequisites/' + id)
	}

	findByBatchId(id:number):Observable<BatchPrerequisite[]> {
		return this.http.get<BatchPrerequisite[]>(
			environment.apiEndpoint + '/batchprerequisiteslist/batch/' + id)
	}

	findAllByLookup():Observable<BatchPrerequisite[]> {
		return this.http.get<BatchPrerequisite[]>(
			environment.apiEndpoint + '/batchprerequisiteslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<BatchPrerequisite[]> {
		return this.http.get<BatchPrerequisite[]>(
			environment.apiEndpoint + '/batchprerequisiteslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<BatchPrerequisite[]> {
		return this.http.get<BatchPrerequisite[]>(
			environment.apiEndpoint + '/batchprerequisiteslist/createdbyorganizationid/' + id)
	}

	save(batchprerequisite:BatchPrerequisite):Observable<BatchPrerequisite[]> {
		return this.http.post<BatchPrerequisite[]>(
			environment.apiEndpoint + '/batchprerequisites', batchprerequisite);
	}

	saveBatchPrerequisite(batchprerequisite:BatchPrerequisite):Observable<BatchPrerequisite> {
		return this.http.post<BatchPrerequisite>(
			environment.apiEndpoint + '/batchprerequisites/storebatchprerequisite', batchprerequisite);
	}

	update(id:number, batchprerequisite:BatchPrerequisite):Observable<BatchPrerequisite[]> {
		return this.http.put<BatchPrerequisite[]>(
			environment.apiEndpoint + '/batchprerequisites/' + id, batchprerequisite);
	}

	delete(batchprerequisite:BatchPrerequisite):Observable<BatchPrerequisite[]> {
		if (batchprerequisite.options != undefined && batchprerequisite.options["masterDetail"] == "Batch") {
			return this.http.delete<BatchPrerequisite[]>(
				environment.apiEndpoint + '/batchprerequisites/' + batchprerequisite.id + "?masterDetail=Batch&batch_id=" + batchprerequisite.batch.id);
		} else {
			return this.http.delete<BatchPrerequisite[]>(
				environment.apiEndpoint + '/batchprerequisites/' + batchprerequisite.id);
		}
	}

}
