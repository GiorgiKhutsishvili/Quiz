import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AnswerModel } from '../answer/models/AnswerModel';
import { UserAnswerModel } from './models/UserAnswerModel';

@Injectable()

export class UserAchievementsService {

    private readonly getUserAchievementsUrl = 'api/UserAchievements/GetUserAchievements';

    constructor(private http: HttpClient, private router: Router) { }


    getUserAchievements(): Observable<UserAnswerModel[]> {
        return this.http.get<UserAnswerModel[]>(this.getUserAchievementsUrl);
    }
}
