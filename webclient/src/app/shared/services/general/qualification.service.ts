import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { Qualification } from '../../models/general/qualification';

@Injectable({
  providedIn: 'root'
})
export class QualificationService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<Qualification[]> {
		return this.http.get<Qualification[]>(
			environment.apiEndpoint + '/qualifications')
	}

	findById(id:number):Observable<Qualification> {
		return this.http.get<Qualification>(
			environment.apiEndpoint + '/qualifications/' + id)
	}

	findAllByName(name:string):Observable<Qualification[]> {
		return this.http.get<Qualification[]>(
			environment.apiEndpoint + '/qualificationslist/name/' + name);
	}

	findAllByLookup():Observable<Qualification[]> {
		return this.http.get<Qualification[]>(
			environment.apiEndpoint + '/qualificationslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<Qualification[]> {
		return this.http.get<Qualification[]>(
			environment.apiEndpoint + '/qualificationslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<Qualification[]> {
		return this.http.get<Qualification[]>(
			environment.apiEndpoint + '/qualificationslist/createdbyorganizationid/' + id)
	}

	save(qualification:Qualification):Observable<Qualification[]> {
		return this.http.post<Qualification[]>(
			environment.apiEndpoint + '/qualifications', qualification);
	}

	saveQualification(qualification:Qualification):Observable<Qualification> {
		return this.http.post<Qualification>(
			environment.apiEndpoint + '/qualifications/storequalification', qualification);
	}

	update(id:number, qualification:Qualification):Observable<Qualification[]> {
		return this.http.put<Qualification[]>(
			environment.apiEndpoint + '/qualifications/' + id, qualification);
	}

	delete(qualification:Qualification):Observable<Qualification[]> {
		return this.http.delete<Qualification[]>(
			environment.apiEndpoint + '/qualifications/' + qualification.id);
	}

}
