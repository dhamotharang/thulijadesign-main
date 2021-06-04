import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { environment } from '../../../../environments/environment';

import { ScholarRegistration } from '../../models/registration/scholar-registration';

@Injectable({
  providedIn: 'root'
})
export class ScholarRegistrationService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<ScholarRegistration[]> {
		return this.http.get<ScholarRegistration[]>(
			environment.apiEndpoint + '/scholarregistrations')
	}

	findById(id:number):Observable<ScholarRegistration> {
		return this.http.get<ScholarRegistration>(
			environment.apiEndpoint + '/scholarregistrations/' + id)
	}

	findByOrganizationId(id:number):Observable<ScholarRegistration[]> {
		return this.http.get<ScholarRegistration[]>(
			environment.apiEndpoint + '/scholarregistrationslist/organization/' + id)
	}

	findByBranchId(id:number):Observable<ScholarRegistration[]> {
		return this.http.get<ScholarRegistration[]>(
			environment.apiEndpoint + '/scholarregistrationslist/branch/' + id)
	}

	findByDepartmentId(id:number):Observable<ScholarRegistration[]> {
		return this.http.get<ScholarRegistration[]>(
			environment.apiEndpoint + '/scholarregistrationslist/department/' + id)
	}

	findBySalutationId(id:number):Observable<ScholarRegistration[]> {
		return this.http.get<ScholarRegistration[]>(
			environment.apiEndpoint + '/scholarregistrationslist/salutation/' + id)
	}

	findByGenderId(id:number):Observable<ScholarRegistration[]> {
		return this.http.get<ScholarRegistration[]>(
			environment.apiEndpoint + '/scholarregistrationslist/gender/' + id)
	}

	findAllByLookup():Observable<ScholarRegistration[]> {
		return this.http.get<ScholarRegistration[]>(
			environment.apiEndpoint + '/scholarregistrationslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<ScholarRegistration[]> {
		return this.http.get<ScholarRegistration[]>(
			environment.apiEndpoint + '/scholarregistrationslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<ScholarRegistration[]> {
		return this.http.get<ScholarRegistration[]>(
			environment.apiEndpoint + '/scholarregistrationslist/createdbyorganizationid/' + id)
	}

	save(scholarregistration:ScholarRegistration):Observable<ScholarRegistration[]> {
		return this.http.post<ScholarRegistration[]>(
			environment.apiEndpoint + '/scholarregistrations', scholarregistration);
	}

	saveScholarRegistration(scholarregistration:ScholarRegistration):Observable<ScholarRegistration> {
		return this.http.post<ScholarRegistration>(
			environment.apiEndpoint + '/scholarregistrations/storescholarregistration', scholarregistration);
	}

	update(id:number, scholarregistration:ScholarRegistration):Observable<ScholarRegistration[]> {
		return this.http.put<ScholarRegistration[]>(
			environment.apiEndpoint + '/scholarregistrations/' + id, scholarregistration);
	}

	delete(scholarregistration:ScholarRegistration):Observable<ScholarRegistration[]> {
		return this.http.delete<ScholarRegistration[]>(
			environment.apiEndpoint + '/scholarregistrations/' + scholarregistration.id);
	}

	checkIfEmailAddressExists(emailAddress: string): Observable<{emailAddressExists:""}> {
		return this.http.post<{emailAddressExists:""}>(
			environment.apiEndpoint + '/scholarregistrations/checkemailaddressexists', { emailAddress:emailAddress });
	}

	emailAddressValidator(): AsyncValidatorFn {
		return (control: AbstractControl):Observable<ValidationErrors | null> => {
			return this.checkIfEmailAddressExists(control.value).pipe(
				map(validationResponse => {
					return validationResponse.emailAddressExists ? { unique:true } : null;
				})
			)
		};	
	}

}
