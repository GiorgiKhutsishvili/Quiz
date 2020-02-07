//import { Injectable, Inject } from '@angular/core';
//import { HttpInterceptor } from '@angular/common/http';
//@Injectable()
//export class AuthInterceptor implements HttpInterceptor {
//    constructor() { }
//    intercept(req, next) {
//        var token = localStorage.getItem('token');
//        var authRequest = req.clone({
//            headers: req.headers.set('Authorization', `Bearer ${token}`)
//        });
//        console.log(authRequest);
//        return next.handle(authRequest);
//    }
//}
//# sourceMappingURL=auth.interceptor.js.map