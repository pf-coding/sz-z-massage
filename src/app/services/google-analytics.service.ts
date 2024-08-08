import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  constructor() {}

  public setDefaultConsent() {
    console.log('Setting default consent...');
    (window as any).gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    });
  }

  public updateConsentState(consentState: any) {
    console.log('Updating consent state:', consentState);
    (window as any).gtag('consent', 'update', consentState);
  }

  public event(action: string, params: any) {
    console.log('Logging event:', action, params);
    (window as any).gtag('event', action, params);
  }
}
