import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { SalaryRange } from '../../models/general/salary-range';

@Injectable({
  providedIn: 'root'
})
export class SalaryRangeService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<SalaryRange[]> {
		return this.http.get<SalaryRange[]>(
			environment.apiEndpoint + '/salaryranges')
	}

	findById(id:number):Observable<SalaryRange> {
		return this.http.get<SalaryRange>(
			environment.apiEndpoint + '/salaryranges/' + id)
	}

	findAllByName(name:string):Observable<SalaryRange[]> {
		return this.http.get<SalaryRange[]>(
			environment.apiEndpoint + '/salaryrangeslist/name/' + name);
	}

	findAllByLookup():Observable<SalaryRange[]> {
		return this.http.get<SalaryRange[]>(
			environment.apiEndpoint + '/salaryrangeslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<SalaryRange[]> {
		return this.http.get<SalaryRange[]>(
			environment.apiEndpoint + '/salaryrangeslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<SalaryRange[]> {
		return this.http.get<SalaryRange[]>(
			environment.apiEndpoint + '/salaryrangeslist/createdbyorganizationid/' + id)
	}

	save(salaryrange:SalaryRange):Observable<SalaryRange[]> {
		return this.http.post<SalaryRange[]>(
			environment.apiEndpoint + '/salaryranges', salaryrange);
	}

	saveSalaryRange(salaryrange:SalaryRange):Observable<SalaryRange> {
		return this.http.post<SalaryRange>(
			environment.apiEndpoint + '/salaryranges/storesalaryrange', salaryrange);
	}

	update(id:number, salaryrange:SalaryRange):Observable<SalaryRange[]> {
		return this.http.put<SalaryRange[]>(
			environment.apiEndpoint + '/salaryranges/' + id, salaryrange);
	}

	delete(salaryrange:SalaryRange):Observable<SalaryRange[]> {
		return this.http.delete<SalaryRange[]>(
			environment.apiEndpoint + '/salaryranges/' + salaryrange.id);
	}

}
