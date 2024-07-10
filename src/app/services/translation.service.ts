import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private currentLang = new BehaviorSubject<string>('en');
  private translations: any = {};
  currentLang$: any;

  constructor(private http: HttpClient) {
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
      this.loadTranslations(savedLang);
    } else {
      this.detectLanguage();
    }
  }

  loadTranslations(lang: string): void {
    this.http.get(`./assets/languages/${lang}.json`).subscribe((data) => {
      this.translations = data;
      this.currentLang.next(lang);
    });
  }

  getTranslation(key: string): string {
    return this.translations[key] || key;
  }

  setLang(lang: string): void {
    this.loadTranslations(lang);
    localStorage.setItem('language', lang);
    this.currentLang.next(lang);
  }

  getCurrentLang() {
    return this.currentLang.asObservable();
  }

  getLang(): string {
    return this.currentLang.value;
  }

  private detectLanguage(): void {
    this.http.get('https://ipapi.co/json/').subscribe((response: any) => {
      const country = response.country;
      let lang = 'en';
      if (country === 'HU') {
        lang = 'hu';
      } else if (['DE', 'AT', 'CH'].includes(country)) {
        lang = 'de';
      }
      this.setLang(lang);
    });
  }
}
