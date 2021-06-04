import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { CompanyRegistrationType } from '../../models/general/company-registration-type';

@Injectable({
  providedIn: 'root'
})
export class CompanyRegistrationTypeService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<CompanyRegistrationType[]> {
		return this.http.get<CompanyRegistrationType[]>(
			environment.apiEndpoint + '/companyregistrationtypes')
	}

	findById(id:number):Observable<CompanyRegistrationType> {
		return this.http.get<CompanyRegistrationType>(
			environment.apiEndpoint + '/companyregistrationtypes/' + id)
	}

	findAllByName(name:string):Observable<CompanyRegistrationType[]> {
		return this.http.get<CompanyRegistrationType[]>(
			environment.apiEndpoint + '/companyregistrationtypeslist/name/' + name);
	}

	findAllByLookup():Observable<CompanyRegistrationType[]> {
		return this.http.get<CompanyRegistrationType[]>(
			environment.apiEndpoint + '/companyregistrationtypeslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<CompanyRegistrationType[]> {
		return this.http.get<CompanyRegistrationType[]>(
			environment.apiEndpoint + '/companyregistrationtypeslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<CompanyRegistrationType[]> {
		return this.http.get<CompanyRegistrationType[]>(
			environment.apiEndpoint + '/companyregistrationtypeslist/createdbyorganizationid/' + id)
	}

	save(companyregistrationtype:CompanyRegistrationType):Observable<CompanyRegistrationType[]> {
		return this.http.post<CompanyRegistrationType[]>(
			environment.apiEndpoint + '/companyregistrationtypes', companyregistrationtype);
	}

	saveCompanyRegistrationType(companyregistrationtype:CompanyRegistrationType):Observable<CompanyRegistrationType> {
		return this.http.post<CompanyRegistrationType>(
			environment.apiEndpoint + '/companyregistrationtypes/storecompanyregistrationtype', companyregistrationtype);
	}

	update(id:number, companyregistrationtype:CompanyRegistrationType):Observable<CompanyRegistrationType[]> {
		return this.http.put<CompanyRegistrationType[]>(
			environment.apiEndpoint + '/companyregistrationtypes/' + id, companyregistrationtype);
	}

	delete(companyregistrationtype:CompanyRegistrationType):Observable<CompanyRegistrationType[]> {
		return this.http.delete<CompanyRegistrationType[]>(
			environment.apiEndpoint + '/companyregistrationtypes/' + companyregistrationtype.id);
	}

}
