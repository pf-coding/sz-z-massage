import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CookieService } from './services/cookie.service';
import { AuthService } from './services/auth-service.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'sz-z-massage';
  isMassagePageActive = false;
  isAdminPageActive = false;
  isLoggedIn: boolean | null = null;
  private authSubscription: Subscription | null = null;
  showModal = false;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private authService: AuthService
  ) {
    // Listen to router events to determine active pages
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isMassagePageActive = this.router.url.includes('/massage-pages/');
        this.isAdminPageActive = this.router.url.includes('users');
      }
    });
  }

  ngOnInit() {
    // Audit cookies on initialization
    this.cookieService.auditCookies();

    // Subscribe to authentication status changes
    this.authSubscription = this.authService.loggedInStatus$.subscribe(
      (status) => {
        this.isLoggedIn = status;
      }
    );

    // Show modal after 8 seconds, then every 15 minutes
    timer(8000).subscribe(() => (this.showModal = true));
    timer(60000, 900000).subscribe(() => (this.showModal = true)); // 15 minutes interval
  }

  ngOnDestroy() {
    // Unsubscribe from authentication status changes
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout() {
    // Call AuthService to log out
    this.authService.logout();
  }

  navigateToUsers() {
    // Navigate to the users page
    this.router.navigate(['/users']);
  }
}
