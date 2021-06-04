import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { TrainingMode } from '../../models/program/training-mode';

@Injectable({
  providedIn: 'root'
})
export class TrainingModeService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<TrainingMode[]> {
		return this.http.get<TrainingMode[]>(
			environment.apiEndpoint + '/trainingmodes')
	}

	findById(id:number):Observable<TrainingMode> {
		return this.http.get<TrainingMode>(
			environment.apiEndpoint + '/trainingmodes/' + id)
	}

	findAllByName(name:string):Observable<TrainingMode[]> {
		return this.http.get<TrainingMode[]>(
			environment.apiEndpoint + '/trainingmodeslist/name/' + name);
	}

	findAllByLookup():Observable<TrainingMode[]> {
		return this.http.get<TrainingMode[]>(
			environment.apiEndpoint + '/trainingmodeslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<TrainingMode[]> {
		return this.http.get<TrainingMode[]>(
			environment.apiEndpoint + '/trainingmodeslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<TrainingMode[]> {
		return this.http.get<TrainingMode[]>(
			environment.apiEndpoint + '/trainingmodeslist/createdbyorganizationid/' + id)
	}

	save(trainingmode:TrainingMode):Observable<TrainingMode[]> {
		return this.http.post<TrainingMode[]>(
			environment.apiEndpoint + '/trainingmodes', trainingmode);
	}

	saveTrainingMode(trainingmode:TrainingMode):Observable<TrainingMode> {
		return this.http.post<TrainingMode>(
			environment.apiEndpoint + '/trainingmodes/storetrainingmode', trainingmode);
	}

	update(id:number, trainingmode:TrainingMode):Observable<TrainingMode[]> {
		return this.http.put<TrainingMode[]>(
			environment.apiEndpoint + '/trainingmodes/' + id, trainingmode);
	}

	delete(trainingmode:TrainingMode):Observable<TrainingMode[]> {
		return this.http.delete<TrainingMode[]>(
			environment.apiEndpoint + '/trainingmodes/' + trainingmode.id);
	}

}
