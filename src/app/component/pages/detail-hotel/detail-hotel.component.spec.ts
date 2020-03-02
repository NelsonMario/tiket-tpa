import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailHotelComponent } from './detail-hotel.component';

describe('DetailHotelComponent', () => {
  let component: DetailHotelComponent;
  let fixture: ComponentFixture<DetailHotelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailHotelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
