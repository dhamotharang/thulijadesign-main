import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { Status } from '../../models/core/status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<Status[]> {
		return this.http.get<Status[]>(
			environment.apiEndpoint + '/statuses')
	}

	findById(id:number):Observable<Status> {
		return this.http.get<Status>(
			environment.apiEndpoint + '/statuses/' + id)
	}

	findByName(name:string):Observable<Status> {
		return this.http.get<Status>(
			environment.apiEndpoint + '/statuses/name/' + name)
	}

	findAllByName(name:string):Observable<Status[]> {
		return this.http.get<Status[]>(
			environment.apiEndpoint + '/statuseslist/name/' + name);
	}

	findAllByLookup():Observable<Status[]> {
		return this.http.get<Status[]>(
			environment.apiEndpoint + '/statuseslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<Status[]> {
		return this.http.get<Status[]>(
			environment.apiEndpoint + '/statuseslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<Status[]> {
		return this.http.get<Status[]>(
			environment.apiEndpoint + '/statuseslist/createdbyorganizationid/' + id)
	}

	save(status:Status):Observable<Status[]> {
		return this.http.post<Status[]>(
			environment.apiEndpoint + '/statuses', status);
	}

	saveStatus(status:Status):Observable<Status> {
		return this.http.post<Status>(
			environment.apiEndpoint + '/statuses/storestatus', status);
	}

	update(id:number, status:Status):Observable<Status[]> {
		return this.http.put<Status[]>(
			environment.apiEndpoint + '/statuses/' + id, status);
	}

	delete(status:Status):Observable<Status[]> {
		return this.http.delete<Status[]>(
			environment.apiEndpoint + '/statuses/' + status.id);
	}

}
