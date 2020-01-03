import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPlaceholderComponent } from './input-placeholder.component';

describe('InputPlaceholderComponent', () => {
  let component: InputPlaceholderComponent;
  let fixture: ComponentFixture<InputPlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputPlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
