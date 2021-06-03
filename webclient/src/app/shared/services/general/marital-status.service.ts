import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { MaritalStatus } from '../../models/general/marital-status';

@Injectable({
  providedIn: 'root'
})
export class MaritalStatusService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<MaritalStatus[]> {
		return this.http.get<MaritalStatus[]>(
			environment.apiEndpoint + '/maritalstatuses')
	}

	findById(id:number):Observable<MaritalStatus> {
		return this.http.get<MaritalStatus>(
			environment.apiEndpoint + '/maritalstatuses/' + id)
	}

	findAllByName(name:string):Observable<MaritalStatus[]> {
		return this.http.get<MaritalStatus[]>(
			environment.apiEndpoint + '/maritalstatuseslist/name/' + name);
	}

	findAllByLookup():Observable<MaritalStatus[]> {
		return this.http.get<MaritalStatus[]>(
			environment.apiEndpoint + '/maritalstatuseslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<MaritalStatus[]> {
		return this.http.get<MaritalStatus[]>(
			environment.apiEndpoint + '/maritalstatuseslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<MaritalStatus[]> {
		return this.http.get<MaritalStatus[]>(
			environment.apiEndpoint + '/maritalstatuseslist/createdbyorganizationid/' + id)
	}

	save(maritalstatus:MaritalStatus):Observable<MaritalStatus[]> {
		return this.http.post<MaritalStatus[]>(
			environment.apiEndpoint + '/maritalstatuses', maritalstatus);
	}

	saveMaritalStatus(maritalstatus:MaritalStatus):Observable<MaritalStatus> {
		return this.http.post<MaritalStatus>(
			environment.apiEndpoint + '/maritalstatuses/storemaritalstatus', maritalstatus);
	}

	update(id:number, maritalstatus:MaritalStatus):Observable<MaritalStatus[]> {
		return this.http.put<MaritalStatus[]>(
			environment.apiEndpoint + '/maritalstatuses/' + id, maritalstatus);
	}

	delete(maritalstatus:MaritalStatus):Observable<MaritalStatus[]> {
		return this.http.delete<MaritalStatus[]>(
			environment.apiEndpoint + '/maritalstatuses/' + maritalstatus.id);
	}

}
