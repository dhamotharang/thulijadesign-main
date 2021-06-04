import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { ScholarDetail } from '../../models/scholar/scholar-detail';

@Injectable({
  providedIn: 'root'
})
export class ScholarDetailService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<ScholarDetail[]> {
		return this.http.get<ScholarDetail[]>(
			environment.apiEndpoint + '/scholardetails')
	}

	findById(id:number):Observable<ScholarDetail> {
		return this.http.get<ScholarDetail>(
			environment.apiEndpoint + '/scholardetails/' + id)
	}

	findByScholarId(id:number):Observable<ScholarDetail[]> {
		return this.http.get<ScholarDetail[]>(
			environment.apiEndpoint + '/scholardetailslist/scholar/' + id)
	}

	findByMaritalStatusId(id:number):Observable<ScholarDetail[]> {
		return this.http.get<ScholarDetail[]>(
			environment.apiEndpoint + '/scholardetailslist/maritalstatus/' + id)
	}

	findByRaceId(id:number):Observable<ScholarDetail[]> {
		return this.http.get<ScholarDetail[]>(
			environment.apiEndpoint + '/scholardetailslist/race/' + id)
	}

	findByReligionId(id:number):Observable<ScholarDetail[]> {
		return this.http.get<ScholarDetail[]>(
			environment.apiEndpoint + '/scholardetailslist/religion/' + id)
	}

	findAllByCreatedById(id:number):Observable<ScholarDetail[]> {
		return this.http.get<ScholarDetail[]>(
			environment.apiEndpoint + '/scholardetailslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<ScholarDetail[]> {
		return this.http.get<ScholarDetail[]>(
			environment.apiEndpoint + '/scholardetailslist/createdbyorganizationid/' + id)
	}

	save(scholardetail:ScholarDetail):Observable<ScholarDetail[]> {
		return this.http.post<ScholarDetail[]>(
			environment.apiEndpoint + '/scholardetails', scholardetail);
	}

	saveScholarDetail(scholardetail:ScholarDetail):Observable<ScholarDetail> {
		return this.http.post<ScholarDetail>(
			environment.apiEndpoint + '/scholardetails/storescholardetail', scholardetail);
	}

	update(id:number, scholardetail:ScholarDetail):Observable<ScholarDetail[]> {
		return this.http.put<ScholarDetail[]>(
			environment.apiEndpoint + '/scholardetails/' + id, scholardetail);
	}

	delete(scholardetail:ScholarDetail):Observable<ScholarDetail[]> {
		if (scholardetail.options != undefined && scholardetail.options["masterDetail"] == "Scholar") {
			return this.http.delete<ScholarDetail[]>(
				environment.apiEndpoint + '/scholardetails/' + scholardetail.id + "?masterDetail=Scholar&scholar_id=" + scholardetail.scholar.id);
		} else {
			return this.http.delete<ScholarDetail[]>(
				environment.apiEndpoint + '/scholardetails/' + scholardetail.id);
		}
	}

}
