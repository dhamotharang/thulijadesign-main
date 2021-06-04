import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { ProgramCategory } from '../../models/program/program-category';

@Injectable({
  providedIn: 'root'
})
export class ProgramCategoryService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<ProgramCategory[]> {
		return this.http.get<ProgramCategory[]>(
			environment.apiEndpoint + '/programcategories')
	}

	findById(id:number):Observable<ProgramCategory> {
		return this.http.get<ProgramCategory>(
			environment.apiEndpoint + '/programcategories/' + id)
	}

	findAllByName(name:string):Observable<ProgramCategory[]> {
		return this.http.get<ProgramCategory[]>(
			environment.apiEndpoint + '/programcategorieslist/name/' + name);
	}

	findAllByLookup():Observable<ProgramCategory[]> {
		return this.http.get<ProgramCategory[]>(
			environment.apiEndpoint + '/programcategorieslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<ProgramCategory[]> {
		return this.http.get<ProgramCategory[]>(
			environment.apiEndpoint + '/programcategorieslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<ProgramCategory[]> {
		return this.http.get<ProgramCategory[]>(
			environment.apiEndpoint + '/programcategorieslist/createdbyorganizationid/' + id)
	}

	save(programcategory:ProgramCategory):Observable<ProgramCategory[]> {
		return this.http.post<ProgramCategory[]>(
			environment.apiEndpoint + '/programcategories', programcategory);
	}

	saveProgramCategory(programcategory:ProgramCategory):Observable<ProgramCategory> {
		return this.http.post<ProgramCategory>(
			environment.apiEndpoint + '/programcategories/storeprogramcategory', programcategory);
	}

	update(id:number, programcategory:ProgramCategory):Observable<ProgramCategory[]> {
		return this.http.put<ProgramCategory[]>(
			environment.apiEndpoint + '/programcategories/' + id, programcategory);
	}

	delete(programcategory:ProgramCategory):Observable<ProgramCategory[]> {
		return this.http.delete<ProgramCategory[]>(
			environment.apiEndpoint + '/programcategories/' + programcategory.id);
	}

}
