import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { ScholarBatchRegistration } from '../../models/program/scholar-batch-registration';

@Injectable({
  providedIn: 'root'
})
export class ScholarBatchRegistrationService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<ScholarBatchRegistration[]> {
		return this.http.get<ScholarBatchRegistration[]>(
			environment.apiEndpoint + '/scholarbatchregistrations')
	}

	findById(id:number):Observable<ScholarBatchRegistration> {
		return this.http.get<ScholarBatchRegistration>(
			environment.apiEndpoint + '/scholarbatchregistrations/' + id)
	}

	findByBatchId(id:number):Observable<ScholarBatchRegistration[]> {
		return this.http.get<ScholarBatchRegistration[]>(
			environment.apiEndpoint + '/scholarbatchregistrationslist/batch/' + id)
	}

	findByBatchScholarId(id:number):Observable<ScholarBatchRegistration[]> {
		return this.http.get<ScholarBatchRegistration[]>(
			environment.apiEndpoint + '/scholarbatchregistrationslist/batchscholar/' + id)
	}

	findByBatchPrerequisiteId(id:number):Observable<ScholarBatchRegistration[]> {
		return this.http.get<ScholarBatchRegistration[]>(
			environment.apiEndpoint + '/scholarbatchregistrationslist/batchprerequisite/' + id)
	}

	findAllByCreatedById(id:number):Observable<ScholarBatchRegistration[]> {
		return this.http.get<ScholarBatchRegistration[]>(
			environment.apiEndpoint + '/scholarbatchregistrationslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<ScholarBatchRegistration[]> {
		return this.http.get<ScholarBatchRegistration[]>(
			environment.apiEndpoint + '/scholarbatchregistrationslist/createdbyorganizationid/' + id)
	}

	save(scholarbatchregistration:FormData):Observable<ScholarBatchRegistration[]> {
		return this.http.post<ScholarBatchRegistration[]>(
			environment.apiEndpoint + '/scholarbatchregistrations', scholarbatchregistration);
	}

	saveScholarBatchRegistration(scholarbatchregistration:FormData):Observable<ScholarBatchRegistration> {
		return this.http.post<ScholarBatchRegistration>(
			environment.apiEndpoint + '/scholarbatchregistrations/storescholarbatchregistration', scholarbatchregistration);
	}

	saveAll(scholarbatchregistrations:FormData):Observable<ScholarBatchRegistration[]> {
		return this.http.post<ScholarBatchRegistration[]>(
			environment.apiEndpoint + '/scholarbatchregistrations/all', scholarbatchregistrations);
	}

	update(id:number, scholarbatchregistration:ScholarBatchRegistration):Observable<ScholarBatchRegistration[]> {
		return this.http.put<ScholarBatchRegistration[]>(
			environment.apiEndpoint + '/scholarbatchregistrations/' + id, scholarbatchregistration);
	}

	delete(scholarbatchregistration:ScholarBatchRegistration):Observable<ScholarBatchRegistration[]> {
		if (scholarbatchregistration.options != undefined && scholarbatchregistration.options["masterDetail"] == "BatchScholar") {
			return this.http.delete<ScholarBatchRegistration[]>(
				environment.apiEndpoint + '/scholarbatchregistrations/' + scholarbatchregistration.id + "?masterDetail=BatchScholar&batchScholar_id=" + scholarbatchregistration.batchScholar.id);
		} else {
			return this.http.delete<ScholarBatchRegistration[]>(
				environment.apiEndpoint + '/scholarbatchregistrations/' + scholarbatchregistration.id);
		}
	}

}
