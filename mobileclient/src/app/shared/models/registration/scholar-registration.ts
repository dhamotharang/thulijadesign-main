import { OrganizationType } from '../../../shared/models/core/organization-type';
import { Organization } from '../../../shared/models/core/organization';
import { Branch } from '../../../shared/models/core/branch';
import { Department } from '../../../shared/models/core/department';
import { User } from '../../../shared/models/core/user';
import { Salutation } from '../../../shared/models/general/salutation';
import { Gender } from '../../../shared/models/general/gender';
import { Scholar } from '../../../shared/models/scholar/scholar';

export class ScholarRegistration {

	public options:{} = {};

    constructor(public id?:number, 
		public organization?:Organization,
		public branch?:Branch,
		public department?:Department,
		public salutation?:Salutation,
		public firstName?:string,
		public lastName?:string,
		public icNumber?:string,
		public gender?:Gender,
		public handphoneNumber?:string,
		public emailAddress?:string,
		public password?:string,
		public status?:string) {
	}

}