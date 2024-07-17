import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorderDecorComponent } from './border-decor.component';

describe('BorderDecorComponent', () => {
  let component: BorderDecorComponent;
  let fixture: ComponentFixture<BorderDecorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorderDecorComponent]
    });
    fixture = TestBed.createComponent(BorderDecorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
