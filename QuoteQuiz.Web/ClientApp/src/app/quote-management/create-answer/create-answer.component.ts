import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { QuoteModel } from '../../services/quote/models/QuoteModel';
import { QuoteService } from '../../services/quote/quote.service';
import { AnswerModel } from '../../services/answer/models/AnswerModel';
import { AnswerService } from '../../services/answer/answer.service';

@Component({
  selector: 'app-create-answer',
  templateUrl: './create-answer.component.html',
  styleUrls: ['./create-answer.component.scss']
})
export class CreateAnswerComponent implements OnInit {

    model: AnswerModel = new AnswerModel();
    quotes: QuoteModel[];

    answerForm = new FormGroup({
        quoteId: new FormControl(''),
        answerText: new FormControl(''),
        isCorrect: new FormControl('')
    });
    constructor(private quoteService: QuoteService, private answerService: AnswerService, private fb: FormBuilder) {
        this.answerForm = fb.group({
            quoteId: [''],
            answerText: ['', Validators.required],
            isCorrect: ['']
        });
    }

    ngOnInit() {
        this.quoteService.getQuotes().subscribe(response => {
            this.quotes = response;
            console.log(this.quotes);
        });

        this.answerForm.patchValue({
            isCorrect: false
        });
    }
    onQuoteChange(quoteId) {
        this.model.quoteId = quoteId;

        this.answerForm.patchValue({
            quoteId: this.model.quoteId
        });
        console.log("quoteId", quoteId);
    }

    addAnswer() {
        this.model = this.answerForm.value;
      console.log(this.model);
      this.answerService.createOrUpdate(this.model).subscribe(response => {
            console.log(response);
        });

    }

}
