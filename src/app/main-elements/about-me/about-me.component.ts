import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent implements OnInit, OnDestroy {
  private listItems!: NodeListOf<HTMLLIElement>;
  private currentIndex: number = 0;
  private intervalId: any;

  constructor(public translationService: TranslationService) {}

  ngOnInit(): void {
    this.listItems = document.querySelectorAll('.list ul li');
    this.startAutoSelect();
  }

  ngOnDestroy(): void {
    this.clearAutoSelect();
  }

  changeLanguage(lang: string): void {
    this.translationService.setLang(lang);
  }

  private startAutoSelect(): void {
    this.selectItem(this.currentIndex);
    this.intervalId = setInterval(() => {
      this.clearSelection();
      this.currentIndex = (this.currentIndex + 1) % this.listItems.length;
      this.selectItem(this.currentIndex);
    }, 3000);
  }

  private clearAutoSelect(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private selectItem(index: number): void {
    this.listItems[index].classList.add('selected');
  }

  private clearSelection(): void {
    this.listItems.forEach((item) => item.classList.remove('selected'));
  }
}
