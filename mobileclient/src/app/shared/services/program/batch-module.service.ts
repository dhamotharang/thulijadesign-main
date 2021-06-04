import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { BatchModule } from '../../models/program/batch-module';

@Injectable({
  providedIn: 'root'
})
export class BatchModuleService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<BatchModule[]> {
		return this.http.get<BatchModule[]>(
			environment.apiEndpoint + '/batchmodules')
	}

	findById(id:number):Observable<BatchModule> {
		return this.http.get<BatchModule>(
			environment.apiEndpoint + '/batchmodules/' + id)
	}

	findByBatchId(id:number):Observable<BatchModule[]> {
		return this.http.get<BatchModule[]>(
			environment.apiEndpoint + '/batchmoduleslist/batch/' + id)
	}

	findAllByName(name:string):Observable<BatchModule[]> {
		return this.http.get<BatchModule[]>(
			environment.apiEndpoint + '/batchmoduleslist/name/' + name);
	}

	findAllByLookup():Observable<BatchModule[]> {
		return this.http.get<BatchModule[]>(
			environment.apiEndpoint + '/batchmoduleslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<BatchModule[]> {
		return this.http.get<BatchModule[]>(
			environment.apiEndpoint + '/batchmoduleslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<BatchModule[]> {
		return this.http.get<BatchModule[]>(
			environment.apiEndpoint + '/batchmoduleslist/createdbyorganizationid/' + id)
	}

	save(batchmodule:BatchModule):Observable<BatchModule[]> {
		return this.http.post<BatchModule[]>(
			environment.apiEndpoint + '/batchmodules', batchmodule);
	}

	saveBatchModule(batchmodule:BatchModule):Observable<BatchModule> {
		return this.http.post<BatchModule>(
			environment.apiEndpoint + '/batchmodules/storebatchmodule', batchmodule);
	}

	update(id:number, batchmodule:BatchModule):Observable<BatchModule[]> {
		return this.http.put<BatchModule[]>(
			environment.apiEndpoint + '/batchmodules/' + id, batchmodule);
	}

	delete(batchmodule:BatchModule):Observable<BatchModule[]> {
		if (batchmodule.options != undefined && batchmodule.options["masterDetail"] == "Batch") {
			return this.http.delete<BatchModule[]>(
				environment.apiEndpoint + '/batchmodules/' + batchmodule.id + "?masterDetail=Batch&batch_id=" + batchmodule.batch.id);
		} else {
			return this.http.delete<BatchModule[]>(
				environment.apiEndpoint + '/batchmodules/' + batchmodule.id);
		}
	}

}
