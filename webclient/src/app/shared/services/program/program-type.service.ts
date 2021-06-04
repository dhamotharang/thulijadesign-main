import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { ProgramType } from '../../models/program/program-type';

@Injectable({
  providedIn: 'root'
})
export class ProgramTypeService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<ProgramType[]> {
		return this.http.get<ProgramType[]>(
			environment.apiEndpoint + '/programtypes')
	}

	findById(id:number):Observable<ProgramType> {
		return this.http.get<ProgramType>(
			environment.apiEndpoint + '/programtypes/' + id)
	}

	findAllByName(name:string):Observable<ProgramType[]> {
		return this.http.get<ProgramType[]>(
			environment.apiEndpoint + '/programtypeslist/name/' + name);
	}

	findAllByLookup():Observable<ProgramType[]> {
		return this.http.get<ProgramType[]>(
			environment.apiEndpoint + '/programtypeslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<ProgramType[]> {
		return this.http.get<ProgramType[]>(
			environment.apiEndpoint + '/programtypeslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<ProgramType[]> {
		return this.http.get<ProgramType[]>(
			environment.apiEndpoint + '/programtypeslist/createdbyorganizationid/' + id)
	}

	save(programtype:ProgramType):Observable<ProgramType[]> {
		return this.http.post<ProgramType[]>(
			environment.apiEndpoint + '/programtypes', programtype);
	}

	saveProgramType(programtype:ProgramType):Observable<ProgramType> {
		return this.http.post<ProgramType>(
			environment.apiEndpoint + '/programtypes/storeprogramtype', programtype);
	}

	update(id:number, programtype:ProgramType):Observable<ProgramType[]> {
		return this.http.put<ProgramType[]>(
			environment.apiEndpoint + '/programtypes/' + id, programtype);
	}

	delete(programtype:ProgramType):Observable<ProgramType[]> {
		return this.http.delete<ProgramType[]>(
			environment.apiEndpoint + '/programtypes/' + programtype.id);
	}

}
