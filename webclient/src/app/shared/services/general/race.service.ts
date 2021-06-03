import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { Race } from '../../models/general/race';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<Race[]> {
		return this.http.get<Race[]>(
			environment.apiEndpoint + '/races')
	}

	findById(id:number):Observable<Race> {
		return this.http.get<Race>(
			environment.apiEndpoint + '/races/' + id)
	}

	findAllByName(name:string):Observable<Race[]> {
		return this.http.get<Race[]>(
			environment.apiEndpoint + '/raceslist/name/' + name);
	}

	findAllByLookup():Observable<Race[]> {
		return this.http.get<Race[]>(
			environment.apiEndpoint + '/raceslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<Race[]> {
		return this.http.get<Race[]>(
			environment.apiEndpoint + '/raceslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<Race[]> {
		return this.http.get<Race[]>(
			environment.apiEndpoint + '/raceslist/createdbyorganizationid/' + id)
	}

	save(race:Race):Observable<Race[]> {
		return this.http.post<Race[]>(
			environment.apiEndpoint + '/races', race);
	}

	saveRace(race:Race):Observable<Race> {
		return this.http.post<Race>(
			environment.apiEndpoint + '/races/storerace', race);
	}

	update(id:number, race:Race):Observable<Race[]> {
		return this.http.put<Race[]>(
			environment.apiEndpoint + '/races/' + id, race);
	}

	delete(race:Race):Observable<Race[]> {
		return this.http.delete<Race[]>(
			environment.apiEndpoint + '/races/' + race.id);
	}

}
