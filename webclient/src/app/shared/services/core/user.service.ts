import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { environment } from '../../../../environments/environment';

import { User } from '../../models/core/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<User[]> {
		return this.http.get<User[]>(
			environment.apiEndpoint + '/users')
	}

	findById(id:number):Observable<User> {
		return this.http.get<User>(
			environment.apiEndpoint + '/users/' + id)
	}

	findByOrganizationId(id:number, alphabet:string):Observable<User[]> {
		return this.http.get<User[]>(
			environment.apiEndpoint + '/userslist/organization/' + id + '/' + alphabet)
	}

	findByBranchId(id:number, alphabet:string):Observable<User[]> {
		return this.http.get<User[]>(
			environment.apiEndpoint + '/userslist/branch/' + id + '/' + alphabet)
	}

	findByDepartmentId(id:number, alphabet:string):Observable<User[]> {
		return this.http.get<User[]>(
			environment.apiEndpoint + '/userslist/department/' + id + '/' + alphabet)
	}

	findByStatusId(id:number, alphabet:string):Observable<User[]> {
		return this.http.get<User[]>(
			environment.apiEndpoint + '/userslist/status/' + id + '/' + alphabet)
	}

	findAllByLookup():Observable<User[]> {
		return this.http.get<User[]>(
			environment.apiEndpoint + '/userslist/lookup')
	}

	search(
		firstName:string,
		lastName:string):Observable<User[]> {
		return this.http.post<User[]>(
			environment.apiEndpoint + '/userslist/search', {
				firstName: firstName,
				lastName: lastName
			})
	}

	alphabetFiltering(alphabet:string):Observable<User[]> {
		return this.http.get<User[]>(
			environment.apiEndpoint + '/users/alphabetfiltering/' + alphabet);
	}
	
	findAllByCreatedById(id:number):Observable<User[]> {
		return this.http.get<User[]>(
			environment.apiEndpoint + '/userslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<User[]> {
		return this.http.get<User[]>(
			environment.apiEndpoint + '/userslist/createdbyorganizationid/' + id)
	}

	save(user:User):Observable<User[]> {
		user.password = Md5.hashStr(user.password) + '';
		return this.http.post<User[]>(
			environment.apiEndpoint + '/users', user);
	}

	saveUser(user:User):Observable<User> {
		user.password = Md5.hashStr(user.password) + '';
		return this.http.post<User>(
			environment.apiEndpoint + '/users/storeuser', user);
	}

	update(id:number, user:User):Observable<User[]> {
		user.password = Md5.hashStr(user.password) + '';
		return this.http.put<User[]>(
			environment.apiEndpoint + '/users/' + id, user);
	}

	delete(user:User):Observable<User[]> {
		return this.http.delete<User[]>(
			environment.apiEndpoint + '/users/' + user.id);
	}

	findByEmailAddressAndPassword(emailAddress:string, hashPassword:string):Observable<User> {
		return this.http.post<User>(
			environment.apiEndpoint + '/users/validateuser', {emailAddress:emailAddress, password:hashPassword})
	}

	count():Observable<number> {
		return this.http.get<number>(environment.apiEndpoint + '/users/count');
	}

	changePassword(user_id:number, oldPassword:string, newPassword:string, confirmPassword:string):Observable<string> {
		oldPassword = Md5.hashStr(oldPassword) + '';
		newPassword = Md5.hashStr(newPassword) + '';
		confirmPassword = Md5.hashStr(confirmPassword) + '';
		return this.http.post<string>(
			environment.apiEndpoint + '/users/changepassword', { 
				user_id:user_id,
				oldPassword:oldPassword, 
				newPassword:newPassword,
				confirmPassword:confirmPassword
		});
	}

	checkIfEmailAddressExists(emailAddress: string): Observable<{emailAddressExists:""}> {
		return this.http.post<{emailAddressExists:""}>(
			environment.apiEndpoint + '/users/checkemailaddressexists', { emailAddress:emailAddress });
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
