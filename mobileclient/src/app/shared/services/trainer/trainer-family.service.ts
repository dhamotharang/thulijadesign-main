import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { TrainerFamily } from '../../models/trainer/trainer-family';

@Injectable({
  providedIn: 'root'
})
export class TrainerFamilyService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<TrainerFamily[]> {
		return this.http.get<TrainerFamily[]>(
			environment.apiEndpoint + '/trainerfamilies')
	}

	findById(id:number):Observable<TrainerFamily> {
		return this.http.get<TrainerFamily>(
			environment.apiEndpoint + '/trainerfamilies/' + id)
	}

	findByTrainerId(id:number):Observable<TrainerFamily[]> {
		return this.http.get<TrainerFamily[]>(
			environment.apiEndpoint + '/trainerfamilieslist/trainer/' + id)
	}

	findByRelationTypeId(id:number):Observable<TrainerFamily[]> {
		return this.http.get<TrainerFamily[]>(
			environment.apiEndpoint + '/trainerfamilieslist/relationtype/' + id)
	}

	findAllByName(name:string):Observable<TrainerFamily[]> {
		return this.http.get<TrainerFamily[]>(
			environment.apiEndpoint + '/trainerfamilieslist/name/' + name);
	}

	findByCitizenId(id:number):Observable<TrainerFamily[]> {
		return this.http.get<TrainerFamily[]>(
			environment.apiEndpoint + '/trainerfamilieslist/citizen/' + id)
	}

	findAllByCreatedById(id:number):Observable<TrainerFamily[]> {
		return this.http.get<TrainerFamily[]>(
			environment.apiEndpoint + '/trainerfamilieslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<TrainerFamily[]> {
		return this.http.get<TrainerFamily[]>(
			environment.apiEndpoint + '/trainerfamilieslist/createdbyorganizationid/' + id)
	}

	save(trainerfamily:TrainerFamily):Observable<TrainerFamily[]> {
		return this.http.post<TrainerFamily[]>(
			environment.apiEndpoint + '/trainerfamilies', trainerfamily);
	}

	saveTrainerFamily(trainerfamily:TrainerFamily):Observable<TrainerFamily> {
		return this.http.post<TrainerFamily>(
			environment.apiEndpoint + '/trainerfamilies/storetrainerfamily', trainerfamily);
	}

	update(id:number, trainerfamily:TrainerFamily):Observable<TrainerFamily[]> {
		return this.http.put<TrainerFamily[]>(
			environment.apiEndpoint + '/trainerfamilies/' + id, trainerfamily);
	}

	delete(trainerfamily:TrainerFamily):Observable<TrainerFamily[]> {
		if (trainerfamily.options != undefined && trainerfamily.options["masterDetail"] == "Trainer") {
			return this.http.delete<TrainerFamily[]>(
				environment.apiEndpoint + '/trainerfamilies/' + trainerfamily.id + "?masterDetail=Trainer&trainer_id=" + trainerfamily.trainer.id);
		} else {
			return this.http.delete<TrainerFamily[]>(
				environment.apiEndpoint + '/trainerfamilies/' + trainerfamily.id);
		}
	}

}
