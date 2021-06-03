import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { PositionLevel } from '../../models/general/position-level';

@Injectable({
  providedIn: 'root'
})
export class PositionLevelService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<PositionLevel[]> {
		return this.http.get<PositionLevel[]>(
			environment.apiEndpoint + '/positionlevels')
	}

	findById(id:number):Observable<PositionLevel> {
		return this.http.get<PositionLevel>(
			environment.apiEndpoint + '/positionlevels/' + id)
	}

	findAllByName(name:string):Observable<PositionLevel[]> {
		return this.http.get<PositionLevel[]>(
			environment.apiEndpoint + '/positionlevelslist/name/' + name);
	}

	findAllByLookup():Observable<PositionLevel[]> {
		return this.http.get<PositionLevel[]>(
			environment.apiEndpoint + '/positionlevelslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<PositionLevel[]> {
		return this.http.get<PositionLevel[]>(
			environment.apiEndpoint + '/positionlevelslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<PositionLevel[]> {
		return this.http.get<PositionLevel[]>(
			environment.apiEndpoint + '/positionlevelslist/createdbyorganizationid/' + id)
	}

	save(positionlevel:PositionLevel):Observable<PositionLevel[]> {
		return this.http.post<PositionLevel[]>(
			environment.apiEndpoint + '/positionlevels', positionlevel);
	}

	savePositionLevel(positionlevel:PositionLevel):Observable<PositionLevel> {
		return this.http.post<PositionLevel>(
			environment.apiEndpoint + '/positionlevels/storepositionlevel', positionlevel);
	}

	update(id:number, positionlevel:PositionLevel):Observable<PositionLevel[]> {
		return this.http.put<PositionLevel[]>(
			environment.apiEndpoint + '/positionlevels/' + id, positionlevel);
	}

	delete(positionlevel:PositionLevel):Observable<PositionLevel[]> {
		return this.http.delete<PositionLevel[]>(
			environment.apiEndpoint + '/positionlevels/' + positionlevel.id);
	}

}
