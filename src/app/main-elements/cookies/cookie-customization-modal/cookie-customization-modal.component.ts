import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslationService } from 'src/app/services/translation.service';
import { CookieService } from 'src/app/services/cookie.service';

type CookieCategory = 'necessary' | 'functional' | 'statistics' | 'marketing';

@Component({
  selector: 'app-cookie-customization-modal',
  templateUrl: './cookie-customization-modal.component.html',
  styleUrls: ['./cookie-customization-modal.component.scss']
})
export class CookieCustomizationModalComponent implements OnInit {
  cookieForm: FormGroup;

  // Initialize with default values
  cookies = {
    necessary: true,
    functional: false,
    statistics: false,
    marketing: false
  };

  // Track visibility of details
  showDetails = {
    necessary: false,
    functional: false,
    statistics: false,
    marketing: false
  };

  constructor(
    private fb: FormBuilder,
    public translationService: TranslationService,
    private cookieService: CookieService
  ) {
    this.cookieForm = this.fb.group({
      necessary: [this.cookies.necessary],
      functional: [this.cookies.functional],
      statistics: [this.cookies.statistics],
      marketing: [this.cookies.marketing]
    });

    // Load cookie preferences
    this.loadPreferences();
  }

  ngOnInit() {
    if (this.cookies.statistics) {
      this.initializeAnalytics();
    }
  }

  initializeAnalytics() {
    // Google Analytics vagy más analitikai kód beillesztése
    console.log('Analytics initialized');
  }

  toggleDetails(category: CookieCategory) {
    this.showDetails[category] = !this.showDetails[category];
  }

  savePreferences() {
    this.cookies = this.cookieForm.value;
    console.log('Cookie preferences saved:', this.cookies);
    
    // Save cookies to the browser
    this.cookieService.setCookie('necessary', String(this.cookies.necessary), 365);
    this.cookieService.setCookie('functional', String(this.cookies.functional), 365);
    this.cookieService.setCookie('statistics', String(this.cookies.statistics), 365);
    this.cookieService.setCookie('marketing', String(this.cookies.marketing), 365);

    this.closeModal();
  }

  loadPreferences() {
    this.cookies.necessary = this.cookieService.getCookie('necessary') === 'true';
    this.cookies.functional = this.cookieService.getCookie('functional') === 'true';
    this.cookies.statistics = this.cookieService.getCookie('statistics') === 'true';
    this.cookies.marketing = this.cookieService.getCookie('marketing') === 'true';
    
    this.cookieForm.patchValue(this.cookies);
  }

  private closeModal() {
    const modal = document.querySelector('.modal') as HTMLElement;
    if (modal) {
      modal.style.display = 'none';
    }
  }
}
