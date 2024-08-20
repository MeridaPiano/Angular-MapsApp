import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapsModule } from './maps/maps.module';

const routes: Routes = [
  {
    path: 'maps',
    loadChildren: () => import('./maps/maps.module' ).then( m => m.MapsModule)
  },
  {
    path: 'alone',
    loadComponent: () => import('./alone/pages/alone-pages/alone-pages.component' ).then( m => m.AlonePagesComponent ),
  },
  {
    path: '**',
    redirectTo: 'maps',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
