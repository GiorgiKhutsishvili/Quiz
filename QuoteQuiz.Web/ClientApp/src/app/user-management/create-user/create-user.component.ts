import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RoleModel } from '../../services/administration/models/RoleModel';
import { AdministrationService } from '../../services/administration/administration.service';
import { RegisterModel } from '../../services/account/models/RegisterModel';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

    model: RegisterModel;

    userForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
        confirmPassword: new FormControl('')
    });

    constructor(private administrationService: AdministrationService, private fb: FormBuilder, private router: Router) {
        this.userForm = fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        });
    }

    ngOnInit() {
    }

    createUser() {
        this.model = this.userForm.value;
        this.administrationService.createUser(this.model).subscribe(response => {
            console.log(response);
        });
        this.router.navigate(['user-management']);
    }

}
