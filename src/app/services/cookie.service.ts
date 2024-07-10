import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  getCookie(name: string): string | null {
    const match = document.cookie.match(
      new RegExp('(^| )' + name + '=([^;]+)')
    );
    return match ? decodeURIComponent(match[2]) : null;
  }

  setCookie(name: string, value: string, days: number) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie =
      name +
      '=' +
      encodeURIComponent(value) +
      '; expires=' +
      expires +
      '; path=/';
  }

  deleteCookie(name: string) {
    this.setCookie(name, '', -1);
  }

  getCookies() {
    return document.cookie.split(';').map((cookie) => cookie.trim());
  }

  auditCookies() {
    const cookies = this.getCookies();
    console.log('Azonosított cookie-k:', cookies);
    // Itt végezheted el a szükséges teendőket
  }
}
