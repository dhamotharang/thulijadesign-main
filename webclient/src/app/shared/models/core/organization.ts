import { OrganizationType } from '../../../shared/models/core/organization-type';

export class Organization {

	public options:{} = {};

    constructor(public id?:number, 
		public organizationType?:OrganizationType,
		public abbreviation?:string,
		public name?:string,
		public domainUrl?:string,
		public googleAnalyticCode?:string,
		public organizationAdministrator?:boolean,
		public organizationTypeAdministrator?:boolean,
		public profile?:string) {
	}

}