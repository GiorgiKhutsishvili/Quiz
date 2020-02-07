import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChoiceModeComponent } from './multiple-choice-mode.component';

describe('MultipleChoiceModeComponent', () => {
  let component: MultipleChoiceModeComponent;
  let fixture: ComponentFixture<MultipleChoiceModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleChoiceModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleChoiceModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
