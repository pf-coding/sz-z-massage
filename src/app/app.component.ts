import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CookieService } from './services/cookie.service';
import { AuthService } from './services/auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'sz-z-massage';
  isMassagePageActive = false;
  isAdminPageActive = false;
  isLoggedIn: boolean | null = null;
  private authSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private authService: AuthService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isMassagePageActive = this.router.url.includes('/massage-pages/');
        console.log('isMassagePageActive:', this.isMassagePageActive);
      }
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isAdminPageActive = this.router.url.includes('users');
        console.log('isUserPageActive:', this.isAdminPageActive);
      }
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isAdminPageActive = this.router.url.includes('users');
        console.log('isUserPageActive:', this.isAdminPageActive);
      }
    });
  }

  ngOnInit() {
    this.cookieService.auditCookies();
    this.authSubscription = this.authService.loggedInStatus$.subscribe(
      (status) => {
        this.isLoggedIn = status;
      }
    );
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
  }

  navigateToUsers() {
    this.router.navigate(['/users']);
  }
}
