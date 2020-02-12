import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { QuoteModel } from '../../services/quote/models/QuoteModel';
import { QuoteService } from '../../services/quote/quote.service';
declare let alertify: any;
@Component({
  selector: 'app-create-quote',
  templateUrl: './create-quote.component.html',
  styleUrls: ['./create-quote.component.scss']
})
export class CreateQuoteComponent implements OnInit {

    model: QuoteModel;

    quoteForm = new FormGroup({
        quoteText: new FormControl('')
    });
    constructor(private quoteService: QuoteService, private fb: FormBuilder) {
        this.quoteForm = fb.group({
            quoteText: ['', Validators.required],
        });
    }

    ngOnInit() {
    }

    addQuote() {
        this.model = this.quoteForm.value;
        this.quoteService.createOrUpdate(this.model).subscribe(response => {

            console.log(response);

            if (response.id !== null) {
                alertify.success("success");
            }
        });
        this.quoteForm.reset();

    }

}
