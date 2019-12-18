import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CreateEditTurnTakerComponent } from './create-edit-turn-taker/create-edit-turn-taker.component';
import { CreateEditParticipantComponent } from './create-edit-participant/create-edit-participant.component';

@NgModule({
  declarations: [CreateEditTurnTakerComponent, CreateEditParticipantComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule
  ],
  exports: [CreateEditTurnTakerComponent, CreateEditParticipantComponent]
})
export class SharedModule { }
