import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { RelationType } from '../../models/general/relation-type';

@Injectable({
  providedIn: 'root'
})
export class RelationTypeService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<RelationType[]> {
		return this.http.get<RelationType[]>(
			environment.apiEndpoint + '/relationtypes')
	}

	findById(id:number):Observable<RelationType> {
		return this.http.get<RelationType>(
			environment.apiEndpoint + '/relationtypes/' + id)
	}

	findAllByName(name:string):Observable<RelationType[]> {
		return this.http.get<RelationType[]>(
			environment.apiEndpoint + '/relationtypeslist/name/' + name);
	}

	findAllByLookup():Observable<RelationType[]> {
		return this.http.get<RelationType[]>(
			environment.apiEndpoint + '/relationtypeslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<RelationType[]> {
		return this.http.get<RelationType[]>(
			environment.apiEndpoint + '/relationtypeslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<RelationType[]> {
		return this.http.get<RelationType[]>(
			environment.apiEndpoint + '/relationtypeslist/createdbyorganizationid/' + id)
	}

	save(relationtype:RelationType):Observable<RelationType[]> {
		return this.http.post<RelationType[]>(
			environment.apiEndpoint + '/relationtypes', relationtype);
	}

	saveRelationType(relationtype:RelationType):Observable<RelationType> {
		return this.http.post<RelationType>(
			environment.apiEndpoint + '/relationtypes/storerelationtype', relationtype);
	}

	update(id:number, relationtype:RelationType):Observable<RelationType[]> {
		return this.http.put<RelationType[]>(
			environment.apiEndpoint + '/relationtypes/' + id, relationtype);
	}

	delete(relationtype:RelationType):Observable<RelationType[]> {
		return this.http.delete<RelationType[]>(
			environment.apiEndpoint + '/relationtypes/' + relationtype.id);
	}

}
