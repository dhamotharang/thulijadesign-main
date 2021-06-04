import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { ProgramTag } from '../../models/program/program-tag';

@Injectable({
  providedIn: 'root'
})
export class ProgramTagService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<ProgramTag[]> {
		return this.http.get<ProgramTag[]>(
			environment.apiEndpoint + '/programtags')
	}

	findById(id:number):Observable<ProgramTag> {
		return this.http.get<ProgramTag>(
			environment.apiEndpoint + '/programtags/' + id)
	}

	findByProgramMasterId(id:number):Observable<ProgramTag[]> {
		return this.http.get<ProgramTag[]>(
			environment.apiEndpoint + '/programtagslist/programmaster/' + id)
	}

	findAllByName(name:string):Observable<ProgramTag[]> {
		return this.http.get<ProgramTag[]>(
			environment.apiEndpoint + '/programtagslist/name/' + name);
	}

	findAllByLookup():Observable<ProgramTag[]> {
		return this.http.get<ProgramTag[]>(
			environment.apiEndpoint + '/programtagslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<ProgramTag[]> {
		return this.http.get<ProgramTag[]>(
			environment.apiEndpoint + '/programtagslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<ProgramTag[]> {
		return this.http.get<ProgramTag[]>(
			environment.apiEndpoint + '/programtagslist/createdbyorganizationid/' + id)
	}

	save(programtag:ProgramTag):Observable<ProgramTag[]> {
		return this.http.post<ProgramTag[]>(
			environment.apiEndpoint + '/programtags', programtag);
	}

	saveProgramTag(programtag:ProgramTag):Observable<ProgramTag> {
		return this.http.post<ProgramTag>(
			environment.apiEndpoint + '/programtags/storeprogramtag', programtag);
	}

	update(id:number, programtag:ProgramTag):Observable<ProgramTag[]> {
		return this.http.put<ProgramTag[]>(
			environment.apiEndpoint + '/programtags/' + id, programtag);
	}

	delete(programtag:ProgramTag):Observable<ProgramTag[]> {
		if (programtag.options != undefined && programtag.options["masterDetail"] == "ProgramMaster") {
			return this.http.delete<ProgramTag[]>(
				environment.apiEndpoint + '/programtags/' + programtag.id + "?masterDetail=ProgramMaster&programMaster_id=" + programtag.programMaster.id);
		} else {
			return this.http.delete<ProgramTag[]>(
				environment.apiEndpoint + '/programtags/' + programtag.id);
		}
	}

}
