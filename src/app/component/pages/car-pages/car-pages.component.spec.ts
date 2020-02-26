import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPagesComponent } from './car-pages.component';

describe('CarPagesComponent', () => {
  let component: CarPagesComponent;
  let fixture: ComponentFixture<CarPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
