import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { Program } from '../../models/program/program';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<Program[]> {
		return this.http.get<Program[]>(
			environment.apiEndpoint + '/programs')
	}

	findById(id:number):Observable<Program> {
		return this.http.get<Program>(
			environment.apiEndpoint + '/programs/' + id)
	}

	findByProgramMasterId(id:number):Observable<Program[]> {
		return this.http.get<Program[]>(
			environment.apiEndpoint + '/programslist/programmaster/' + id)
	}

	findByTrainingDeliveryId(id:number):Observable<Program[]> {
		return this.http.get<Program[]>(
			environment.apiEndpoint + '/programslist/trainingdelivery/' + id)
	}

	findByTrainingModeId(id:number):Observable<Program[]> {
		return this.http.get<Program[]>(
			environment.apiEndpoint + '/programslist/trainingmode/' + id)
	}

	findAllByLookup():Observable<Program[]> {
		return this.http.get<Program[]>(
			environment.apiEndpoint + '/programslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<Program[]> {
		return this.http.get<Program[]>(
			environment.apiEndpoint + '/programslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<Program[]> {
		return this.http.get<Program[]>(
			environment.apiEndpoint + '/programslist/createdbyorganizationid/' + id)
	}

	save(program:Program):Observable<Program[]> {
		return this.http.post<Program[]>(
			environment.apiEndpoint + '/programs', program);
	}

	saveProgram(program:Program):Observable<Program> {
		return this.http.post<Program>(
			environment.apiEndpoint + '/programs/storeprogram', program);
	}

	update(id:number, program:Program):Observable<Program[]> {
		return this.http.put<Program[]>(
			environment.apiEndpoint + '/programs/' + id, program);
	}

	delete(program:Program):Observable<Program[]> {
		return this.http.delete<Program[]>(
			environment.apiEndpoint + '/programs/' + program.id);
	}

}
