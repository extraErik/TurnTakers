import { Turn } from './turn.model';
import { Participant } from './participant.model';

export class TurnTaker {
    constructor(
      public id: string,
      public name: string,
      public description: string,
      public participants: Array<Participant> = [],
      public turnsTaken: Array<Turn> = []
    ) {}
  }