import { Component } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(public translationService: TranslationService) {}

  changeLanguage(lang: string): void {
    this.translationService.setLang(lang);
  }
}
