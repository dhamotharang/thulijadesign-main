import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { Batch } from '../../models/program/batch';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<Batch[]> {
		return this.http.get<Batch[]>(
			environment.apiEndpoint + '/batches')
	}

	findById(id:number):Observable<Batch> {
		return this.http.get<Batch>(
			environment.apiEndpoint + '/batches/' + id)
	}

	findByProgramId(id:number):Observable<Batch[]> {
		return this.http.get<Batch[]>(
			environment.apiEndpoint + '/batcheslist/program/' + id)
	}

	findByCountryId(id:number):Observable<Batch[]> {
		return this.http.get<Batch[]>(
			environment.apiEndpoint + '/batcheslist/country/' + id)
	}

	findByStateId(id:number):Observable<Batch[]> {
		return this.http.get<Batch[]>(
			environment.apiEndpoint + '/batcheslist/state/' + id)
	}

	findAllByLookup():Observable<Batch[]> {
		return this.http.get<Batch[]>(
			environment.apiEndpoint + '/batcheslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<Batch[]> {
		return this.http.get<Batch[]>(
			environment.apiEndpoint + '/batcheslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<Batch[]> {
		return this.http.get<Batch[]>(
			environment.apiEndpoint + '/batcheslist/createdbyorganizationid/' + id)
	}

	save(batch:Batch):Observable<Batch[]> {
		return this.http.post<Batch[]>(
			environment.apiEndpoint + '/batches', batch);
	}

	saveBatch(batch:Batch):Observable<Batch> {
		return this.http.post<Batch>(
			environment.apiEndpoint + '/batches/storebatch', batch);
	}

	update(id:number, batch:Batch):Observable<Batch[]> {
		return this.http.put<Batch[]>(
			environment.apiEndpoint + '/batches/' + id, batch);
	}

	delete(batch:Batch):Observable<Batch[]> {
		if (batch.options != undefined && batch.options["masterDetail"] == "Program") {
			return this.http.delete<Batch[]>(
				environment.apiEndpoint + '/batches/' + batch.id + "?masterDetail=Program&program_id=" + batch.program.id);
		} else {
			return this.http.delete<Batch[]>(
				environment.apiEndpoint + '/batches/' + batch.id);
		}
	}

}
