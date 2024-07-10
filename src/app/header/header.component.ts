import { Component } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public translationService: TranslationService) {}

  changeLanguage(lang: string): void {
    this.translationService.setLang(lang);
  }
}
