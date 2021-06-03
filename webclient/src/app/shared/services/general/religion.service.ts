import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { Religion } from '../../models/general/religion';

@Injectable({
  providedIn: 'root'
})
export class ReligionService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<Religion[]> {
		return this.http.get<Religion[]>(
			environment.apiEndpoint + '/religions')
	}

	findById(id:number):Observable<Religion> {
		return this.http.get<Religion>(
			environment.apiEndpoint + '/religions/' + id)
	}

	findAllByName(name:string):Observable<Religion[]> {
		return this.http.get<Religion[]>(
			environment.apiEndpoint + '/religionslist/name/' + name);
	}

	findAllByLookup():Observable<Religion[]> {
		return this.http.get<Religion[]>(
			environment.apiEndpoint + '/religionslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<Religion[]> {
		return this.http.get<Religion[]>(
			environment.apiEndpoint + '/religionslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<Religion[]> {
		return this.http.get<Religion[]>(
			environment.apiEndpoint + '/religionslist/createdbyorganizationid/' + id)
	}

	save(religion:Religion):Observable<Religion[]> {
		return this.http.post<Religion[]>(
			environment.apiEndpoint + '/religions', religion);
	}

	saveReligion(religion:Religion):Observable<Religion> {
		return this.http.post<Religion>(
			environment.apiEndpoint + '/religions/storereligion', religion);
	}

	update(id:number, religion:Religion):Observable<Religion[]> {
		return this.http.put<Religion[]>(
			environment.apiEndpoint + '/religions/' + id, religion);
	}

	delete(religion:Religion):Observable<Religion[]> {
		return this.http.delete<Religion[]>(
			environment.apiEndpoint + '/religions/' + religion.id);
	}

}
