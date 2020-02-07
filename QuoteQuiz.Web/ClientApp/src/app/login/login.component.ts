import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/account/AuthService';
import { LoginModel } from '../services/account/models/LoginModel';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    model: LoginModel;

    loginForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
    });


    constructor(private authService: AuthService, private fb: FormBuilder) {
        this.loginForm = fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngOnInit() {
    }

    login() {
        this.model = this.loginForm.value;
        //this.authService.loginUser(this.model).subscribe(response => {
        //    console.log(response);
        //});

        this.authService.loginUser(this.model);
    }
}


