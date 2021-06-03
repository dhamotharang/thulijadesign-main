import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { TrainerOccupation } from '../../models/trainer/trainer-occupation';

@Injectable({
  providedIn: 'root'
})
export class TrainerOccupationService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<TrainerOccupation[]> {
		return this.http.get<TrainerOccupation[]>(
			environment.apiEndpoint + '/traineroccupations')
	}

	findById(id:number):Observable<TrainerOccupation> {
		return this.http.get<TrainerOccupation>(
			environment.apiEndpoint + '/traineroccupations/' + id)
	}

	findByTrainerId(id:number):Observable<TrainerOccupation[]> {
		return this.http.get<TrainerOccupation[]>(
			environment.apiEndpoint + '/traineroccupationslist/trainer/' + id)
	}

	findByPositionLevelId(id:number):Observable<TrainerOccupation[]> {
		return this.http.get<TrainerOccupation[]>(
			environment.apiEndpoint + '/traineroccupationslist/positionlevel/' + id)
	}

	findAllByCreatedById(id:number):Observable<TrainerOccupation[]> {
		return this.http.get<TrainerOccupation[]>(
			environment.apiEndpoint + '/traineroccupationslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<TrainerOccupation[]> {
		return this.http.get<TrainerOccupation[]>(
			environment.apiEndpoint + '/traineroccupationslist/createdbyorganizationid/' + id)
	}

	save(traineroccupation:TrainerOccupation):Observable<TrainerOccupation[]> {
		return this.http.post<TrainerOccupation[]>(
			environment.apiEndpoint + '/traineroccupations', traineroccupation);
	}

	saveTrainerOccupation(traineroccupation:TrainerOccupation):Observable<TrainerOccupation> {
		return this.http.post<TrainerOccupation>(
			environment.apiEndpoint + '/traineroccupations/storetraineroccupation', traineroccupation);
	}

	update(id:number, traineroccupation:TrainerOccupation):Observable<TrainerOccupation[]> {
		return this.http.put<TrainerOccupation[]>(
			environment.apiEndpoint + '/traineroccupations/' + id, traineroccupation);
	}

	delete(traineroccupation:TrainerOccupation):Observable<TrainerOccupation[]> {
		if (traineroccupation.options != undefined && traineroccupation.options["masterDetail"] == "Trainer") {
			return this.http.delete<TrainerOccupation[]>(
				environment.apiEndpoint + '/traineroccupations/' + traineroccupation.id + "?masterDetail=Trainer&trainer_id=" + traineroccupation.trainer.id);
		} else {
			return this.http.delete<TrainerOccupation[]>(
				environment.apiEndpoint + '/traineroccupations/' + traineroccupation.id);
		}
	}

}
