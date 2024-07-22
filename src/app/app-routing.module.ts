import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MassageStylesComponent } from './main-elements/massage-styles/massage-styles.component';
import { MassagePagesComponent } from './main-elements/massage-pages/massage-pages.component';
import { UserListComponent } from './main-elements/user-list/user-list.component'; // Importáld a UserListComponent-et

const routes: Routes = [
  { path: '', component: UserListComponent },
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
