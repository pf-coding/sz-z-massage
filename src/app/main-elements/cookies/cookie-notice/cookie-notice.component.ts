import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/services/translation.service';
import { CookieService } from 'src/app/services/cookie.service';
import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service';

@Component({
  selector: 'app-cookie-notice',
  templateUrl: './cookie-notice.component.html',
  styleUrls: ['./cookie-notice.component.scss'],
})
export class CookieNoticeComponent implements OnInit {
  cookiesAccepted = false;
  visible = true;

  constructor(
    public translationService: TranslationService,
    private cookieService: CookieService,
    private googleAnalyticsService: GoogleAnalyticsService
  ) {}

  ngOnInit() {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    this.cookiesAccepted = cookiesAccepted === 'true';

    if (this.cookiesAccepted) {
      this.applyCookies();
      this.hideNotice();
    }
  }

  acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    this.cookiesAccepted = true;
    this.applyCookies();
    this.hideNotice();
  }

  rejectCookies() {
    localStorage.setItem('cookiesAccepted', 'false');
    this.cookiesAccepted = false;
    this.applyCookies();
    this.hideNotice();
  }

  setCookies() {
    localStorage.setItem('cookiesAccepted', 'false');
    this.applyCookies();
    this.hideNotice();
  }

  private hideNotice() {
    this.visible = false;
  }

  private applyCookies() {
    if (this.cookiesAccepted) {
      this.cookieService.setCookie('necessary', 'true', 365);
      this.cookieService.setCookie('functional', 'true', 365);
      this.cookieService.setCookie('statistics', 'true', 365);
      this.cookieService.setCookie('marketing', 'true', 365);
      this.googleAnalyticsService.updateConsentState({
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted',
      });
    } else {
      this.cookieService.deleteCookie('functional');
      this.cookieService.deleteCookie('statistics');
      this.cookieService.deleteCookie('marketing');
      this.googleAnalyticsService.updateConsentState({
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
      });
    }
  }

  changeLanguage(lang: string): void {
    this.translationService.setLang(lang);
  }
}
