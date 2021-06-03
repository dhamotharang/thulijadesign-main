import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { TrainerEducationDetail } from '../../models/trainer/trainer-education-detail';

@Injectable({
  providedIn: 'root'
})
export class TrainerEducationDetailService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<TrainerEducationDetail[]> {
		return this.http.get<TrainerEducationDetail[]>(
			environment.apiEndpoint + '/trainereducationdetails')
	}

	findById(id:number):Observable<TrainerEducationDetail> {
		return this.http.get<TrainerEducationDetail>(
			environment.apiEndpoint + '/trainereducationdetails/' + id)
	}

	findByTrainerId(id:number):Observable<TrainerEducationDetail[]> {
		return this.http.get<TrainerEducationDetail[]>(
			environment.apiEndpoint + '/trainereducationdetailslist/trainer/' + id)
	}

	findByQualificationId(id:number):Observable<TrainerEducationDetail[]> {
		return this.http.get<TrainerEducationDetail[]>(
			environment.apiEndpoint + '/trainereducationdetailslist/qualification/' + id)
	}

	findByFieldStudyId(id:number):Observable<TrainerEducationDetail[]> {
		return this.http.get<TrainerEducationDetail[]>(
			environment.apiEndpoint + '/trainereducationdetailslist/fieldstudy/' + id)
	}

	findAllByCreatedById(id:number):Observable<TrainerEducationDetail[]> {
		return this.http.get<TrainerEducationDetail[]>(
			environment.apiEndpoint + '/trainereducationdetailslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<TrainerEducationDetail[]> {
		return this.http.get<TrainerEducationDetail[]>(
			environment.apiEndpoint + '/trainereducationdetailslist/createdbyorganizationid/' + id)
	}

	save(trainereducationdetail:TrainerEducationDetail):Observable<TrainerEducationDetail[]> {
		return this.http.post<TrainerEducationDetail[]>(
			environment.apiEndpoint + '/trainereducationdetails', trainereducationdetail);
	}

	saveTrainerEducationDetail(trainereducationdetail:TrainerEducationDetail):Observable<TrainerEducationDetail> {
		return this.http.post<TrainerEducationDetail>(
			environment.apiEndpoint + '/trainereducationdetails/storetrainereducationdetail', trainereducationdetail);
	}

	update(id:number, trainereducationdetail:TrainerEducationDetail):Observable<TrainerEducationDetail[]> {
		return this.http.put<TrainerEducationDetail[]>(
			environment.apiEndpoint + '/trainereducationdetails/' + id, trainereducationdetail);
	}

	delete(trainereducationdetail:TrainerEducationDetail):Observable<TrainerEducationDetail[]> {
		if (trainereducationdetail.options != undefined && trainereducationdetail.options["masterDetail"] == "Trainer") {
			return this.http.delete<TrainerEducationDetail[]>(
				environment.apiEndpoint + '/trainereducationdetails/' + trainereducationdetail.id + "?masterDetail=Trainer&trainer_id=" + trainereducationdetail.trainer.id);
		} else {
			return this.http.delete<TrainerEducationDetail[]>(
				environment.apiEndpoint + '/trainereducationdetails/' + trainereducationdetail.id);
		}
	}

}
