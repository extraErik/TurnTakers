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

  constructor(
    private formBuilder: FormBuilder,
    private myTurnTakers: MyTurnTakersService,
    private router: Router,
    private participantsService: ParticipantsService
  ) {

    this.availableParticipants = this.participantsService.getAllParticipants();
    console.log(this.availableParticipants);

    this.form = this.formBuilder.group({
      name: '',
      description: '',
      participants: new FormArray([]),
      // turnsTakern: []
    });
    console.log('form as seen right after formbuilder creation:');
    console.log(this.form);
    this.addCheckboxes();
  }

  ngOnInit() {
    // this.form = new FormGroup({
    //   name: new FormControl(null, {
    //     updateOn: 'blur',
    //     validators: [Validators.required, Validators.maxLength(30)]
    //   }),
    //   description: new FormControl(null, {
    //     updateOn: 'blur',
    //     validators: [Validators.maxLength(300)]
    //   }),
    //   participants: new FormControl(null),
    //   turnsTaken: new FormControl(null)
    // });
  }

  private addCheckboxes() {
    this.availableParticipants.forEach((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.form.controls.participants as FormArray).push(control);
    });
  }

  onCreate() {

    console.log(this.form);

    const selectedParticipantIds = this.form.value.participants
      .map((v, i) => v ? this.availableParticipants[i].id : null)
      .filter(v => v !== null);
    console.log(selectedParticipantIds);

    
    const newTurnTaker = new TurnTaker(
      Math.floor(Math.random() * 9999).toString(),
      this.form.value.name,
      this.form.value.description,
      selectedParticipantIds,
      []   // turns taken
    );
    this.myTurnTakers.addTurnTaker(newTurnTaker);

    this.router.navigate(['/takers']);
  }

}
