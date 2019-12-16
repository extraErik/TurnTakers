import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TakersPage } from './takers.page';

const routes: Routes = [
  {
    path: '',
    component: TakersPage
  },
  {
    path: 'detail',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TakersPageRoutingModule {}
