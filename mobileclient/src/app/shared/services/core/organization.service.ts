import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { Organization } from '../../models/core/organization';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<Organization[]> {
		return this.http.get<Organization[]>(
			environment.apiEndpoint + '/organizations')
	}

	findById(id:number):Observable<Organization> {
		return this.http.get<Organization>(
			environment.apiEndpoint + '/organizations/' + id)
	}

	findByOrganizationTypeId(id:number):Observable<Organization[]> {
		return this.http.get<Organization[]>(
			environment.apiEndpoint + '/organizationslist/organizationtype/' + id)
	}

	findAllByName(name:string):Observable<Organization[]> {
		return this.http.get<Organization[]>(
			environment.apiEndpoint + '/organizationslist/name/' + name);
	}

	findAllByLookup():Observable<Organization[]> {
		return this.http.get<Organization[]>(
			environment.apiEndpoint + '/organizationslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<Organization[]> {
		return this.http.get<Organization[]>(
			environment.apiEndpoint + '/organizationslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<Organization[]> {
		return this.http.get<Organization[]>(
			environment.apiEndpoint + '/organizationslist/createdbyorganizationid/' + id)
	}

	save(organization:Organization):Observable<Organization[]> {
		return this.http.post<Organization[]>(
			environment.apiEndpoint + '/organizations', organization);
	}

	saveOrganization(organization:Organization):Observable<Organization> {
		return this.http.post<Organization>(
			environment.apiEndpoint + '/organizations/storeorganization', organization);
	}

	update(id:number, organization:Organization):Observable<Organization[]> {
		return this.http.put<Organization[]>(
			environment.apiEndpoint + '/organizations/' + id, organization);
	}

	delete(organization:Organization):Observable<Organization[]> {
		return this.http.delete<Organization[]>(
			environment.apiEndpoint + '/organizations/' + organization.id);
	}

}
