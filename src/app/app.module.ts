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
import { RegFormComponent } from './main-elements/reg-form/reg-form.component';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './main-elements/user-list/user-list.component';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { UsersComponent } from './main-elements/users/users.component';
import { SignInComponent } from './main-elements/sign-in/sign-in.component';
import { PageNotFoundComponent } from './main-elements/page-not-found/page-not-found.component';
import { AuthService } from './services/auth-service.service';
import { firebaseConfig } from 'firebase-init';

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
    UsersComponent,
    SignInComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,

    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
