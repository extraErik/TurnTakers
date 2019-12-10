import { Participant } from './participant.model';

export class Turn {
    constructor(
      public index: number,
      public dateTime: Date,
      public participantId: string,
      public note: string
    ) {}
  }