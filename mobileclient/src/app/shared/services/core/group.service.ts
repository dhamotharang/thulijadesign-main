import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { Group } from '../../models/core/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<Group[]> {
		return this.http.get<Group[]>(
			environment.apiEndpoint + '/groups')
	}

	findById(id:number):Observable<Group> {
		return this.http.get<Group>(
			environment.apiEndpoint + '/groups/' + id)
	}

	findAllByName(name:string):Observable<Group[]> {
		return this.http.get<Group[]>(
			environment.apiEndpoint + '/groupslist/name/' + name);
	}

	findAllByLookup():Observable<Group[]> {
		return this.http.get<Group[]>(
			environment.apiEndpoint + '/groupslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<Group[]> {
		return this.http.get<Group[]>(
			environment.apiEndpoint + '/groupslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<Group[]> {
		return this.http.get<Group[]>(
			environment.apiEndpoint + '/groupslist/createdbyorganizationid/' + id)
	}

	save(group:Group):Observable<Group[]> {
		return this.http.post<Group[]>(
			environment.apiEndpoint + '/groups', group);
	}

	saveGroup(group:Group):Observable<Group> {
		return this.http.post<Group>(
			environment.apiEndpoint + '/groups/storegroup', group);
	}

	update(id:number, group:Group):Observable<Group[]> {
		return this.http.put<Group[]>(
			environment.apiEndpoint + '/groups/' + id, group);
	}

	delete(group:Group):Observable<Group[]> {
		return this.http.delete<Group[]>(
			environment.apiEndpoint + '/groups/' + group.id);
	}

}
