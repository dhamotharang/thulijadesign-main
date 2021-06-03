import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { GroupMenu } from '../../models/core/group-menu';

@Injectable({
  providedIn: 'root'
})
export class GroupMenuService {

	http:HttpClient;

	constructor(http:HttpClient) {
		this.http = http;
	}

	findAll():Observable<GroupMenu[]> {
		return this.http.get<GroupMenu[]>(
			environment.apiEndpoint + '/groupmenus')
	}

	findById(id:number):Observable<GroupMenu> {
		return this.http.get<GroupMenu>(
			environment.apiEndpoint + '/groupmenus/' + id)
	}

	findByGroupId(id:number):Observable<GroupMenu[]> {
		return this.http.get<GroupMenu[]>(
			environment.apiEndpoint + '/groupmenuslist/group/' + id)
	}

	findAllByName(name:string):Observable<GroupMenu[]> {
		return this.http.get<GroupMenu[]>(
			environment.apiEndpoint + '/groupmenuslist/name/' + name);
	}

	findAllByLookup():Observable<GroupMenu[]> {
		return this.http.get<GroupMenu[]>(
			environment.apiEndpoint + '/groupmenuslist/lookup')
	}

	findAllByCreatedById(id:number):Observable<GroupMenu[]> {
		return this.http.get<GroupMenu[]>(
			environment.apiEndpoint + '/groupmenuslist/createdbyid/' + id)
	}

	findAllByCreatedByOrganizationId(id:number):Observable<GroupMenu[]> {
		return this.http.get<GroupMenu[]>(
			environment.apiEndpoint + '/groupmenuslist/createdbyorganizationid/' + id)
	}

	save(groupmenu:GroupMenu):Observable<GroupMenu[]> {
		return this.http.post<GroupMenu[]>(
			environment.apiEndpoint + '/groupmenus', groupmenu);
	}

	saveGroupMenu(groupmenu:GroupMenu):Observable<GroupMenu> {
		return this.http.post<GroupMenu>(
			environment.apiEndpoint + '/groupmenus/storegroupmenu', groupmenu);
	}

	update(id:number, groupmenu:GroupMenu):Observable<GroupMenu[]> {
		return this.http.put<GroupMenu[]>(
			environment.apiEndpoint + '/groupmenus/' + id, groupmenu);
	}

	delete(groupmenu:GroupMenu):Observable<GroupMenu[]> {
		return this.http.delete<GroupMenu[]>(
			environment.apiEndpoint + '/groupmenus/' + groupmenu.id);
	}

}
