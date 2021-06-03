import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { TrainerDetail } from '../../models/trainer/trainer-detail';

@Injectable({
  providedIn: 'root'
})
export class TrainerDetailService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<TrainerDetail[]> {
		return this.http.get<TrainerDetail[]>(
			environment.apiEndpoint + '/trainerdetails')
	}

	findById(id:number):Observable<TrainerDetail> {
		return this.http.get<TrainerDetail>(
			environment.apiEndpoint + '/trainerdetails/' + id)
	}

	findByTrainerId(id:number):Observable<TrainerDetail[]> {
		return this.http.get<TrainerDetail[]>(
			environment.apiEndpoint + '/trainerdetailslist/trainer/' + id)
	}

	findByMaritalStatusId(id:number):Observable<TrainerDetail[]> {
		return this.http.get<TrainerDetail[]>(
			environment.apiEndpoint + '/trainerdetailslist/maritalstatus/' + id)
	}

	findByRaceId(id:number):Observable<TrainerDetail[]> {
		return this.http.get<TrainerDetail[]>(
			environment.apiEndpoint + '/trainerdetailslist/race/' + id)
	}

	findByReligionId(id:number):Observable<TrainerDetail[]> {
		return this.http.get<TrainerDetail[]>(
			environment.apiEndpoint + '/trainerdetailslist/religion/' + id)
	}

	findAllByCreatedById(id:number):Observable<TrainerDetail[]> {
		return this.http.get<TrainerDetail[]>(
			environment.apiEndpoint + '/trainerdetailslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<TrainerDetail[]> {
		return this.http.get<TrainerDetail[]>(
			environment.apiEndpoint + '/trainerdetailslist/createdbyorganizationid/' + id)
	}

	save(trainerdetail:TrainerDetail):Observable<TrainerDetail[]> {
		return this.http.post<TrainerDetail[]>(
			environment.apiEndpoint + '/trainerdetails', trainerdetail);
	}

	saveTrainerDetail(trainerdetail:TrainerDetail):Observable<TrainerDetail> {
		return this.http.post<TrainerDetail>(
			environment.apiEndpoint + '/trainerdetails/storetrainerdetail', trainerdetail);
	}

	update(id:number, trainerdetail:TrainerDetail):Observable<TrainerDetail[]> {
		return this.http.put<TrainerDetail[]>(
			environment.apiEndpoint + '/trainerdetails/' + id, trainerdetail);
	}

	delete(trainerdetail:TrainerDetail):Observable<TrainerDetail[]> {
		if (trainerdetail.options != undefined && trainerdetail.options["masterDetail"] == "Trainer") {
			return this.http.delete<TrainerDetail[]>(
				environment.apiEndpoint + '/trainerdetails/' + trainerdetail.id + "?masterDetail=Trainer&trainer_id=" + trainerdetail.trainer.id);
		} else {
			return this.http.delete<TrainerDetail[]>(
				environment.apiEndpoint + '/trainerdetails/' + trainerdetail.id);
		}
	}

}
