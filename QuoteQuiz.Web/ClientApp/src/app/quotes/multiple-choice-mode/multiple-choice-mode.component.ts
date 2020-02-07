import { Component, OnInit, Input } from '@angular/core';
import { QuoteModel } from '../../services/quote/models/QuoteModel';
import { AnswerService } from '../../services/answer/answer.service';

@Component({
    selector: 'app-multiple-choice-mode',
    templateUrl: './multiple-choice-mode.component.html',
    styleUrls: ['./multiple-choice-mode.component.scss']
})
export class MultipleChoiceModeComponent implements OnInit {
    @Input() quotes: QuoteModel[];
    message: string;
    //quoteId: string;
    constructor(private answerService: AnswerService) { }

    ngOnInit() {
        this.quotes = this.quotes.filter(x => x.answers.length > 2);

        console.log("multiple-mode", this.quotes);
    }

    checkAnswer(answerId: string, quoteId: string) {

        console.log(answerId);
        //this.quoteId = quoteId;
        this.answerService.checkAnswer(answerId).subscribe(response => {
            this.message = response;
            console.log(this.message);
        })

        this.hideOnClick(quoteId);
    }

    hideOnClick(quoteId) {
        document.getElementById(quoteId).style.display = "none";
    }

    back(quoteId) {
        console.log("back", quoteId);
        this.message = "";

        if (quoteId !== null) {
            document.getElementById(quoteId).style.display = "block";
        }
    }

    next(quoteId) {
        console.log("next", quoteId);

        this.message = "";
        if (quoteId !== null) {
            document.getElementById(quoteId).style.display = "block";
        }
    }

}
