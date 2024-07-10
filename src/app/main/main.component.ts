import { Component } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(public translationService: TranslationService) {}

  changeLanguage(lang: string): void {
    this.translationService.setLang(lang);
  }
}
