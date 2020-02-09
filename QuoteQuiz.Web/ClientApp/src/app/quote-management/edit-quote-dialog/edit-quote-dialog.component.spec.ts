import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuoteAnswerDialogComponent } from './edit-quote-answer-dialog.component';

describe('EditQuoteAnswerDialogComponent', () => {
  let component: EditQuoteAnswerDialogComponent;
  let fixture: ComponentFixture<EditQuoteAnswerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditQuoteAnswerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuoteAnswerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
