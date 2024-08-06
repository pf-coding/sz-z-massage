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
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isMassagePageActive = this.router.url.includes('/massage-pages/');
        this.isAdminPageActive = this.router.url.includes('users');
      }
    });
  }

  ngOnInit() {
    this.cookieService.auditCookies();
    this.authSubscription = this.authService.loggedInStatus$.subscribe(
      (status) => {
        this.isLoggedIn = status;
        console.log('Auth status updated:', status);
      }
    );

    // Show modal after 1 minute, then every 15 minutes
    timer(8000).subscribe(() => (this.showModal = true));
    timer(60000, 900000).subscribe(() => (this.showModal = true)); // 15 minutes interval
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout() {
    console.log('Logging out...');
    this.authService
      .logout()
      .then(() => {
        console.log('Logged out successfully.');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  }

  navigateToUsers() {
    this.router.navigate(['/users']);
  }
}
