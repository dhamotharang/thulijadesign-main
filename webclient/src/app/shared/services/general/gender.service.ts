import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { Gender } from '../../models/general/gender';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<Gender[]> {
		return this.http.get<Gender[]>(
			environment.apiEndpoint + '/genders')
	}

	findById(id:number):Observable<Gender> {
		return this.http.get<Gender>(
			environment.apiEndpoint + '/genders/' + id)
	}

	findAllByName(name:string):Observable<Gender[]> {
		return this.http.get<Gender[]>(
			environment.apiEndpoint + '/genderslist/name/' + name);
	}

	findAllByLookup():Observable<Gender[]> {
		return this.http.get<Gender[]>(
			environment.apiEndpoint + '/genderslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<Gender[]> {
		return this.http.get<Gender[]>(
			environment.apiEndpoint + '/genderslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<Gender[]> {
		return this.http.get<Gender[]>(
			environment.apiEndpoint + '/genderslist/createdbyorganizationid/' + id)
	}

	save(gender:Gender):Observable<Gender[]> {
		return this.http.post<Gender[]>(
			environment.apiEndpoint + '/genders', gender);
	}

	saveGender(gender:Gender):Observable<Gender> {
		return this.http.post<Gender>(
			environment.apiEndpoint + '/genders/storegender', gender);
	}

	update(id:number, gender:Gender):Observable<Gender[]> {
		return this.http.put<Gender[]>(
			environment.apiEndpoint + '/genders/' + id, gender);
	}

	delete(gender:Gender):Observable<Gender[]> {
		return this.http.delete<Gender[]>(
			environment.apiEndpoint + '/genders/' + gender.id);
	}

}
