import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
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
import { FormsModule } from '@angular/forms';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
