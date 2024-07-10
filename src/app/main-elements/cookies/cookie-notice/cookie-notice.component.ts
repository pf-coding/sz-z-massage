import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-cookie-notice',
  templateUrl: './cookie-notice.component.html',
  styleUrls: ['./cookie-notice.component.scss'],
})
export class CookieNoticeComponent implements OnInit {
  cookiesAccepted = false;
  visible = true;
  allCookies: string[] = [];

  constructor(public translationService: TranslationService) {}

  ngOnInit() {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    this.cookiesAccepted = cookiesAccepted === 'true';

    if (this.cookiesAccepted) {
      this.hideNotice();
    }
  }

  acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    this.cookiesAccepted = true;
    this.hideNotice();
  }

  rejectCookies() {
    localStorage.setItem('cookiesAccepted', 'false');
    this.cookiesAccepted = false;
    this.hideNotice();
  }

  setCookies() {
    localStorage.setItem('cookiesAccepted', 'false');
    this.hideNotice();
  }

  private hideNotice() {
    this.visible = false;
  }

  changeLanguage(lang: string): void {
    this.translationService.setLang(lang);
  }
}
