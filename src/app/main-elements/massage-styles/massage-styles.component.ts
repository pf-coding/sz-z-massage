import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MassageCard } from '../../models/massage-card.model';
import { TranslationService } from '../../services/translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-massage-styles',
  templateUrl: './massage-styles.component.html',
  styleUrls: ['./massage-styles.component.scss'],
})
export class MassageStylesComponent implements OnInit, OnDestroy {
  massageCards: MassageCard[] = [];
  currentIndex = 0;
  cardsPerPage!: number;
  isAnimating: boolean = false;
  langSubscription!: Subscription;

  constructor(
    private http: HttpClient,
    private router: Router,
    public translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.calculateCardsPerPage();
    this.fadeInCards();
    window.addEventListener('resize', () => {
      this.calculateCardsPerPage();
    });

    this.langSubscription = this.translationService
      .getCurrentLang()
      .subscribe((lang) => {
        this.fetchMassageCards(lang);
      });

    // Initial fetch
    this.fetchMassageCards(this.translationService.getLang());
  }

  ngOnDestroy(): void {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }

  fetchMassageCards(lang: string): void {
    const url = `./assets/languages-massage/massage-styles-${lang}.json`;
    this.http.get<MassageCard[]>(url).subscribe((data) => {
      this.massageCards = data;
    });
  }

  calculateCardsPerPage(): void {
    if (window.innerWidth < 768) {
      this.cardsPerPage = 1;
    } else {
      this.cardsPerPage = 3;
    }
  }

  prev(): void {
    if (!this.isAnimating && this.currentIndex > 0) {
      this.isAnimating = true;
      this.fadeOutCards();
      setTimeout(() => {
        this.currentIndex -= this.cardsPerPage;
        this.fadeInCards();
        this.isAnimating = false;
      }, 500);
    }
  }

  next(): void {
    if (
      !this.isAnimating &&
      this.currentIndex < this.massageCards.length - this.cardsPerPage
    ) {
      this.isAnimating = true;
      this.fadeOutCards();
      setTimeout(() => {
        this.currentIndex += this.cardsPerPage;
        this.fadeInCards();
        this.isAnimating = false;
      }, 500);
    }
  }

  fadeOutCards(): void {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card: Element) => {
      card.classList.remove('visible');
    });
  }

  fadeInCards(): void {
    setTimeout(() => {
      const cardsToShow = document.querySelectorAll('.card:not(.visible)');
      cardsToShow.forEach((card: Element, index: number) => {
        if (index < this.cardsPerPage) {
          card.classList.add('visible');
        }
      });
    }, 50);
  }

  navigateToMassagePage(pageName: string): void {
    const lang = this.translationService.getLang();
    this.router.navigate(['/massage-pages', pageName], {
      queryParams: { lang },
    });
  }
}
