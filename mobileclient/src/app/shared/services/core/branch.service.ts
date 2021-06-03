import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { Branch } from '../../models/core/branch';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<Branch[]> {
		return this.http.get<Branch[]>(
			environment.apiEndpoint + '/branches')
	}

	findById(id:number):Observable<Branch> {
		return this.http.get<Branch>(
			environment.apiEndpoint + '/branches/' + id)
	}

	findByOrganizationId(id:number):Observable<Branch[]> {
		return this.http.get<Branch[]>(
			environment.apiEndpoint + '/brancheslist/organization/' + id)
	}

	findAllByName(name:string):Observable<Branch[]> {
		return this.http.get<Branch[]>(
			environment.apiEndpoint + '/brancheslist/name/' + name);
	}

	findAllByLookup():Observable<Branch[]> {
		return this.http.get<Branch[]>(
			environment.apiEndpoint + '/brancheslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<Branch[]> {
		return this.http.get<Branch[]>(
			environment.apiEndpoint + '/brancheslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<Branch[]> {
		return this.http.get<Branch[]>(
			environment.apiEndpoint + '/brancheslist/createdbyorganizationid/' + id)
	}

	save(branch:Branch):Observable<Branch[]> {
		return this.http.post<Branch[]>(
			environment.apiEndpoint + '/branches', branch);
	}

	saveBranch(branch:Branch):Observable<Branch> {
		return this.http.post<Branch>(
			environment.apiEndpoint + '/branches/storebranch', branch);
	}

	update(id:number, branch:Branch):Observable<Branch[]> {
		return this.http.put<Branch[]>(
			environment.apiEndpoint + '/branches/' + id, branch);
	}

	delete(branch:Branch):Observable<Branch[]> {
		return this.http.delete<Branch[]>(
			environment.apiEndpoint + '/branches/' + branch.id);
	}

}
