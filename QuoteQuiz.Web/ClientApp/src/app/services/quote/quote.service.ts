import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { QuoteModel } from './models/QuoteModel';

@Injectable()

export class QuoteService {

  private readonly quotesUrl = 'api/Quotes/GetQuotes';
  private readonly getQuoteUrl = 'api/Quotes/GetQuoteById';
  //private readonly createUrl = 'api/Quotes/Create';
  private readonly createOrUpdateUrl = 'api/Quotes/CreateOrUpdate';
  private readonly updateUrl = 'api/Quotes/Update';
  private readonly deleteUrl = 'api/Quotes/Delete';

  constructor(private http: HttpClient, private router: Router) { }

  createOrUpdate(model: QuoteModel): Observable<QuoteModel> {
    return this.http.post<QuoteModel>(this.createOrUpdateUrl, model);
  }

  getQupteById(quoteId: string): Observable<QuoteModel> {
    return this.http.get<QuoteModel>(this.getQuoteUrl + '/' + quoteId);
  }

  getQuotes(): Observable<QuoteModel[]> {
    return this.http.get<QuoteModel[]>(this.quotesUrl);
  }


  deleteQuote(quoteId: string) {
    return this.http.delete(this.deleteUrl + '/' + quoteId);
  }

  updateQuote(model: QuoteModel): Observable<QuoteModel> {
    return this.http.put<QuoteModel>(this.updateUrl, model);
  }
}
