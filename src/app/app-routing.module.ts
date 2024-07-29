import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './main-elements/sign-in/sign-in.component';
import { MassagePagesComponent } from './main-elements/massage-pages/massage-pages.component';
import { RegFormComponent } from './main-elements/reg-form/reg-form.component';
import { UsersComponent } from './main-elements/users/users.component';
import { PageNotFoundComponent } from './main-elements/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
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
  { path: '**', component: PageNotFoundComponent },
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
