import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntertainmentReservationComponent } from './entertainment-reservation.component';

describe('EntertainmentReservationComponent', () => {
  let component: EntertainmentReservationComponent;
  let fixture: ComponentFixture<EntertainmentReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntertainmentReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntertainmentReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
