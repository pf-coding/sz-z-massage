import { Component, HostListener } from '@angular/core';
import { TranslationService } from '../services/translation.service';
// Nem kell importálni a Bootstrap-et közvetlenül, mert az már globálisan elérhető

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public translationService: TranslationService) {}

  changeLanguage(lang: string): void {
    this.translationService.setLang(lang);
    this.closeMenu();
  }

  closeMenu() {
    const navbarCollapse = document.getElementById('navbarNavDropdown');
    if (navbarCollapse) {
      const bsCollapse = new (window as any).bootstrap.Collapse(
        navbarCollapse,
        {
          toggle: false,
        }
      );
      bsCollapse.hide();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const navbarCollapse = document.getElementById('navbarNavDropdown');
    const languageSwitcher = document.querySelector('.language-switcher');

    if (navbarCollapse && !navbarCollapse.contains(event.target as Node)) {
      if (languageSwitcher && languageSwitcher.contains(event.target as Node)) {
        return; // Ha a nyelvválasztó elemre kattintunk, akkor ne záródjon be
      }

      const bsCollapse = new (window as any).bootstrap.Collapse(
        navbarCollapse,
        {
          toggle: false,
        }
      );
      bsCollapse.hide();
    }
  }
}
