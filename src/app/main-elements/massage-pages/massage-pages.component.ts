import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MassagePage } from '../../models/massage-page.model';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-massage-pages',
  templateUrl: './massage-pages.component.html',
  styleUrls: ['./massage-pages.component.scss'],
})
export class MassagePagesComponent implements OnInit {
  selectedMassagePage: MassagePage | null = null;
  isMassagePageActive: boolean = false;
  selectedPrice: string = ''; // új változó az árak kezelésére
  selectedDuration: string = ''; // új változó a kiválasztott időtartam kezelésére

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    public translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const lang = params['lang'] || this.translationService.getLang();
      this.route.paramMap.subscribe((paramMap) => {
        const pageName = paramMap.get('pageName');
        if (pageName) {
          this.fetchMassagePage(pageName, lang);
        } else {
          this.selectedMassagePage = null; // Alapértelmezett érték beállítása
        }
      });
    });
  }

  fetchMassagePage(pageName: string, lang: string): void {
    const url = `/assets/languages-massage/massage-styles-${lang}.json`;
    this.http.get<MassagePage[]>(url).subscribe(
      (data) => {
        this.selectedMassagePage =
          data.find((page) => page.title === pageName) || null;
        this.selectedPrice = this.selectedMassagePage?.price30min || ''; // Alapértelmezett ár beállítása
        this.selectedDuration = '30min'; // Alapértelmezett időtartam beállítása
        this.isMassagePageActive = true; // Oldal aktívvá tétele
      },
      (error) => {
        console.error(
          `Could not load massage page file for language: ${lang}`,
          error
        );
      }
    );
  }

  updatePrice(duration: string): void {
    if (this.selectedMassagePage) {
      if (duration === '30min') {
        this.selectedPrice = this.selectedMassagePage.price30min;
      } else if (duration === '1hr') {
        this.selectedPrice = this.selectedMassagePage.price1hr;
      } else if (duration === '1.5hr') {
        this.selectedPrice = this.selectedMassagePage.price15hr;
      }
      this.selectedDuration = duration; // Kiválasztott időtartam frissítése
    }
  }

  navigateBack(): void {
    this.isMassagePageActive = false; // Oldal inaktívvá tétele
    this.router.navigate(['/']).then(() => {
      window.location.hash = '#masszazs-tipusok';
    });
  }
}
