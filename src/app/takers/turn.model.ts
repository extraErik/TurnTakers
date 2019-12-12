import { Participant } from './participant.model';

export class Turn {
    constructor(
      public dateTime: Date,
      public participantId: string,
      public note: string
    ) {}
  }