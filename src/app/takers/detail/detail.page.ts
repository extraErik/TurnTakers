import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { MyTurnTakersService } from 'src/app/services/my-turn-takers.service';
import { TurnTaker } from '../turnTaker.model';
import { ParticipantsService } from 'src/app/services/participants.service';
import { Participant } from '../participant.model';
import { Turn } from '../turn.model';
//import { ParticipantDisplayComponent } from 'src/app/popovers/participant-display/participant-display.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  availableParticipants: Participant[];
  turnTaker: TurnTaker;
  participantNames: string[];
  participantListForDisplay = '';
  numTurnsTaken = 0;
  turnNote: string = null;
  turnHistory: Array<Turn>; // this will just be turns array from turnTaker, in reverse order

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private myTurnTakers: MyTurnTakersService,
    private participantsService: ParticipantsService,
    public popoverController: PopoverController
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
      this.participantListForDisplay = this.participantNames.join(' \u2192 '); // joined by right arrow
      this.turnHistory = [...this.turnTaker.turnsTaken].reverse();
      this.numTurnsTaken = this.turnTaker.turnsTaken.length;
    });
  }

  // async displayParticipants(ev: any) {
  //   const popover = await this.popoverController.create({
  //     component: ParticipantDisplayComponent,
  //     event: ev,
  //     translucent: false,
  //     componentProps: { participants: this.participantNames },
  //   });
  //   return await popover.present();
  // }

  getParticipantName(participantId) {
    return this.participantsService.getParticipantName(participantId);
  }

  // TODO: should this be moved to the participantService?
  getLastTurnParticipant() {
    if (!this.turnTaker.turnsTaken || this.turnTaker.turnsTaken.length <= 0) {
      return {id: -1, name: 'N/A'};
    }
    const lastTurnTaken = this.turnTaker.turnsTaken.slice(-1)[0];
    const lastParticipantId = lastTurnTaken.participantId;
    return this.availableParticipants.find(participant => participant.id === lastParticipantId);
  }

  // TODO: should this be moved to the participantService?
  getNextTurnParticipant() {
    let lastTurnTaken: Turn;
    let lastParticipantIndex: number;
    let nextParticipantIndex: number;
    if (this.turnTaker.turnsTaken && this.turnTaker.turnsTaken.length > 0) {
      lastTurnTaken = this.turnTaker.turnsTaken.slice(-1)[0];
      lastParticipantIndex = this.turnTaker.participants.findIndex(item => item === lastTurnTaken.participantId);
      nextParticipantIndex = (lastParticipantIndex === this.turnTaker.participants.length - 1) ? 0 : lastParticipantIndex + 1;
    } else {
      nextParticipantIndex = 0;
    }
    const nextParticipantId = this.turnTaker.participants[nextParticipantIndex];
    return this.availableParticipants.find(participant => participant.id === nextParticipantId);
  }

  // TODO: should this be moved to the participantService?
  getTurnAfterNextTurnParticipant() {
    let lastTurnTaken: Turn;
    let lastParticipantIndex: number;
    let nextParticipantIndex: number;
    let nextNextParticipantIndex: number;
    if (this.turnTaker.turnsTaken && this.turnTaker.turnsTaken.length > 0) {
      lastTurnTaken = this.turnTaker.turnsTaken.slice(-1)[0];
      lastParticipantIndex = this.turnTaker.participants.findIndex(item => item === lastTurnTaken.participantId);
      nextParticipantIndex = (lastParticipantIndex === this.turnTaker.participants.length - 1) ? 0 : lastParticipantIndex + 1;
      //TODO: surely this could be done more elegantly
      nextNextParticipantIndex = (nextParticipantIndex === this.turnTaker.participants.length - 1) ? 0 : nextParticipantIndex + 1;
    } else {
      nextNextParticipantIndex = (this.turnTaker.participants.length > 1) ? 1 : 0;
    }
    const nextNextParticipantId = this.turnTaker.participants[nextNextParticipantIndex];
    return this.availableParticipants.find(participant => participant.id === nextNextParticipantId);
  }

  onTakeTurn() {
    const newTurn = new Turn(new Date(), this.getNextTurnParticipant().id, this.turnNote, false);

    this.turnTaker.turnsTaken.push(newTurn);
    this.turnTaker.turnsTaken = [...this.turnTaker.turnsTaken]; // to force change detection

    this.turnHistory = [...this.turnTaker.turnsTaken].reverse();

    this.myTurnTakers.updateTurnTaker(this.turnTaker);

    this.turnNote = null;
    console.log(this.turnTaker);
  }

  // TODO: make this more DRY
  onSkipTurn() {

    const newTurn = new Turn(new Date(), this.getNextTurnParticipant().id, this.turnNote, true);

    this.turnTaker.turnsTaken.push(newTurn);
    this.turnTaker.turnsTaken = [...this.turnTaker.turnsTaken]; // to force change detection

    this.turnHistory = [...this.turnTaker.turnsTaken].reverse();

    this.myTurnTakers.updateTurnTaker(this.turnTaker);

    this.turnNote = null;
    console.log(this.turnTaker);
  }
}
