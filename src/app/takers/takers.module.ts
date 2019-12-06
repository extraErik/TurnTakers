import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TakersPageRoutingModule } from './takers-routing.module';

import { TakersPage } from './takers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TakersPageRoutingModule
  ],
  declarations: [TakersPage]
})
export class TakersPageModule {}
