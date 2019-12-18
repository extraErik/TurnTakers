import { Component, OnInit } from '@angular/core';
import { ParticipantsService } from 'src/app/services/participants.service';
import { Participant } from 'src/app/takers/participant.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  availableParticipants: Participant[];

  constructor(
    private participantsService: ParticipantsService
  ) { }

  ngOnInit() {
    this.availableParticipants = this.participantsService.getAllParticipants();
  }

  newParticipant() {
    console.log('TODO: create a way to add new participant');
  }

}
