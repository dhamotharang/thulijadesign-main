import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { OrganizationType } from '../../models/core/organization-type';

@Injectable({
  providedIn: 'root'
})
export class OrganizationTypeService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<OrganizationType[]> {
		return this.http.get<OrganizationType[]>(
			environment.apiEndpoint + '/organizationtypes')
	}

	findById(id:number):Observable<OrganizationType> {
		return this.http.get<OrganizationType>(
			environment.apiEndpoint + '/organizationtypes/' + id)
	}

	findAllByName(name:string):Observable<OrganizationType[]> {
		return this.http.get<OrganizationType[]>(
			environment.apiEndpoint + '/organizationtypeslist/name/' + name);
	}

	findAllByLookup():Observable<OrganizationType[]> {
		return this.http.get<OrganizationType[]>(
			environment.apiEndpoint + '/organizationtypeslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<OrganizationType[]> {
		return this.http.get<OrganizationType[]>(
			environment.apiEndpoint + '/organizationtypeslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<OrganizationType[]> {
		return this.http.get<OrganizationType[]>(
			environment.apiEndpoint + '/organizationtypeslist/createdbyorganizationid/' + id)
	}

	save(organizationtype:OrganizationType):Observable<OrganizationType[]> {
		return this.http.post<OrganizationType[]>(
			environment.apiEndpoint + '/organizationtypes', organizationtype);
	}

	saveOrganizationType(organizationtype:OrganizationType):Observable<OrganizationType> {
		return this.http.post<OrganizationType>(
			environment.apiEndpoint + '/organizationtypes/storeorganizationtype', organizationtype);
	}

	update(id:number, organizationtype:OrganizationType):Observable<OrganizationType[]> {
		return this.http.put<OrganizationType[]>(
			environment.apiEndpoint + '/organizationtypes/' + id, organizationtype);
	}

	delete(organizationtype:OrganizationType):Observable<OrganizationType[]> {
		return this.http.delete<OrganizationType[]>(
			environment.apiEndpoint + '/organizationtypes/' + organizationtype.id);
	}

}
