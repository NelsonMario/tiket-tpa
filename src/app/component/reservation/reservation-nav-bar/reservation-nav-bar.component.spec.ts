import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationNavBarComponent } from './reservation-nav-bar.component';

describe('ReservationNavBarComponent', () => {
  let component: ReservationNavBarComponent;
  let fixture: ComponentFixture<ReservationNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
