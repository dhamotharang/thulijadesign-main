import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { TrainerAddress } from '../../models/trainer/trainer-address';

@Injectable({
  providedIn: 'root'
})
export class TrainerAddressService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<TrainerAddress[]> {
		return this.http.get<TrainerAddress[]>(
			environment.apiEndpoint + '/traineraddresses')
	}

	findById(id:number):Observable<TrainerAddress> {
		return this.http.get<TrainerAddress>(
			environment.apiEndpoint + '/traineraddresses/' + id)
	}

	findByTrainerId(id:number):Observable<TrainerAddress[]> {
		return this.http.get<TrainerAddress[]>(
			environment.apiEndpoint + '/traineraddresseslist/trainer/' + id)
	}

	findByAddressTypeId(id:number):Observable<TrainerAddress[]> {
		return this.http.get<TrainerAddress[]>(
			environment.apiEndpoint + '/traineraddresseslist/addresstype/' + id)
	}

	findByCountryId(id:number):Observable<TrainerAddress[]> {
		return this.http.get<TrainerAddress[]>(
			environment.apiEndpoint + '/traineraddresseslist/country/' + id)
	}

	findByStateId(id:number):Observable<TrainerAddress[]> {
		return this.http.get<TrainerAddress[]>(
			environment.apiEndpoint + '/traineraddresseslist/state/' + id)
	}

	findAllByCreatedById(id:number):Observable<TrainerAddress[]> {
		return this.http.get<TrainerAddress[]>(
			environment.apiEndpoint + '/traineraddresseslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<TrainerAddress[]> {
		return this.http.get<TrainerAddress[]>(
			environment.apiEndpoint + '/traineraddresseslist/createdbyorganizationid/' + id)
	}

	save(traineraddress:TrainerAddress):Observable<TrainerAddress[]> {
		return this.http.post<TrainerAddress[]>(
			environment.apiEndpoint + '/traineraddresses', traineraddress);
	}

	saveTrainerAddress(traineraddress:TrainerAddress):Observable<TrainerAddress> {
		return this.http.post<TrainerAddress>(
			environment.apiEndpoint + '/traineraddresses/storetraineraddress', traineraddress);
	}

	update(id:number, traineraddress:TrainerAddress):Observable<TrainerAddress[]> {
		return this.http.put<TrainerAddress[]>(
			environment.apiEndpoint + '/traineraddresses/' + id, traineraddress);
	}

	delete(traineraddress:TrainerAddress):Observable<TrainerAddress[]> {
		if (traineraddress.options != undefined && traineraddress.options["masterDetail"] == "Trainer") {
			return this.http.delete<TrainerAddress[]>(
				environment.apiEndpoint + '/traineraddresses/' + traineraddress.id + "?masterDetail=Trainer&trainer_id=" + traineraddress.trainer.id);
		} else {
			return this.http.delete<TrainerAddress[]>(
				environment.apiEndpoint + '/traineraddresses/' + traineraddress.id);
		}
	}

}
