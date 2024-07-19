import { Component, HostListener, OnInit } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  jsonData: any;

  constructor(
    private http: HttpClient,
    public translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.loadJSONData();
  }

  loadJSONData() {
    const lang = this.translationService.getLang();
    const filePath = `/assets/languages-massage/massage-styles-${lang}.json`;
    this.http.get(filePath).subscribe((data) => {
      this.jsonData = data;
    });
  }

  exportToExcel() {
    const lang = this.translationService.getLang();
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jsonData);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    XLSX.writeFile(workbook, `massage-styles-${lang}.xlsx`);
  }

  changeLanguage(lang: string): void {
    this.translationService.setLang(lang);
    this.loadJSONData(); // Reload data for the new language
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
