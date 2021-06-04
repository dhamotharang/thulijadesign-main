import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { ScholarOccupation } from '../../models/scholar/scholar-occupation';

@Injectable({
  providedIn: 'root'
})
export class ScholarOccupationService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<ScholarOccupation[]> {
		return this.http.get<ScholarOccupation[]>(
			environment.apiEndpoint + '/scholaroccupations')
	}

	findById(id:number):Observable<ScholarOccupation> {
		return this.http.get<ScholarOccupation>(
			environment.apiEndpoint + '/scholaroccupations/' + id)
	}

	findByScholarId(id:number):Observable<ScholarOccupation[]> {
		return this.http.get<ScholarOccupation[]>(
			environment.apiEndpoint + '/scholaroccupationslist/scholar/' + id)
	}

	findByPositionLevelId(id:number):Observable<ScholarOccupation[]> {
		return this.http.get<ScholarOccupation[]>(
			environment.apiEndpoint + '/scholaroccupationslist/positionlevel/' + id)
	}

	findAllByCreatedById(id:number):Observable<ScholarOccupation[]> {
		return this.http.get<ScholarOccupation[]>(
			environment.apiEndpoint + '/scholaroccupationslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<ScholarOccupation[]> {
		return this.http.get<ScholarOccupation[]>(
			environment.apiEndpoint + '/scholaroccupationslist/createdbyorganizationid/' + id)
	}

	save(scholaroccupation:ScholarOccupation):Observable<ScholarOccupation[]> {
		return this.http.post<ScholarOccupation[]>(
			environment.apiEndpoint + '/scholaroccupations', scholaroccupation);
	}

	saveScholarOccupation(scholaroccupation:ScholarOccupation):Observable<ScholarOccupation> {
		return this.http.post<ScholarOccupation>(
			environment.apiEndpoint + '/scholaroccupations/storescholaroccupation', scholaroccupation);
	}

	update(id:number, scholaroccupation:ScholarOccupation):Observable<ScholarOccupation[]> {
		return this.http.put<ScholarOccupation[]>(
			environment.apiEndpoint + '/scholaroccupations/' + id, scholaroccupation);
	}

	delete(scholaroccupation:ScholarOccupation):Observable<ScholarOccupation[]> {
		if (scholaroccupation.options != undefined && scholaroccupation.options["masterDetail"] == "Scholar") {
			return this.http.delete<ScholarOccupation[]>(
				environment.apiEndpoint + '/scholaroccupations/' + scholaroccupation.id + "?masterDetail=Scholar&scholar_id=" + scholaroccupation.scholar.id);
		} else {
			return this.http.delete<ScholarOccupation[]>(
				environment.apiEndpoint + '/scholaroccupations/' + scholaroccupation.id);
		}
	}

}
