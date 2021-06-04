import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { ScholarEducationDetail } from '../../models/scholar/scholar-education-detail';

@Injectable({
  providedIn: 'root'
})
export class ScholarEducationDetailService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<ScholarEducationDetail[]> {
		return this.http.get<ScholarEducationDetail[]>(
			environment.apiEndpoint + '/scholareducationdetails')
	}

	findById(id:number):Observable<ScholarEducationDetail> {
		return this.http.get<ScholarEducationDetail>(
			environment.apiEndpoint + '/scholareducationdetails/' + id)
	}

	findByScholarId(id:number):Observable<ScholarEducationDetail[]> {
		return this.http.get<ScholarEducationDetail[]>(
			environment.apiEndpoint + '/scholareducationdetailslist/scholar/' + id)
	}

	findByQualificationId(id:number):Observable<ScholarEducationDetail[]> {
		return this.http.get<ScholarEducationDetail[]>(
			environment.apiEndpoint + '/scholareducationdetailslist/qualification/' + id)
	}

	findByFieldStudyId(id:number):Observable<ScholarEducationDetail[]> {
		return this.http.get<ScholarEducationDetail[]>(
			environment.apiEndpoint + '/scholareducationdetailslist/fieldstudy/' + id)
	}

	findAllByCreatedById(id:number):Observable<ScholarEducationDetail[]> {
		return this.http.get<ScholarEducationDetail[]>(
			environment.apiEndpoint + '/scholareducationdetailslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<ScholarEducationDetail[]> {
		return this.http.get<ScholarEducationDetail[]>(
			environment.apiEndpoint + '/scholareducationdetailslist/createdbyorganizationid/' + id)
	}

	save(scholareducationdetail:ScholarEducationDetail):Observable<ScholarEducationDetail[]> {
		return this.http.post<ScholarEducationDetail[]>(
			environment.apiEndpoint + '/scholareducationdetails', scholareducationdetail);
	}

	saveScholarEducationDetail(scholareducationdetail:ScholarEducationDetail):Observable<ScholarEducationDetail> {
		return this.http.post<ScholarEducationDetail>(
			environment.apiEndpoint + '/scholareducationdetails/storescholareducationdetail', scholareducationdetail);
	}

	update(id:number, scholareducationdetail:ScholarEducationDetail):Observable<ScholarEducationDetail[]> {
		return this.http.put<ScholarEducationDetail[]>(
			environment.apiEndpoint + '/scholareducationdetails/' + id, scholareducationdetail);
	}

	delete(scholareducationdetail:ScholarEducationDetail):Observable<ScholarEducationDetail[]> {
		if (scholareducationdetail.options != undefined && scholareducationdetail.options["masterDetail"] == "Scholar") {
			return this.http.delete<ScholarEducationDetail[]>(
				environment.apiEndpoint + '/scholareducationdetails/' + scholareducationdetail.id + "?masterDetail=Scholar&scholar_id=" + scholareducationdetail.scholar.id);
		} else {
			return this.http.delete<ScholarEducationDetail[]>(
				environment.apiEndpoint + '/scholareducationdetails/' + scholareducationdetail.id);
		}
	}

}
