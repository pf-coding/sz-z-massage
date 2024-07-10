import { NgModule } from '@angular/core';
import { RouterModule, Routes, Scroll } from '@angular/router';
import { MassageStylesComponent } from './main-elements/massage-styles/massage-styles.component';
import { MassagePagesComponent } from './main-elements/massage-pages/massage-pages.component';

const routes: Routes = [
  { path: '', component: MassageStylesComponent },
  { path: 'massage-pages/:pageName', component: MassagePagesComponent },
  { path: '**', redirectTo: '' }, // Wildcard route for a 404 page
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
