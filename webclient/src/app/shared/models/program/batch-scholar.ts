import { Scholar } from '../../../shared/models/scholar/scholar';
import { Batch } from '../../../shared/models/program/batch';

export class BatchScholar {

	public options:{} = {};

    constructor(public id?:number, 
		public batch?:Batch,
		public scholar?:Scholar) {
	}

}