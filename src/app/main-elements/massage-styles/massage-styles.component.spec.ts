import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassageStylesComponent } from './massage-styles.component';

describe('MassageStylesComponent', () => {
  let component: MassageStylesComponent;
  let fixture: ComponentFixture<MassageStylesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MassageStylesComponent]
    });
    fixture = TestBed.createComponent(MassageStylesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
