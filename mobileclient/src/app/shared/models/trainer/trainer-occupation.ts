import { Trainer } from '../../../shared/models/trainer/trainer';
import { Qualification } from '../../../shared/models/general/qualification';
import { State } from '../../../shared/models/general/state';
import { Country } from '../../../shared/models/general/country';
import { PositionLevel } from '../../../shared/models/general/position-level';

export class TrainerOccupation {

	public options:{} = {};

    constructor(public id?:number, 
		public trainer?:Trainer,
		public positionTitle?:string,
		public companyName?:string,
		public startDate?:Date,
		public endDate?:Date,
		public specialization?:string,
		public jobRole?:string,
		public industry?:string,
		public positionLevel?:PositionLevel,
		public salary?:number,
		public description?:string) {
	}

}