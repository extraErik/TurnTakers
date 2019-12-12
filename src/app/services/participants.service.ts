import { Injectable } from '@angular/core';
import { Participant } from '../takers/participant.model';

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {

  private myParticipants: Array<Participant> = [];

  constructor() { }

  setParticipants(participants: Array<Participant>) {
    this.myParticipants = participants;
  }

  getAllParticipants() {
    if (!this.myParticipants) {
      // TODO: change this to retrieve from persistent storage, Firebase or something
      this.myParticipants = this.createDummyParticipants();
    }
    return this.myParticipants;
  }

  getParticipant(participantId) {
    // TODO: filter this.myTurnTakers, get the one with matching ID and return it
    return this.myParticipants.filter((participant) => {
      return participant.id === participantId;
    })[0];
  }

  getParticipantName(participantId: string) {
    return this.myParticipants.find(item => item.id === participantId).name;
  }

  getParticipantNames(participantIds: Array<string>) {
    return participantIds.map((participantId) => {
      return this.myParticipants.find(item => item.id === participantId).name;
    });
  }

  addParticipant(participant) {
    this.myParticipants.push(participant);
  }

  // TODO: remove after we integrate with persistent storage
  createDummyParticipants() {
    const dummyParticipants = [
      { id: 'aaa', name: 'Erik' },
      { id: 'bbb', name: 'Meghan' },
      { id: 'ccc', name: 'Evan' },
      { id: 'ddd', name: 'Gillian' },
      { id: 'eee', name: 'Colin'},
      { id: 'fff', name: 'Kiri' },
      { id: 'ddd', name: 'Hiro'}
    ];
    return dummyParticipants;
  }
}
