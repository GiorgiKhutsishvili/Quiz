import {ErrorHandler} from '@angular/core';
declare let alertify: any;

export class AppErrorHandler implements ErrorHandler{
    handleError(error: any): void {
        alertify.error("error");
    }

}