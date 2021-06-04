import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { ProgramMaster } from '../../models/program/program-master';

@Injectable({
  providedIn: 'root'
})
export class ProgramMasterService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<ProgramMaster[]> {
		return this.http.get<ProgramMaster[]>(
			environment.apiEndpoint + '/programmasters')
	}

	findById(id:number):Observable<ProgramMaster> {
		return this.http.get<ProgramMaster>(
			environment.apiEndpoint + '/programmasters/' + id)
	}

	findByProgramCategoryId(id:number):Observable<ProgramMaster[]> {
		return this.http.get<ProgramMaster[]>(
			environment.apiEndpoint + '/programmasterslist/programcategory/' + id)
	}

	findByProgramTypeId(id:number):Observable<ProgramMaster[]> {
		return this.http.get<ProgramMaster[]>(
			environment.apiEndpoint + '/programmasterslist/programtype/' + id)
	}

	findAllByLookup():Observable<ProgramMaster[]> {
		return this.http.get<ProgramMaster[]>(
			environment.apiEndpoint + '/programmasterslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<ProgramMaster[]> {
		return this.http.get<ProgramMaster[]>(
			environment.apiEndpoint + '/programmasterslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<ProgramMaster[]> {
		return this.http.get<ProgramMaster[]>(
			environment.apiEndpoint + '/programmasterslist/createdbyorganizationid/' + id)
	}

	save(programmaster:ProgramMaster):Observable<ProgramMaster[]> {
		return this.http.post<ProgramMaster[]>(
			environment.apiEndpoint + '/programmasters', programmaster);
	}

	saveProgramMaster(programmaster:ProgramMaster):Observable<ProgramMaster> {
		return this.http.post<ProgramMaster>(
			environment.apiEndpoint + '/programmasters/storeprogrammaster', programmaster);
	}

	update(id:number, programmaster:ProgramMaster):Observable<ProgramMaster[]> {
		return this.http.put<ProgramMaster[]>(
			environment.apiEndpoint + '/programmasters/' + id, programmaster);
	}

	delete(programmaster:ProgramMaster):Observable<ProgramMaster[]> {
		return this.http.delete<ProgramMaster[]>(
			environment.apiEndpoint + '/programmasters/' + programmaster.id);
	}

}
