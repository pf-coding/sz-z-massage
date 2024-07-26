import { Injectable } from '@angular/core';
import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, from, catchError, tap } from 'rxjs';

interface UserAuthData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInStatus: BehaviorSubject<boolean | null> = new BehaviorSubject<
    boolean | null
  >(null);

  public get loggedInStatus$(): Observable<boolean | null> {
    return this.loggedInStatus.asObservable();
  }

  private userEmail: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  public get userEmail$(): Observable<string | null> {
    return this.userEmail.asObservable();
  }

  public get loggedInStatusValue(): boolean | null {
    return this.loggedInStatus.value;
  }

  constructor(private auth: Auth, private router: Router) {
    this.checkAuthState();
  }

  registration(regData: UserAuthData): Observable<UserCredential> {
    return from(
      createUserWithEmailAndPassword(this.auth, regData.email, regData.password)
    ).pipe(
      tap((userCredential) => {
        console.log('User registered: ', userCredential);
        // Comment out or remove the following lines to avoid auto-login
        // this.loggedInStatus.next(true);
        // localStorage.setItem('isLoggedIn', 'true');
        // localStorage.setItem('userEmail', regData.email);
        alert('Successfully registered a new admin! Please log in.');
      }),
      catchError((error) => {
        alert(error.message);
        return error;
      })
    ) as Observable<UserCredential>;
  }

  login(loginData: UserAuthData): Observable<UserCredential> {
    return from(
      signInWithEmailAndPassword(this.auth, loginData.email, loginData.password)
    ).pipe(
      tap((userCredential) => {
        console.log('User logged in: ', userCredential);
        this.loggedInStatus.next(true);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', loginData.email);
        this.router.navigate(['users']);
      }),
      catchError((error) => {
        alert(error.message);
        return error;
      })
    ) as Observable<UserCredential>;
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    this.loggedInStatus.next(false);
    this.userEmail.next(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
  }

  checkAuthState(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userEmail = localStorage.getItem('userEmail');

    if (isLoggedIn && userEmail) {
      this.loggedInStatus.next(true);
      this.userEmail.next(userEmail);
    } else {
      this.loggedInStatus.next(false);
      this.userEmail.next(null);
    }

    this.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('User on init: ', user);
        this.loggedInStatus.next(true);
        this.userEmail.next(user.email);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', user.email || '');
      } else {
        this.loggedInStatus.next(false);
        this.userEmail.next(null);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
      }
    });
  }
}
