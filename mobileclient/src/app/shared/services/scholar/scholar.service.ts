import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { environment } from '../../../../environments/environment';

import { Scholar } from '../../models/scholar/scholar';

@Injectable({
  providedIn: 'root'
})
export class ScholarService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<Scholar[]> {
		return this.http.get<Scholar[]>(
			environment.apiEndpoint + '/scholars')
	}

	findById(id:number):Observable<Scholar> {
		return this.http.get<Scholar>(
			environment.apiEndpoint + '/scholars/' + id)
	}

	findByOrganizationId(id:number, alphabet:string):Observable<Scholar[]> {
		return this.http.get<Scholar[]>(
			environment.apiEndpoint + '/scholarslist/organization/' + id + '/' + alphabet)
	}

	findByBranchId(id:number, alphabet:string):Observable<Scholar[]> {
		return this.http.get<Scholar[]>(
			environment.apiEndpoint + '/scholarslist/branch/' + id + '/' + alphabet)
	}

	findByDepartmentId(id:number, alphabet:string):Observable<Scholar[]> {
		return this.http.get<Scholar[]>(
			environment.apiEndpoint + '/scholarslist/department/' + id + '/' + alphabet)
	}

	findBySalutationId(id:number, alphabet:string):Observable<Scholar[]> {
		return this.http.get<Scholar[]>(
			environment.apiEndpoint + '/scholarslist/salutation/' + id + '/' + alphabet)
	}

	findByGenderId(id:number, alphabet:string):Observable<Scholar[]> {
		return this.http.get<Scholar[]>(
			environment.apiEndpoint + '/scholarslist/gender/' + id + '/' + alphabet)
	}

	findByCitizenId(id:number, alphabet:string):Observable<Scholar[]> {
		return this.http.get<Scholar[]>(
			environment.apiEndpoint + '/scholarslist/citizen/' + id + '/' + alphabet)
	}

	findByStatusId(id:number, alphabet:string):Observable<Scholar[]> {
		return this.http.get<Scholar[]>(
			environment.apiEndpoint + '/scholarslist/status/' + id + '/' + alphabet)
	}

	findByUserId(id:number):Observable<Scholar[]> {
		return this.http.get<Scholar[]>(
			environment.apiEndpoint + '/scholarslist/user/' + id);
	}

	findAllByLookup():Observable<Scholar[]> {
		return this.http.get<Scholar[]>(
			environment.apiEndpoint + '/scholarslist/lookup')
	}

	search(
		salutationId:number,
		firstName:string,
		lastName:string,
		genderId:number,
		citizenId:number,
		icNumber:string,
		handphoneNumber:string):Observable<Scholar[]> {
		return this.http.post<Scholar[]>(
			environment.apiEndpoint + '/scholarslist/search', {
				salutationId: salutationId,
				firstName: firstName,
				lastName: lastName,
				genderId: genderId,
				citizenId: citizenId,
				icNumber: icNumber,
				handphoneNumber: handphoneNumber
			})
	}

	alphabetFiltering(alphabet:string):Observable<Scholar[]> {
		return this.http.get<Scholar[]>(
			environment.apiEndpoint + '/scholars/alphabetfiltering/' + alphabet);
	}
	
	findAllByCreatedById(id:number):Observable<Scholar[]> {
		return this.http.get<Scholar[]>(
			environment.apiEndpoint + '/scholarslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<Scholar[]> {
		return this.http.get<Scholar[]>(
			environment.apiEndpoint + '/scholarslist/createdbyorganizationid/' + id)
	}

	save(scholar:Scholar):Observable<Scholar[]> {
		return this.http.post<Scholar[]>(
			environment.apiEndpoint + '/scholars', scholar);
	}

	saveScholar(scholar:Scholar):Observable<Scholar> {
		return this.http.post<Scholar>(
			environment.apiEndpoint + '/scholars/storescholar', scholar);
	}

	update(id:number, scholar:Scholar):Observable<Scholar[]> {
		return this.http.put<Scholar[]>(
			environment.apiEndpoint + '/scholars/' + id, scholar);
	}

	delete(scholar:Scholar):Observable<Scholar[]> {
		return this.http.delete<Scholar[]>(
			environment.apiEndpoint + '/scholars/' + scholar.id);
	}

	checkIfIcNumberExists(icNumber: string): Observable<{icNumberExists:""}> {
		return this.http.post<{icNumberExists:""}>(
			environment.apiEndpoint + '/scholars/checkicnumberexists', { icNumber:icNumber });
	}

	icNumberValidator(): AsyncValidatorFn {
		return (control: AbstractControl):Observable<ValidationErrors | null> => {
			return this.checkIfIcNumberExists(control.value).pipe(
				map(validationResponse => {
					return validationResponse.icNumberExists ? { unique:true } : null;
				})
			)
		};	
	}

	checkIfEmailAddressExists(emailAddress: string): Observable<{emailAddressExists:""}> {
		return this.http.post<{emailAddressExists:""}>(
			environment.apiEndpoint + '/scholars/checkemailaddressexists', { emailAddress:emailAddress });
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
