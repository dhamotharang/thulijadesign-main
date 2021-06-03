import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { OccupationType } from '../../models/general/occupation-type';

@Injectable({
  providedIn: 'root'
})
export class OccupationTypeService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<OccupationType[]> {
		return this.http.get<OccupationType[]>(
			environment.apiEndpoint + '/occupationtypes')
	}

	findById(id:number):Observable<OccupationType> {
		return this.http.get<OccupationType>(
			environment.apiEndpoint + '/occupationtypes/' + id)
	}

	findAllByName(name:string):Observable<OccupationType[]> {
		return this.http.get<OccupationType[]>(
			environment.apiEndpoint + '/occupationtypeslist/name/' + name);
	}

	findAllByLookup():Observable<OccupationType[]> {
		return this.http.get<OccupationType[]>(
			environment.apiEndpoint + '/occupationtypeslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<OccupationType[]> {
		return this.http.get<OccupationType[]>(
			environment.apiEndpoint + '/occupationtypeslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<OccupationType[]> {
		return this.http.get<OccupationType[]>(
			environment.apiEndpoint + '/occupationtypeslist/createdbyorganizationid/' + id)
	}

	save(occupationtype:OccupationType):Observable<OccupationType[]> {
		return this.http.post<OccupationType[]>(
			environment.apiEndpoint + '/occupationtypes', occupationtype);
	}

	saveOccupationType(occupationtype:OccupationType):Observable<OccupationType> {
		return this.http.post<OccupationType>(
			environment.apiEndpoint + '/occupationtypes/storeoccupationtype', occupationtype);
	}

	update(id:number, occupationtype:OccupationType):Observable<OccupationType[]> {
		return this.http.put<OccupationType[]>(
			environment.apiEndpoint + '/occupationtypes/' + id, occupationtype);
	}

	delete(occupationtype:OccupationType):Observable<OccupationType[]> {
		return this.http.delete<OccupationType[]>(
			environment.apiEndpoint + '/occupationtypes/' + occupationtype.id);
	}

}
