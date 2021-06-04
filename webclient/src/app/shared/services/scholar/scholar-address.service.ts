import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { ScholarAddress } from '../../models/scholar/scholar-address';

@Injectable({
  providedIn: 'root'
})
export class ScholarAddressService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<ScholarAddress[]> {
		return this.http.get<ScholarAddress[]>(
			environment.apiEndpoint + '/scholaraddresses')
	}

	findById(id:number):Observable<ScholarAddress> {
		return this.http.get<ScholarAddress>(
			environment.apiEndpoint + '/scholaraddresses/' + id)
	}

	findByScholarId(id:number):Observable<ScholarAddress[]> {
		return this.http.get<ScholarAddress[]>(
			environment.apiEndpoint + '/scholaraddresseslist/scholar/' + id)
	}

	findByAddressTypeId(id:number):Observable<ScholarAddress[]> {
		return this.http.get<ScholarAddress[]>(
			environment.apiEndpoint + '/scholaraddresseslist/addresstype/' + id)
	}

	findByCountryId(id:number):Observable<ScholarAddress[]> {
		return this.http.get<ScholarAddress[]>(
			environment.apiEndpoint + '/scholaraddresseslist/country/' + id)
	}

	findByStateId(id:number):Observable<ScholarAddress[]> {
		return this.http.get<ScholarAddress[]>(
			environment.apiEndpoint + '/scholaraddresseslist/state/' + id)
	}

	findAllByCreatedById(id:number):Observable<ScholarAddress[]> {
		return this.http.get<ScholarAddress[]>(
			environment.apiEndpoint + '/scholaraddresseslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<ScholarAddress[]> {
		return this.http.get<ScholarAddress[]>(
			environment.apiEndpoint + '/scholaraddresseslist/createdbyorganizationid/' + id)
	}

	save(scholaraddress:ScholarAddress):Observable<ScholarAddress[]> {
		return this.http.post<ScholarAddress[]>(
			environment.apiEndpoint + '/scholaraddresses', scholaraddress);
	}

	saveScholarAddress(scholaraddress:ScholarAddress):Observable<ScholarAddress> {
		return this.http.post<ScholarAddress>(
			environment.apiEndpoint + '/scholaraddresses/storescholaraddress', scholaraddress);
	}

	update(id:number, scholaraddress:ScholarAddress):Observable<ScholarAddress[]> {
		return this.http.put<ScholarAddress[]>(
			environment.apiEndpoint + '/scholaraddresses/' + id, scholaraddress);
	}

	delete(scholaraddress:ScholarAddress):Observable<ScholarAddress[]> {
		if (scholaraddress.options != undefined && scholaraddress.options["masterDetail"] == "Scholar") {
			return this.http.delete<ScholarAddress[]>(
				environment.apiEndpoint + '/scholaraddresses/' + scholaraddress.id + "?masterDetail=Scholar&scholar_id=" + scholaraddress.scholar.id);
		} else {
			return this.http.delete<ScholarAddress[]>(
				environment.apiEndpoint + '/scholaraddresses/' + scholaraddress.id);
		}
	}

}
