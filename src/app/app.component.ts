import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CookieService } from './services/cookie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'sz-z-massage';
  isMassagePageActive = false;

  constructor(private router: Router, private cookieService: CookieService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isMassagePageActive = this.router.url.includes('/massage-pages/');
      }
    });
  }

  ngOnInit() {
    this.cookieService.auditCookies();
  }
}
