import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { FieldStudy } from '../../models/general/field-study';

@Injectable({
  providedIn: 'root'
})
export class FieldStudyService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<FieldStudy[]> {
		return this.http.get<FieldStudy[]>(
			environment.apiEndpoint + '/fieldstudies')
	}

	findById(id:number):Observable<FieldStudy> {
		return this.http.get<FieldStudy>(
			environment.apiEndpoint + '/fieldstudies/' + id)
	}

	findAllByName(name:string):Observable<FieldStudy[]> {
		return this.http.get<FieldStudy[]>(
			environment.apiEndpoint + '/fieldstudieslist/name/' + name);
	}

	findAllByLookup():Observable<FieldStudy[]> {
		return this.http.get<FieldStudy[]>(
			environment.apiEndpoint + '/fieldstudieslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<FieldStudy[]> {
		return this.http.get<FieldStudy[]>(
			environment.apiEndpoint + '/fieldstudieslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<FieldStudy[]> {
		return this.http.get<FieldStudy[]>(
			environment.apiEndpoint + '/fieldstudieslist/createdbyorganizationid/' + id)
	}

	save(fieldstudy:FieldStudy):Observable<FieldStudy[]> {
		return this.http.post<FieldStudy[]>(
			environment.apiEndpoint + '/fieldstudies', fieldstudy);
	}

	saveFieldStudy(fieldstudy:FieldStudy):Observable<FieldStudy> {
		return this.http.post<FieldStudy>(
			environment.apiEndpoint + '/fieldstudies/storefieldstudy', fieldstudy);
	}

	update(id:number, fieldstudy:FieldStudy):Observable<FieldStudy[]> {
		return this.http.put<FieldStudy[]>(
			environment.apiEndpoint + '/fieldstudies/' + id, fieldstudy);
	}

	delete(fieldstudy:FieldStudy):Observable<FieldStudy[]> {
		return this.http.delete<FieldStudy[]>(
			environment.apiEndpoint + '/fieldstudies/' + fieldstudy.id);
	}

}
