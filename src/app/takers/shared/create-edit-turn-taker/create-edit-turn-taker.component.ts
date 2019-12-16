import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Participant } from '../../participant.model';
import { MyTurnTakersService } from 'src/app/services/my-turn-takers.service';
import { Router } from '@angular/router';
import { ParticipantsService } from 'src/app/services/participants.service';
import { TurnTaker } from '../../turnTaker.model';

@Component({
  selector: 'app-create-edit-turn-taker',
  templateUrl: './create-edit-turn-taker.component.html',
  styleUrls: ['./create-edit-turn-taker.component.scss'],
})
export class CreateEditTurnTakerComponent implements OnInit {

  form: FormGroup;
  availableParticipants: Array<Participant>;
  selectedParticipantList: Array<string> = [];
  participantListForDisplay = '';

  @Input() editTaker?: TurnTaker;
  takerName = '';
  takerDescription = '';

  constructor(
    private formBuilder: FormBuilder,
    private myTurnTakers: MyTurnTakersService,
    private router: Router,
    private participantsService: ParticipantsService
  ) {

    this.availableParticipants = this.participantsService.getAllParticipants();

    // // If edit mode, prepopulate inputs
    // if (this.editTaker) {
    //   this.takerName = this.editTaker.name;
    //   this.takerDescription = this.editTaker.description;
    // }

    // console.log('takerName: ' + this.takerName);
    // console.log('takerDescription: ' + this.takerDescription);

    // this.form = this.formBuilder.group({
    //   name: [this.takerName, Validators.required],
    //   description: this.takerDescription,
    //   participants: new FormArray([]),
    //   // turnsTakern: []
    // });
    // this.addCheckboxes();
  }

  ngOnInit() {
    if (this.editTaker) {
      console.log('editing TurnTaker id ' + this.editTaker.id);
    } else {
      console.log('no turnTaker to edit, assuming create mode');
    }

    // If edit mode, prepopulate inputs
    if (this.editTaker) {
      this.takerName = this.editTaker.name;
      this.takerDescription = this.editTaker.description;
    }

    console.log('takerName: ' + this.takerName);
    console.log('takerDescription: ' + this.takerDescription);

    this.form = this.formBuilder.group({
      name: [this.takerName, Validators.required],
      description: this.takerDescription,
      participants: new FormArray([]),
      // turnsTakern: []
    });
    this.addCheckboxes();
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
    this.participantListForDisplay = this.selectedParticipantList.join(' \u2192 '); // joined by right arrow
  }

  onCreate() {

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
