import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassagePagesComponent } from './massage-pages.component';

describe('MassagePagesComponent', () => {
  let component: MassagePagesComponent;
  let fixture: ComponentFixture<MassagePagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MassagePagesComponent]
    });
    fixture = TestBed.createComponent(MassagePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
