//import { Observable } from 'rxjs';
//import { HttpClient, HttpParams } from '@angular/common/http';
//import { Injectable, Inject } from '@angular/core';
//import { map } from 'rxjs/operators';
//import { RegisterModel } from './models/RegisterModel';
//import { LoginModel } from './models/LoginModel';
//import { Router } from '@angular/router';
//@Injectable()
//export class AuthService {
//    private readonly loginUrl = 'api/Account/Login';
//    private readonly registerUrl = 'api/Account/Register';
//    constructor(private http: HttpClient, private router: Router) { }
//    registerUser(model: RegisterModel) {
//        const requestOptions: Object = {
//            responseType: 'text'
//        };
//        return this.http.post<any>(this.registerUrl, model, requestOptions).subscribe(response => {
//            this.authenticate(response);
//        });
//    }
//    loginUser(model: LoginModel) {
//        return this.http.post<any>(this.loginUrl, model).subscribe(response => {
//            this.authenticate(response);
//        });
//    }
//    authenticate(response) {
//        localStorage.setItem('token', response);
//        this.router.navigate
//    }
//}
//# sourceMappingURL=AuthService.js.map