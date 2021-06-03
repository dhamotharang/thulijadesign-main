import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { Salutation } from '../../models/general/salutation';

@Injectable({
  providedIn: 'root'
})
export class SalutationService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<Salutation[]> {
		return this.http.get<Salutation[]>(
			environment.apiEndpoint + '/salutations')
	}

	findById(id:number):Observable<Salutation> {
		return this.http.get<Salutation>(
			environment.apiEndpoint + '/salutations/' + id)
	}

	findAllByName(name:string):Observable<Salutation[]> {
		return this.http.get<Salutation[]>(
			environment.apiEndpoint + '/salutationslist/name/' + name);
	}

	findAllByLookup():Observable<Salutation[]> {
		return this.http.get<Salutation[]>(
			environment.apiEndpoint + '/salutationslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<Salutation[]> {
		return this.http.get<Salutation[]>(
			environment.apiEndpoint + '/salutationslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<Salutation[]> {
		return this.http.get<Salutation[]>(
			environment.apiEndpoint + '/salutationslist/createdbyorganizationid/' + id)
	}

	save(salutation:Salutation):Observable<Salutation[]> {
		return this.http.post<Salutation[]>(
			environment.apiEndpoint + '/salutations', salutation);
	}

	saveSalutation(salutation:Salutation):Observable<Salutation> {
		return this.http.post<Salutation>(
			environment.apiEndpoint + '/salutations/storesalutation', salutation);
	}

	update(id:number, salutation:Salutation):Observable<Salutation[]> {
		return this.http.put<Salutation[]>(
			environment.apiEndpoint + '/salutations/' + id, salutation);
	}

	delete(salutation:Salutation):Observable<Salutation[]> {
		return this.http.delete<Salutation[]>(
			environment.apiEndpoint + '/salutations/' + salutation.id);
	}

}
