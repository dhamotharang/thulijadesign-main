import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { UserGroup } from '../../models/core/user-group';

@Injectable({
  providedIn: 'root'
})
export class UserGroupService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<UserGroup[]> {
		return this.http.get<UserGroup[]>(
			environment.apiEndpoint + '/usergroups')
	}

	findById(id:number):Observable<UserGroup> {
		return this.http.get<UserGroup>(
			environment.apiEndpoint + '/usergroups/' + id)
	}

	findByGroupId(id:number):Observable<UserGroup[]> {
		return this.http.get<UserGroup[]>(
			environment.apiEndpoint + '/usergroupslist/group/' + id)
	}

	findByUserId(id:number):Observable<UserGroup[]> {
		return this.http.get<UserGroup[]>(
			environment.apiEndpoint + '/usergroupslist/user/' + id)
	}

	findAllByCreatedById(id:number):Observable<UserGroup[]> {
		return this.http.get<UserGroup[]>(
			environment.apiEndpoint + '/usergroupslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<UserGroup[]> {
		return this.http.get<UserGroup[]>(
			environment.apiEndpoint + '/usergroupslist/createdbyorganizationid/' + id)
	}

	save(usergroup:UserGroup):Observable<UserGroup[]> {
		return this.http.post<UserGroup[]>(
			environment.apiEndpoint + '/usergroups', usergroup);
	}

	saveUserGroup(usergroup:UserGroup):Observable<UserGroup> {
		return this.http.post<UserGroup>(
			environment.apiEndpoint + '/usergroups/storeusergroup', usergroup);
	}

	update(id:number, usergroup:UserGroup):Observable<UserGroup[]> {
		return this.http.put<UserGroup[]>(
			environment.apiEndpoint + '/usergroups/' + id, usergroup);
	}

	delete(usergroup:UserGroup):Observable<UserGroup[]> {
		return this.http.delete<UserGroup[]>(
			environment.apiEndpoint + '/usergroups/' + usergroup.id);
	}

}
