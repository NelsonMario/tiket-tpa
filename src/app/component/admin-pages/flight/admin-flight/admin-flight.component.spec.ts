import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFlightComponent } from './admin-flight.component';

describe('AdminFlightComponent', () => {
  let component: AdminFlightComponent;
  let fixture: ComponentFixture<AdminFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
