import { Component, OnInit } from '@angular/core';
import { ParticipantsService } from 'src/app/services/participants.service';
import { Participant } from 'src/app/takers/participant.model';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.page.html',
  styleUrls: ['./participants.page.scss'],
})
export class ParticipantsPage implements OnInit {

  availableParticipants: Participant[];

  constructor(
    private participantsService: ParticipantsService
  ) { }

  ngOnInit() {
    this.availableParticipants = this.participantsService.getAllParticipants();
  }

}
