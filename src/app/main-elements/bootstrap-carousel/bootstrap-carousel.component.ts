import { Component } from '@angular/core';

@Component({
  selector: 'app-bootstrap-carousel',
  templateUrl: './bootstrap-carousel.component.html',
  styleUrls: ['./bootstrap-carousel.component.scss'],
})
export class BootstrapCarouselComponent {
  images: string[] = [
    'https://images.squarespace-cdn.com/content/v1/65413326a121b718285bb2ab/42284538-b535-48c8-b0c8-195a6543558c/Brown+Blue+Denim+Jeans+Fashion+Sale+Website+Banner.png',
    'https://images.squarespace-cdn.com/content/v1/65413326a121b718285bb2ab/42284538-b535-48c8-b0c8-195a6543558c/Brown+Blue+Denim+Jeans+Fashion+Sale+Website+Banner.png',
  ];

  constructor() {}
}
