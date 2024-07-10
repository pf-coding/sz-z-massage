import { Component } from '@angular/core';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent {
  constructor(public translationService: TranslationService) {}

  changeLanguage(lang: string): void {
    this.translationService.setLang(lang);
  }
}
