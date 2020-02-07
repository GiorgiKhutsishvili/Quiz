import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RegisterModel } from '../services/account/models/RegisterModel';
import { AuthService } from '../services/account/AuthService';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    model: RegisterModel;

    registerForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
        confirmPassword: new FormControl('')
    });


    constructor(private authService: AuthService, private fb: FormBuilder) {
        this.registerForm = fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        });
    }

    ngOnInit() {
    }

    register() {
        this.model = this.registerForm.value;
        this.authService.registerUser(this.model);
    }

}
