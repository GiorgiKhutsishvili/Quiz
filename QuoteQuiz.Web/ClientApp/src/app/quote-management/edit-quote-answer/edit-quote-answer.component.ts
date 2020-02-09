import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AnswerService } from '../../services/answer/answer.service';
import { AnswerModel } from '../../services/answer/models/AnswerModel';
import { QuoteService } from '../../services/quote/quote.service';
import { QuoteModel } from '../../services/quote/models/QuoteModel';

@Component({
  selector: 'app-edit-quote-answer',
  templateUrl: './edit-quote-answer.component.html',
  styleUrls: ['./edit-quote-answer.component.scss']
})
export class EditQuoteAnswerComponent implements OnInit {
  quoteId: string;
  quoteModel: QuoteModel = new QuoteModel();
  editQuoteAnswerForm = new FormGroup({
    id: new FormControl(''),
      quoteText: new FormControl('')
    //quoteText: new FormControl(''),
    //answerText: new FormControl(''),
    //isCorrect: new FormControl('')
  });
  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private answerService: AnswerService, private quoteService: QuoteService) {
    this.editQuoteAnswerForm = fb.group({
      id: [''],
      quoteText: ['', Validators.required]
      //quoteId: [''],
      //answerText: ['', Validators.required],
      //isCorrect: ['', Validators.required],
      //quote: this.fb.group({
      //  id: [''],
      //  quoteText: ['', Validators.required]
      //})
    });
  }

  ngOnInit() {

    this.route.paramMap.subscribe(parameterMap => {
      this.quoteId = parameterMap.get('id');
    });
    console.log("edit-quote", this.quoteId);

    if (this.quoteId !== null) {
      this.quoteService.getQupteById(this.quoteId).subscribe(response => {
        this.quoteModel = response;
        console.log("quoteModel", this.quoteModel);

        this.editQuoteAnswerForm.patchValue({
          id: this.quoteModel.id,
          //quoteId: this.answerModel.quoteId,
          quoteText: this.quoteModel.quoteText,
          //answerText: this.answerModel.answerText,
          //isCorrect: this.answerModel.isCorrect,
          //quote: this.answerModel.quote
        });

      });
    }



  }


  //updateQuoteAnswer() {
  //  this.answerModel = this.editQuoteAnswerForm.value;
  //  this.answerModel.quote.answers = this.answers;
  //  console.log(this.answerModel.quote.answers);
  //  console.log(this.answerModel);

  //  this.answerService.createOrUpdate(this.answerModel).subscribe(response => {
  //    console.log(response);
  //  });
  //  this.router.navigate(['quote-management']);
  //}

}
