import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { AddressType } from '../../models/general/address-type';

@Injectable({
  providedIn: 'root'
})
export class AddressTypeService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<AddressType[]> {
		return this.http.get<AddressType[]>(
			environment.apiEndpoint + '/addresstypes')
	}

	findById(id:number):Observable<AddressType> {
		return this.http.get<AddressType>(
			environment.apiEndpoint + '/addresstypes/' + id)
	}

	findAllByName(name:string):Observable<AddressType[]> {
		return this.http.get<AddressType[]>(
			environment.apiEndpoint + '/addresstypeslist/name/' + name);
	}

	findAllByLookup():Observable<AddressType[]> {
		return this.http.get<AddressType[]>(
			environment.apiEndpoint + '/addresstypeslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<AddressType[]> {
		return this.http.get<AddressType[]>(
			environment.apiEndpoint + '/addresstypeslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<AddressType[]> {
		return this.http.get<AddressType[]>(
			environment.apiEndpoint + '/addresstypeslist/createdbyorganizationid/' + id)
	}

	save(addresstype:AddressType):Observable<AddressType[]> {
		return this.http.post<AddressType[]>(
			environment.apiEndpoint + '/addresstypes', addresstype);
	}

	saveAddressType(addresstype:AddressType):Observable<AddressType> {
		return this.http.post<AddressType>(
			environment.apiEndpoint + '/addresstypes/storeaddresstype', addresstype);
	}

	update(id:number, addresstype:AddressType):Observable<AddressType[]> {
		return this.http.put<AddressType[]>(
			environment.apiEndpoint + '/addresstypes/' + id, addresstype);
	}

	delete(addresstype:AddressType):Observable<AddressType[]> {
		return this.http.delete<AddressType[]>(
			environment.apiEndpoint + '/addresstypes/' + addresstype.id);
	}

}
