import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { TrainingDelivery } from '../../models/program/training-delivery';

@Injectable({
  providedIn: 'root'
})
export class TrainingDeliveryService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<TrainingDelivery[]> {
		return this.http.get<TrainingDelivery[]>(
			environment.apiEndpoint + '/trainingdeliveries')
	}

	findById(id:number):Observable<TrainingDelivery> {
		return this.http.get<TrainingDelivery>(
			environment.apiEndpoint + '/trainingdeliveries/' + id)
	}

	findAllByName(name:string):Observable<TrainingDelivery[]> {
		return this.http.get<TrainingDelivery[]>(
			environment.apiEndpoint + '/trainingdeliverieslist/name/' + name);
	}

	findAllByLookup():Observable<TrainingDelivery[]> {
		return this.http.get<TrainingDelivery[]>(
			environment.apiEndpoint + '/trainingdeliverieslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<TrainingDelivery[]> {
		return this.http.get<TrainingDelivery[]>(
			environment.apiEndpoint + '/trainingdeliverieslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<TrainingDelivery[]> {
		return this.http.get<TrainingDelivery[]>(
			environment.apiEndpoint + '/trainingdeliverieslist/createdbyorganizationid/' + id)
	}

	save(trainingdelivery:TrainingDelivery):Observable<TrainingDelivery[]> {
		return this.http.post<TrainingDelivery[]>(
			environment.apiEndpoint + '/trainingdeliveries', trainingdelivery);
	}

	saveTrainingDelivery(trainingdelivery:TrainingDelivery):Observable<TrainingDelivery> {
		return this.http.post<TrainingDelivery>(
			environment.apiEndpoint + '/trainingdeliveries/storetrainingdelivery', trainingdelivery);
	}

	update(id:number, trainingdelivery:TrainingDelivery):Observable<TrainingDelivery[]> {
		return this.http.put<TrainingDelivery[]>(
			environment.apiEndpoint + '/trainingdeliveries/' + id, trainingdelivery);
	}

	delete(trainingdelivery:TrainingDelivery):Observable<TrainingDelivery[]> {
		return this.http.delete<TrainingDelivery[]>(
			environment.apiEndpoint + '/trainingdeliveries/' + trainingdelivery.id);
	}

}
