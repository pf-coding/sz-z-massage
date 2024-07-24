import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MassagePagesComponent } from './main-elements/massage-pages/massage-pages.component';
import { RegFormComponent } from './main-elements/reg-form/reg-form.component';
import { UsersComponent } from './main-elements/users/users.component';

const routes: Routes = [
  { path: 'regform', component: RegFormComponent },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      { path: ':id', component: RegFormComponent },
      { path: ':id/edit', component: RegFormComponent },
    ],
  },
  { path: 'massage-pages/:pageName', component: MassagePagesComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
