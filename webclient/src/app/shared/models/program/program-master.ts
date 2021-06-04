import { ProgramCategory } from '../../../shared/models/program/program-category';
import { ProgramType } from '../../../shared/models/program/program-type';

export class ProgramMaster {

	public options:{} = {};

    constructor(public id?:number, 
		public sequence?:number,
		public title?:string,
		public programCategory?:ProgramCategory,
		public programType?:ProgramType,
		public description?:string,
		public objective?:string,
		public targetParticipants?:string,
		public programPrerequisites?:string,
		public deliveryMode?:string,
		public moreInfo?:string) {
	}

}