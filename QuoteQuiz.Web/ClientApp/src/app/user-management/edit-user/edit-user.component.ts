import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AdministrationService } from '../../services/administration/administration.service';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
    userId: string;
    user: any;

    editUserForm = new FormGroup({
        id: new FormControl(''),
        userName: new FormControl(''),
        email: new FormControl(''),
    });
    
    constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private administrationService: AdministrationService) {
        this.editUserForm = fb.group({
            id: ['', Validators.required],
            userName: ['', Validators.required],
            email: ['', Validators.required]
        });
    }


    ngOnInit() {

        this.route.paramMap.subscribe(parameterMap => {
            this.userId = parameterMap.get('id');
        });

        console.log("edit-user", this.userId);

        if (this.userId !== null) {
            this.administrationService.getUserById(this.userId).subscribe(response => {
                this.user = response;

                console.log(this.user);

                this.editUserForm.patchValue({
                    id: this.user.id,
                    userName: this.user.userName,
                    email: this.user.email
                });
            });
        }

    }

    updateUser() {
        this.user = this.editUserForm.value;
        console.log(this.user);
        this.administrationService.updateUser(this.user).subscribe(response => {
            console.log(response);
        });
        this.administrationService.getUsers().subscribe(response => {

        });

        this.router.navigate(['user-management']);
    }

}
