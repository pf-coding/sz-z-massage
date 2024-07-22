import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { BootstrapCarouselComponent } from './main-elements/bootstrap-carousel/bootstrap-carousel.component';
import { AboutMeComponent } from './main-elements/about-me/about-me.component';
import { MassageStylesComponent } from './main-elements/massage-styles/massage-styles.component';
import { MassagePagesComponent } from './main-elements/massage-pages/massage-pages.component';
import { CookieNoticeComponent } from './main-elements/cookies/cookie-notice/cookie-notice.component';
import { CookieCustomizationModalComponent } from './main-elements/cookies/cookie-customization-modal/cookie-customization-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BorderDecorComponent } from './main-elements/border-decor/border-decor.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { RegFormComponent } from './main-elements/reg-form/reg-form.component';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './main-elements/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    BootstrapCarouselComponent,
    AboutMeComponent,
    MassageStylesComponent,
    MassagePagesComponent,
    CookieNoticeComponent,
    CookieCustomizationModalComponent,
    BorderDecorComponent,
    RegFormComponent,
    UserListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // Ez biztosítja a Firestore elérhetőségét
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
