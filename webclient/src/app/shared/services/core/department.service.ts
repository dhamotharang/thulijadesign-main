import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { Department } from '../../models/core/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<Department[]> {
		return this.http.get<Department[]>(
			environment.apiEndpoint + '/departments')
	}

	findById(id:number):Observable<Department> {
		return this.http.get<Department>(
			environment.apiEndpoint + '/departments/' + id)
	}

	findByOrganizationId(id:number):Observable<Department[]> {
		return this.http.get<Department[]>(
			environment.apiEndpoint + '/departmentslist/organization/' + id)
	}

	findByBranchId(id:number):Observable<Department[]> {
		return this.http.get<Department[]>(
			environment.apiEndpoint + '/departmentslist/branch/' + id)
	}

	findAllByName(name:string):Observable<Department[]> {
		return this.http.get<Department[]>(
			environment.apiEndpoint + '/departmentslist/name/' + name);
	}

	findAllByLookup():Observable<Department[]> {
		return this.http.get<Department[]>(
			environment.apiEndpoint + '/departmentslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<Department[]> {
		return this.http.get<Department[]>(
			environment.apiEndpoint + '/departmentslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<Department[]> {
		return this.http.get<Department[]>(
			environment.apiEndpoint + '/departmentslist/createdbyorganizationid/' + id)
	}

	save(department:Department):Observable<Department[]> {
		return this.http.post<Department[]>(
			environment.apiEndpoint + '/departments', department);
	}

	saveDepartment(department:Department):Observable<Department> {
		return this.http.post<Department>(
			environment.apiEndpoint + '/departments/storedepartment', department);
	}

	update(id:number, department:Department):Observable<Department[]> {
		return this.http.put<Department[]>(
			environment.apiEndpoint + '/departments/' + id, department);
	}

	delete(department:Department):Observable<Department[]> {
		return this.http.delete<Department[]>(
			environment.apiEndpoint + '/departments/' + department.id);
	}

}
