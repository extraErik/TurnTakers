import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { MyTurnTakersService } from 'src/app/services/my-turn-takers.service';
import { TurnTaker } from '../turnTaker.model';
import { ParticipantsService } from 'src/app/services/participants.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  turnTaker: TurnTaker;
  participantNames: string[];
  numTurnsTaken = 0;

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private myTurnTakers: MyTurnTakersService,
    private participantsService: ParticipantsService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        this.navCtrl.navigateBack('/takers');
        return;
      }
      const takerId = paramMap.get('id');
      this.turnTaker = this.myTurnTakers.getMyTurnTaker(takerId);
      this.participantNames = this.participantsService.getParticipantNames(this.turnTaker.participants);
      this.numTurnsTaken = this.turnTaker.turnsTaken.length;
      this.slideOpts.initialSlide = this.numTurnsTaken - 1;
 
    });
  }

  getParticipantName(participantId) {
    return this.participantsService.getParticipantName(participantId);
  }

}
