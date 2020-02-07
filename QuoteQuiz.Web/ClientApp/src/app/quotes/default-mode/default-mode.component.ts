import { Component, OnInit, Input } from '@angular/core';
import { QuoteService } from '../../services/quote/quote.service';
import { QuoteModel } from '../../services/quote/models/QuoteModel';
import { AnswerService } from '../../services/answer/answer.service';

@Component({
    selector: 'app-default-mode',
    templateUrl: './default-mode.component.html',
    styleUrls: ['./default-mode.component.scss']
})
export class DefaultModeComponent implements OnInit {

    @Input() quotes: QuoteModel[];
    message: string;


    constructor(private answerService: AnswerService) { }

    ngOnInit() {
        this.quotes = this.quotes.filter(x => x.answers.length < 3);
        console.log("default-mode", this.quotes);
    }

    checkAnswer(answerId: string, quoteId: string) {
        console.log(answerId);

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
