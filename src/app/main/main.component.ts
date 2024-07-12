import { Component } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',

  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements FontAwesomeModule {
  faFacebookF = faFacebookF;
  faPhone = faPhone;
  faMailBulk = faMailBulk;
  faInstagram = faInstagram;
  constructor(public translationService: TranslationService) {}

  changeLanguage(lang: string): void {
    this.translationService.setLang(lang);
  }
}
