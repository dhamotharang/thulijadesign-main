import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { environment } from '../../../../environments/environment';

import { Trainer } from '../../models/trainer/trainer';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<Trainer[]> {
		return this.http.get<Trainer[]>(
			environment.apiEndpoint + '/trainers')
	}

	findById(id:number):Observable<Trainer> {
		return this.http.get<Trainer>(
			environment.apiEndpoint + '/trainers/' + id)
	}

	findByOrganizationId(id:number, alphabet:string):Observable<Trainer[]> {
		return this.http.get<Trainer[]>(
			environment.apiEndpoint + '/trainerslist/organization/' + id + '/' + alphabet)
	}

	findByBranchId(id:number, alphabet:string):Observable<Trainer[]> {
		return this.http.get<Trainer[]>(
			environment.apiEndpoint + '/trainerslist/branch/' + id + '/' + alphabet)
	}

	findByDepartmentId(id:number, alphabet:string):Observable<Trainer[]> {
		return this.http.get<Trainer[]>(
			environment.apiEndpoint + '/trainerslist/department/' + id + '/' + alphabet)
	}

	findBySalutationId(id:number, alphabet:string):Observable<Trainer[]> {
		return this.http.get<Trainer[]>(
			environment.apiEndpoint + '/trainerslist/salutation/' + id + '/' + alphabet)
	}

	findByGenderId(id:number, alphabet:string):Observable<Trainer[]> {
		return this.http.get<Trainer[]>(
			environment.apiEndpoint + '/trainerslist/gender/' + id + '/' + alphabet)
	}

	findByCitizenId(id:number, alphabet:string):Observable<Trainer[]> {
		return this.http.get<Trainer[]>(
			environment.apiEndpoint + '/trainerslist/citizen/' + id + '/' + alphabet)
	}

	findByStatusId(id:number, alphabet:string):Observable<Trainer[]> {
		return this.http.get<Trainer[]>(
			environment.apiEndpoint + '/trainerslist/status/' + id + '/' + alphabet)
	}

	findByUserId(id:number):Observable<Trainer[]> {
		return this.http.get<Trainer[]>(
			environment.apiEndpoint + '/trainerslist/user/' + id);
	}

	findAllByLookup():Observable<Trainer[]> {
		return this.http.get<Trainer[]>(
			environment.apiEndpoint + '/trainerslist/lookup')
	}

	search(
		salutationId:number,
		firstName:string,
		lastName:string,
		genderId:number,
		citizenId:number,
		icNumber:string,
		handphoneNumber:string):Observable<Trainer[]> {
		return this.http.post<Trainer[]>(
			environment.apiEndpoint + '/trainerslist/search', {
				salutationId: salutationId,
				firstName: firstName,
				lastName: lastName,
				genderId: genderId,
				citizenId: citizenId,
				icNumber: icNumber,
				handphoneNumber: handphoneNumber
			})
	}

	alphabetFiltering(alphabet:string):Observable<Trainer[]> {
		return this.http.get<Trainer[]>(
			environment.apiEndpoint + '/trainers/alphabetfiltering/' + alphabet);
	}
	
	findAllByCreatedById(id:number):Observable<Trainer[]> {
		return this.http.get<Trainer[]>(
			environment.apiEndpoint + '/trainerslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<Trainer[]> {
		return this.http.get<Trainer[]>(
			environment.apiEndpoint + '/trainerslist/createdbyorganizationid/' + id)
	}

	save(trainer:Trainer):Observable<Trainer[]> {
		return this.http.post<Trainer[]>(
			environment.apiEndpoint + '/trainers', trainer);
	}

	saveTrainer(trainer:Trainer):Observable<Trainer> {
		return this.http.post<Trainer>(
			environment.apiEndpoint + '/trainers/storetrainer', trainer);
	}

	update(id:number, trainer:Trainer):Observable<Trainer[]> {
		return this.http.put<Trainer[]>(
			environment.apiEndpoint + '/trainers/' + id, trainer);
	}

	delete(trainer:Trainer):Observable<Trainer[]> {
		return this.http.delete<Trainer[]>(
			environment.apiEndpoint + '/trainers/' + trainer.id);
	}

	checkIfIcNumberExists(icNumber: string): Observable<{icNumberExists:""}> {
		return this.http.post<{icNumberExists:""}>(
			environment.apiEndpoint + '/trainers/checkicnumberexists', { icNumber:icNumber });
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
			environment.apiEndpoint + '/trainers/checkemailaddressexists', { emailAddress:emailAddress });
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
