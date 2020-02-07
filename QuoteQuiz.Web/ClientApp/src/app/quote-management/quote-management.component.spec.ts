import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteManagementComponent } from './quote-management.component';

describe('QuoteManagementComponent', () => {
  let component: QuoteManagementComponent;
  let fixture: ComponentFixture<QuoteManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
