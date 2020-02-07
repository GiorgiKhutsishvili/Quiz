import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AnswerModel } from './models/AnswerModel';

@Injectable()

export class AnswerService {

  private readonly createOrUpdateUrl = 'api/Answers/CreateOrUpdate';
  //private readonly updateUrl = 'api/Answers/Update';
  private readonly checkAnswerUrl = 'api/Answers/CheckAnswer'
  private readonly answersUrl = 'api/Answers/GetAnswers';
  private readonly getAnswerByIdUrl = 'api/Answers/GetAnswerById';

  private requestOptions: Object = {
    responseType: 'text'
  };

  constructor(private http: HttpClient, private router: Router) { }

  getAnswers(): Observable<AnswerModel[]> {
    return this.http.get<AnswerModel[]>(this.answersUrl);
  }

  getAnswerById(answerId: string): Observable<AnswerModel> {
    return this.http.get<AnswerModel>(this.getAnswerByIdUrl + '/' + answerId);
  }

  createOrUpdate(model: AnswerModel): Observable<AnswerModel> {
    return this.http.post<AnswerModel>(this.createOrUpdateUrl, model);
  }

  checkAnswer(answerId: string) {
    return this.http.get<any>(this.checkAnswerUrl + '/' + answerId, this.requestOptions);
  }

  //updateAnswer(model: AnswerModel): Observable<AnswerModel> {
  //  return this.http.put<AnswerModel>(this.updateUrl, model);
  //}
}
