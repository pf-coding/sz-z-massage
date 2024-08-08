import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslationService } from 'src/app/services/translation.service';
import { CookieService } from 'src/app/services/cookie.service';
import { GoogleAnalyticsService } from '@app/services/google-analytics.service';

type CookieCategory = 'necessary' | 'functional' | 'statistics' | 'marketing';

@Component({
  selector: 'app-cookie-customization-modal',
  templateUrl: './cookie-customization-modal.component.html',
  styleUrls: ['./cookie-customization-modal.component.scss'],
})
export class CookieCustomizationModalComponent implements OnInit {
  cookieForm: FormGroup;

  cookies = {
    necessary: true,
    functional: false,
    statistics: false,
    marketing: false,
  };

  showDetails = {
    necessary: false,
    functional: false,
    statistics: false,
    marketing: false,
  };

  constructor(
    private fb: FormBuilder,
    public translationService: TranslationService,
    private cookieService: CookieService,
    private googleAnalyticsService: GoogleAnalyticsService
  ) {
    this.cookieForm = this.fb.group({
      necessary: [this.cookies.necessary],
      functional: [this.cookies.functional],
      statistics: [this.cookies.statistics],
      marketing: [this.cookies.marketing],
    });

    this.loadPreferences();
  }

  ngOnInit() {
    this.googleAnalyticsService.setDefaultConsent();
    if (this.cookies.statistics) {
      this.initializeAnalytics();
    }
  }

  initializeAnalytics() {
    this.googleAnalyticsService.event('page_view', {
      page_title: document.title,
    });
  }

  toggleDetails(category: CookieCategory) {
    this.showDetails[category] = !this.showDetails[category];
  }

  onCheckboxChange(category: CookieCategory, event: Event) {
    const input = event.target as HTMLInputElement;
    this.cookieForm.get(category)?.setValue(input.checked);
  }

  savePreferences() {
    this.cookies.necessary = true; // Ensure necessary cookies are always true
    this.cookies = this.cookieForm.value;
    console.log('Cookie preferences saved:', this.cookies);

    // Convert boolean to string ('true' or 'false')
    const convertToString = (value: boolean) => (value ? 'true' : 'false');

    // Save cookies to the browser
    this.cookieService.setCookie(
      'necessary',
      convertToString(this.cookies.necessary),
      365
    );
    this.cookieService.setCookie(
      'functional',
      convertToString(this.cookies.functional),
      365
    );
    this.cookieService.setCookie(
      'statistics',
      convertToString(this.cookies.statistics),
      365
    );
    this.cookieService.setCookie(
      'marketing',
      convertToString(this.cookies.marketing),
      365
    );

    // Enable/Disable analytics based on user choice
    if (this.cookies.statistics) {
      this.initializeAnalytics();
    } else {
      this.googleAnalyticsService.disableAnalytics();
    }
  }

  loadPreferences() {
    this.cookies.necessary =
      this.cookieService.getCookie('necessary') === 'true';
    this.cookies.functional =
      this.cookieService.getCookie('functional') === 'true';
    this.cookies.statistics =
      this.cookieService.getCookie('statistics') === 'true';
    this.cookies.marketing =
      this.cookieService.getCookie('marketing') === 'true';

    this.cookieForm.patchValue(this.cookies);
  }
}
