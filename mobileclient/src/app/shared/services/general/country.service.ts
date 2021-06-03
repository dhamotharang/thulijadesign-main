import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { Country } from '../../models/general/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<Country[]> {
		return this.http.get<Country[]>(
			environment.apiEndpoint + '/countries')
	}

	findById(id:number):Observable<Country> {
		return this.http.get<Country>(
			environment.apiEndpoint + '/countries/' + id)
	}

	findAllByName(name:string):Observable<Country[]> {
		return this.http.get<Country[]>(
			environment.apiEndpoint + '/countrieslist/name/' + name);
	}

	findAllByLookup():Observable<Country[]> {
		return this.http.get<Country[]>(
			environment.apiEndpoint + '/countrieslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<Country[]> {
		return this.http.get<Country[]>(
			environment.apiEndpoint + '/countrieslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<Country[]> {
		return this.http.get<Country[]>(
			environment.apiEndpoint + '/countrieslist/createdbyorganizationid/' + id)
	}

	save(country:Country):Observable<Country[]> {
		return this.http.post<Country[]>(
			environment.apiEndpoint + '/countries', country);
	}

	saveCountry(country:Country):Observable<Country> {
		return this.http.post<Country>(
			environment.apiEndpoint + '/countries/storecountry', country);
	}

	update(id:number, country:Country):Observable<Country[]> {
		return this.http.put<Country[]>(
			environment.apiEndpoint + '/countries/' + id, country);
	}

	delete(country:Country):Observable<Country[]> {
		return this.http.delete<Country[]>(
			environment.apiEndpoint + '/countries/' + country.id);
	}

}
