import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { ScholarFamily } from '../../models/scholar/scholar-family';

@Injectable({
  providedIn: 'root'
})
export class ScholarFamilyService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<ScholarFamily[]> {
		return this.http.get<ScholarFamily[]>(
			environment.apiEndpoint + '/scholarfamilies')
	}

	findById(id:number):Observable<ScholarFamily> {
		return this.http.get<ScholarFamily>(
			environment.apiEndpoint + '/scholarfamilies/' + id)
	}

	findByScholarId(id:number):Observable<ScholarFamily[]> {
		return this.http.get<ScholarFamily[]>(
			environment.apiEndpoint + '/scholarfamilieslist/scholar/' + id)
	}

	findByRelationTypeId(id:number):Observable<ScholarFamily[]> {
		return this.http.get<ScholarFamily[]>(
			environment.apiEndpoint + '/scholarfamilieslist/relationtype/' + id)
	}

	findAllByName(name:string):Observable<ScholarFamily[]> {
		return this.http.get<ScholarFamily[]>(
			environment.apiEndpoint + '/scholarfamilieslist/name/' + name);
	}

	findByCitizenId(id:number):Observable<ScholarFamily[]> {
		return this.http.get<ScholarFamily[]>(
			environment.apiEndpoint + '/scholarfamilieslist/citizen/' + id)
	}

	findAllByCreatedById(id:number):Observable<ScholarFamily[]> {
		return this.http.get<ScholarFamily[]>(
			environment.apiEndpoint + '/scholarfamilieslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<ScholarFamily[]> {
		return this.http.get<ScholarFamily[]>(
			environment.apiEndpoint + '/scholarfamilieslist/createdbyorganizationid/' + id)
	}

	save(scholarfamily:ScholarFamily):Observable<ScholarFamily[]> {
		return this.http.post<ScholarFamily[]>(
			environment.apiEndpoint + '/scholarfamilies', scholarfamily);
	}

	saveScholarFamily(scholarfamily:ScholarFamily):Observable<ScholarFamily> {
		return this.http.post<ScholarFamily>(
			environment.apiEndpoint + '/scholarfamilies/storescholarfamily', scholarfamily);
	}

	update(id:number, scholarfamily:ScholarFamily):Observable<ScholarFamily[]> {
		return this.http.put<ScholarFamily[]>(
			environment.apiEndpoint + '/scholarfamilies/' + id, scholarfamily);
	}

	delete(scholarfamily:ScholarFamily):Observable<ScholarFamily[]> {
		if (scholarfamily.options != undefined && scholarfamily.options["masterDetail"] == "Scholar") {
			return this.http.delete<ScholarFamily[]>(
				environment.apiEndpoint + '/scholarfamilies/' + scholarfamily.id + "?masterDetail=Scholar&scholar_id=" + scholarfamily.scholar.id);
		} else {
			return this.http.delete<ScholarFamily[]>(
				environment.apiEndpoint + '/scholarfamilies/' + scholarfamily.id);
		}
	}

}
