import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultModeComponent } from './default-mode.component';

describe('DefaultModeComponent', () => {
  let component: DefaultModeComponent;
  let fixture: ComponentFixture<DefaultModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
