import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'takers', pathMatch: 'full' },
  {
    path: 'takers',
    loadChildren: () => import('./takers/takers.module').then( m => m.TakersPageModule)
  },
  {
    path: 'participants',
    loadChildren: () => import('./participants/participants.module').then( m => m.ParticipantsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
