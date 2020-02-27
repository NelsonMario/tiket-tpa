import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHotelComponent } from './admin-hotel.component';

describe('AdminHotelComponent', () => {
  let component: AdminHotelComponent;
  let fixture: ComponentFixture<AdminHotelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHotelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
