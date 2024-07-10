import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieCustomizationModalComponent } from './cookie-customization-modal.component';

describe('CookieCustomizationModalComponent', () => {
  let component: CookieCustomizationModalComponent;
  let fixture: ComponentFixture<CookieCustomizationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CookieCustomizationModalComponent]
    });
    fixture = TestBed.createComponent(CookieCustomizationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
