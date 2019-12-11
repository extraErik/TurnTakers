import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyTurnTakersService } from 'src/app/services/my-turn-takers.service';
import { TurnTaker } from '../turnTaker.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  form: FormGroup;

  constructor(private myTurnTakers: MyTurnTakersService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(30)]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.maxLength(300)]
      }),
      participants: new FormControl(null),
      turnsTaken: new FormControl(null)
    });
  }

  onCreate() {
    console.log(this.form);
    const newTurnTaker = new TurnTaker(
      Math.floor(Math.random() * 9999).toString(),
      this.form.value.name,
      this.form.value.description,
      [],  // participants
      []   // turns taken
    );
    this.myTurnTakers.addTurnTaker(newTurnTaker);

    this.router.navigate(['/takers']);
  }

}
