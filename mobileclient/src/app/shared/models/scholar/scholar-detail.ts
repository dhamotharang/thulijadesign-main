import { Scholar } from '../../../shared/models/scholar/scholar';
import { MaritalStatus } from '../../../shared/models/general/marital-status';
import { Race } from '../../../shared/models/general/race';
import { Religion } from '../../../shared/models/general/religion';

export class ScholarDetail {

	public options:{} = {};

    constructor(public id?:number, 
		public scholar?:Scholar,
		public dateOfBirth?:Date,
		public age?:number,
		public maritalStatus?:MaritalStatus,
		public dependents?:number,
		public race?:Race,
		public religion?:Religion,
		public passportNumber?:string,
		public visaNumber?:string,
		public visaIssueDate?:Date,
		public visaExpiryDate?:Date) {
	}

}