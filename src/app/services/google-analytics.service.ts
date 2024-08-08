import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

declare let gtag: Function;

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-77T9302X0V', {
          page_path: event.urlAfterRedirects,
        });
      }
    });
  }

  public event(eventName: string, params: { [key: string]: any }) {
    gtag('event', eventName, params);
  }
}
