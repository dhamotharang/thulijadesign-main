import { ProgramMaster } from '../../../shared/models/program/program-master';
import { TrainingDelivery } from '../../../shared/models/program/training-delivery';
import { TrainingMode } from '../../../shared/models/program/training-mode';

export class Program {

	public options:{} = {};

    constructor(public id?:number, 
		public programMaster?:ProgramMaster,
		public trainingDelivery?:TrainingDelivery,
		public trainingMode?:TrainingMode) {
	}

}