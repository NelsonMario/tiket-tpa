import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailPagesComponent } from './event-detail-pages.component';

describe('EventDetailPagesComponent', () => {
  let component: EventDetailPagesComponent;
  let fixture: ComponentFixture<EventDetailPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
