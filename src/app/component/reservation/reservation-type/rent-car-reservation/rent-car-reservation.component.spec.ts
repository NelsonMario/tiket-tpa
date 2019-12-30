import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentCarReservationComponent } from './rent-car-reservation.component';

describe('RentCarReservationComponent', () => {
  let component: RentCarReservationComponent;
  let fixture: ComponentFixture<RentCarReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentCarReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentCarReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
