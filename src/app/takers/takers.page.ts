import { Component, OnInit } from '@angular/core';
import { TurnTaker } from './turnTaker.model';
import { Turn } from './turn.model';
import { Participant } from './participant.model';
import { MyTurnTakersService } from '../services/my-turn-takers.service';
import { ParticipantsService } from '../services/participants.service';

@Component({
  selector: 'app-takers',
  templateUrl: './takers.page.html',
  styleUrls: ['./takers.page.scss'],
})
export class TakersPage implements OnInit {

  items: Array<TurnTaker> = [];
  availableParticipants: Array<Participant> = [];
  availableParticipantNamesForDisplay: string;

  constructor(private myTurnTakers: MyTurnTakersService, private myParticipants: ParticipantsService) { }

  ngOnInit() {

    this.availableParticipants = this.createDummyParticipants();
    this.availableParticipantNamesForDisplay = this.availableParticipants.map(participant => {
      return participant.name;
    }).join(', ');

    this.myParticipants.setParticipants(this.availableParticipants);

    const dummyTurnTaker1 = new TurnTaker(
      '1',
      'TurnTaker One',
      'This is the first TurnTaker',
      ['aaa', 'bbb'], // participant IDs
      [
        new Turn(new Date(), 'aaa', null, false),
        new Turn(new Date(), 'bbb', null, false)
      ]
    );
    const dummyTurnTaker2 = new TurnTaker(
      '2',
      'TurnTaker Two',
      'This is the second TurnTaker',
      ['ccc','ddd','eee'], // participant IDs
      [
        new Turn(new Date(), 'ccc', null, false),
        new Turn(new Date(), 'ddd', null, false),
        new Turn(new Date(), 'eee', null, false)
      ]
    );
    const dummyTurnTaker3 = new TurnTaker(
      '3',
      'TurnTaker Three',
      'This is the third TurnTaker',
      ['fff','ggg'], // participant IDs
      [
        new Turn(new Date(), 'fff', null, false),
        new Turn(new Date(), 'ggg', null, false)
      ]
    );

    this.items.push(dummyTurnTaker1);
    this.items.push(dummyTurnTaker2);
    this.items.push(dummyTurnTaker3);

    this.myTurnTakers.setMyTurnTakers(this.items);

  }

  ionViewWillEnter() {
    this.items = [...this.myTurnTakers.getMyTurnTakers()]; // spread to force change detection
  }

  createDummyParticipants() {
    return [
      new Participant('aaa', 'Erik'),
      new Participant('bbb', 'Meghan'),
      new Participant('ccc', 'Evan'),
      new Participant('ddd', 'Gillian'),
      new Participant('eee', 'Colin'),
      new Participant('fff', 'Kiri'),
      new Participant('ggg', 'Hiro')
    ];
  }


}
