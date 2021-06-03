import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { Citizen } from '../../models/general/citizen';

@Injectable({
  providedIn: 'root'
})
export class CitizenService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<Citizen[]> {
		return this.http.get<Citizen[]>(
			environment.apiEndpoint + '/citizens')
	}

	findById(id:number):Observable<Citizen> {
		return this.http.get<Citizen>(
			environment.apiEndpoint + '/citizens/' + id)
	}

	findByCountryId(id:number):Observable<Citizen[]> {
		return this.http.get<Citizen[]>(
			environment.apiEndpoint + '/citizenslist/country/' + id)
	}

	findAllByName(name:string):Observable<Citizen[]> {
		return this.http.get<Citizen[]>(
			environment.apiEndpoint + '/citizenslist/name/' + name);
	}

	findAllByLookup():Observable<Citizen[]> {
		return this.http.get<Citizen[]>(
			environment.apiEndpoint + '/citizenslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<Citizen[]> {
		return this.http.get<Citizen[]>(
			environment.apiEndpoint + '/citizenslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<Citizen[]> {
		return this.http.get<Citizen[]>(
			environment.apiEndpoint + '/citizenslist/createdbyorganizationid/' + id)
	}

	save(citizen:Citizen):Observable<Citizen[]> {
		return this.http.post<Citizen[]>(
			environment.apiEndpoint + '/citizens', citizen);
	}

	saveCitizen(citizen:Citizen):Observable<Citizen> {
		return this.http.post<Citizen>(
			environment.apiEndpoint + '/citizens/storecitizen', citizen);
	}

	update(id:number, citizen:Citizen):Observable<Citizen[]> {
		return this.http.put<Citizen[]>(
			environment.apiEndpoint + '/citizens/' + id, citizen);
	}

	delete(citizen:Citizen):Observable<Citizen[]> {
		return this.http.delete<Citizen[]>(
			environment.apiEndpoint + '/citizens/' + citizen.id);
	}

}
