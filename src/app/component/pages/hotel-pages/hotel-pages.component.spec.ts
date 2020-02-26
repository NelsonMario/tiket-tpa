import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelPagesComponent } from './hotel-pages.component';

describe('HotelPagesComponent', () => {
  let component: HotelPagesComponent;
  let fixture: ComponentFixture<HotelPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
