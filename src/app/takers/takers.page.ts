import { Component, OnInit } from '@angular/core';
import { TurnTaker } from './turnTaker.model';
import { Turn } from './turn.model';
import { Participant } from './participant.model';
import { MyTurnTakersService } from '../services/my-turn-takers.service';

@Component({
  selector: 'app-takers',
  templateUrl: './takers.page.html',
  styleUrls: ['./takers.page.scss'],
})
export class TakersPage implements OnInit {

  items: Array<TurnTaker> = [];
  availableParticipants: Array<Participant> = [];

  constructor(private myTurnTakers: MyTurnTakersService) { }

  ngOnInit() {
    const dummyTurnTaker1 = new TurnTaker(
      '1',
      'TurnTaker One',
      'This is the first TurnTaker',
      [
        new Participant('a', 'Erik'),
        new Participant('b', 'Meghan')
      ],
      [
        new Turn(1, new Date(), 'a', null),
        new Turn(2, new Date(), 'b', null)
      ]
    );
    const dummyTurnTaker2 = new TurnTaker(
      '2',
      'TurnTaker Two',
      'This is the second TurnTaker',
      [
        new Participant('c', 'Evan'),
        new Participant('d', 'Gillian'),
        new Participant('e', 'Colin')
      ],
      [
        new Turn(1, new Date(), 'c', null),
        new Turn(2, new Date(), 'd', null),
        new Turn(3, new Date(), 'e', null)
      ]
    );
    const dummyTurnTaker3 = new TurnTaker(
      '3',
      'TurnTaker Three',
      'This is the third TurnTaker',
      [
        new Participant('f', 'Kiri'),
        new Participant('g', 'Hiro')
      ],
      [
        new Turn(2, new Date(), 'f', null),
        new Turn(3, new Date(), 'g', null)
      ]
    );

    this.items.push(dummyTurnTaker1);
    this.items.push(dummyTurnTaker2);
    this.items.push(dummyTurnTaker3);

    this.myTurnTakers.setMyTurnTakers(this.items);

  }

}
