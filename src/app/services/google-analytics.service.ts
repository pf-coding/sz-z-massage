import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  constructor() {}

  public setDefaultConsent() {
    (window as any).gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    });
  }

  public updateConsentState(consentState: any) {
    (window as any).gtag('consent', 'update', consentState);
  }

  public event(action: string, params: any) {
    (window as any).gtag('event', action, params);
  }
}
