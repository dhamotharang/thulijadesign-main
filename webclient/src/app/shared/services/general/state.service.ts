import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { State } from '../../models/general/state';

@Injectable({
  providedIn: 'root'
})
export class StateService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<State[]> {
		return this.http.get<State[]>(
			environment.apiEndpoint + '/states')
	}

	findById(id:number):Observable<State> {
		return this.http.get<State>(
			environment.apiEndpoint + '/states/' + id)
	}

	findByCountryId(id:number):Observable<State[]> {
		return this.http.get<State[]>(
			environment.apiEndpoint + '/stateslist/country/' + id)
	}

	findAllByName(name:string):Observable<State[]> {
		return this.http.get<State[]>(
			environment.apiEndpoint + '/stateslist/name/' + name);
	}

	findAllByLookup():Observable<State[]> {
		return this.http.get<State[]>(
			environment.apiEndpoint + '/stateslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<State[]> {
		return this.http.get<State[]>(
			environment.apiEndpoint + '/stateslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<State[]> {
		return this.http.get<State[]>(
			environment.apiEndpoint + '/stateslist/createdbyorganizationid/' + id)
	}

	save(state:State):Observable<State[]> {
		return this.http.post<State[]>(
			environment.apiEndpoint + '/states', state);
	}

	saveState(state:State):Observable<State> {
		return this.http.post<State>(
			environment.apiEndpoint + '/states/storestate', state);
	}

	update(id:number, state:State):Observable<State[]> {
		return this.http.put<State[]>(
			environment.apiEndpoint + '/states/' + id, state);
	}

	delete(state:State):Observable<State[]> {
		return this.http.delete<State[]>(
			environment.apiEndpoint + '/states/' + state.id);
	}

}
