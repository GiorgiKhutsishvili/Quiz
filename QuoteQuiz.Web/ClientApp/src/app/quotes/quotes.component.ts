import { Component, OnInit } from '@angular/core';
import { QuoteModel } from '../services/quote/models/QuoteModel';
import { QuoteService } from '../services/quote/quote.service';


@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {

    quotes: QuoteModel[];

    constructor(private quoteService: QuoteService) { }

    ngOnInit() {
        this.quoteService.getQuotes().subscribe(response => {
            this.quotes = response;
        });
    }

}
