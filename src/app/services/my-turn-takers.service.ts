import { Injectable } from '@angular/core';
import { TurnTaker } from '../takers/turnTaker.model';

@Injectable({
  providedIn: 'root'
})
export class MyTurnTakersService {

  private myTurnTakers: Array<TurnTaker> = [];

  constructor() { }

  setMyTurnTakers(takers: Array<TurnTaker>) {
    this.myTurnTakers = takers;
  }

  getMyTurnTakers() {
    return this.myTurnTakers;
  }

  getMyTurnTaker(takerId) {
    // TODO: filter this.myTurnTakers, get the one with matching ID and return it
    return this.myTurnTakers.filter((taker) => {
      return taker.id === takerId;
    })[0];
  }

  addTurnTaker(taker: TurnTaker) {
    this.myTurnTakers.push(taker);
    console.log('in service, num turntakers is now ' + this.myTurnTakers.length);
  }

  updateTurnTaker(taker: TurnTaker) {
    const index = this.myTurnTakers.findIndex(item => item.id === taker.id);
    if (index !== -1) {
      this.myTurnTakers[index] = taker;
    }
  }
}
