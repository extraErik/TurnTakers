import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPageRoutingModule } from './detail-routing.module';

import { DetailPage } from './detail.page';
import { ParticipantDisplayComponent } from 'src/app/popovers/participant-display/participant-display.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPageRoutingModule
  ],
  declarations: [DetailPage, ParticipantDisplayComponent],
  entryComponents: [ParticipantDisplayComponent]
})
export class DetailPageModule {}
