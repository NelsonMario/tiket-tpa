import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSectionComponent } from './customer-section.component';

describe('CustomerSectionComponent', () => {
  let component: CustomerSectionComponent;
  let fixture: ComponentFixture<CustomerSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
