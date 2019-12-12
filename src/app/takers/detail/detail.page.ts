import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { MyTurnTakersService } from 'src/app/services/my-turn-takers.service';
import { TurnTaker } from '../turnTaker.model';
import { ParticipantsService } from 'src/app/services/participants.service';
import { Participant } from '../participant.model';
import { Turn } from '../turn.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  availableParticipants: Participant[];
  turnTaker: TurnTaker;
  participantNames: string[];
  numTurnsTaken = 0;
  turnHistory: Array<Turn>; // this will just be turns array from turnTaker, in reverse order

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private myTurnTakers: MyTurnTakersService,
    private participantsService: ParticipantsService
  ) { }

  ngOnInit() {

    this.availableParticipants = this.participantsService.getAllParticipants();

    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        this.navCtrl.navigateBack('/takers');
        return;
      }
      const takerId = paramMap.get('id');
      this.turnTaker = this.myTurnTakers.getMyTurnTaker(takerId);
      this.participantNames = this.participantsService.getParticipantNames(this.turnTaker.participants);
      this.turnHistory = this.turnTaker.turnsTaken.reverse();
      this.numTurnsTaken = this.turnTaker.turnsTaken.length;
    });
  }

  getParticipantName(participantId) {
    return this.participantsService.getParticipantName(participantId);
  }

  // TODO: should this be moved to the participantService?
  getLastTurnParticipant() {
    const lastTurnTaken = this.turnTaker.turnsTaken.slice(-1)[0];
    const lastParticipantId = lastTurnTaken.participantId;
    return this.availableParticipants.find(participant => participant.id === lastParticipantId);
  }

  // TODO: should this be moved to the participantService?
  getNextTurnParticipant() {
    const lastTurnTaken = this.turnTaker.turnsTaken.slice(-1)[0];
    const lastParticipantIndex = this.turnTaker.participants.findIndex(item => item === lastTurnTaken.participantId);
    const nextParticipantIndex = (lastParticipantIndex === this.turnTaker.participants.length - 1) ? 0 : lastParticipantIndex + 1;
    const nextParticipantId = this.turnTaker.participants[nextParticipantIndex];
    return this.availableParticipants.find(participant => participant.id === nextParticipantId);
  }

  // TODO: should this be moved to the participantService?
  getTurnAfterNextTurnParticipant() {
    const lastTurnTaken = this.turnTaker.turnsTaken.slice(-1)[0];
    const lastParticipantIndex = this.turnTaker.participants.findIndex(item => item === lastTurnTaken.participantId);

    const nextParticipantIndex = (lastParticipantIndex === this.turnTaker.participants.length - 1) ? 0 : lastParticipantIndex + 1;

    //TODO: surely this could be done more elegantly
    const nextNextParticipantIndex = (nextParticipantIndex === this.turnTaker.participants.length - 1) ? 0 : nextParticipantIndex + 1;

    const nextNextParticipantId = this.turnTaker.participants[nextNextParticipantIndex];

    return this.availableParticipants.find(participant => participant.id === nextNextParticipantId);
  }
}
