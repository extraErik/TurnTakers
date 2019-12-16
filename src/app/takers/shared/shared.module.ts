import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CreateEditTurnTakerComponent } from './create-edit-turn-taker/create-edit-turn-taker.component';

@NgModule({
  declarations: [CreateEditTurnTakerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule
  ],
  exports: [CreateEditTurnTakerComponent]
})
export class SharedModule { }
