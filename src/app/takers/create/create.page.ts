import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MyTurnTakersService } from 'src/app/services/my-turn-takers.service';
import { TurnTaker } from '../turnTaker.model';
import { Router } from '@angular/router';
import { ParticipantsService } from 'src/app/services/participants.service';
import { Participant } from '../participant.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  form: FormGroup;
  availableParticipants: Array<Participant>;
  selectedParticipantList: Array<string> = [];
  participantListForDisplay = '';

  constructor(
    private formBuilder: FormBuilder,
    private myTurnTakers: MyTurnTakersService,
    private router: Router,
    private participantsService: ParticipantsService
  ) {

    this.availableParticipants = this.participantsService.getAllParticipants();

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: '',
      participants: new FormArray([]),
      // turnsTakern: []
    });
    this.addCheckboxes();
  }

  ngOnInit() {
  }

  private addCheckboxes() {
    this.availableParticipants.forEach((o, i) => {
      const control = new FormControl();
      (this.form.controls.participants as FormArray).push(control);
    });
  }

  onCheckboxBlur() {
    console.log('checkbox blur');
  }

  participantClicked(event: any, availableParticipantIndex: any) {
    const availableParticipantName = this.availableParticipants[availableParticipantIndex].name;
    if (this.form.controls.participants.value[availableParticipantIndex] !== true) {
      // TODO: in line above: !== true meaning it's about to change to true...is there a better way here?
      this.selectedParticipantList.push(availableParticipantName);
    } else {
      if (this.selectedParticipantList) {
        this.selectedParticipantList = this.selectedParticipantList.filter(item => {
          return item !== availableParticipantName;
        });
      }
    }
    console.log('new selectedParticipantList: ' + this.selectedParticipantList);
    this.participantListForDisplay = this.selectedParticipantList.join(' \u2192 '); // joined by right arrow
  }

  onCreate() {

    console.log(this.form);

    // const selectedParticipantIds = this.form.value.participants
    //   .map((v, i) => v ? this.availableParticipants[i].id : null)
    //   .filter(v => v !== null);
    // console.log(selectedParticipantIds);

    const newTurnTaker = new TurnTaker(
      Math.floor(Math.random() * 9999).toString(),
      this.form.value.name,
      this.form.value.description,

      // selectedParticipantIds,
      this.selectedParticipantList.map(
        (selectedName, index) => {
          return this.availableParticipants.find(
            item => {
              return item.name === selectedName;
          }).id;
        }
      ),

      []   // turns taken
    );
    this.myTurnTakers.addTurnTaker(newTurnTaker);

    this.router.navigate(['/takers']);
  }

}
