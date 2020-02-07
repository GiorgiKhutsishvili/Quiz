import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RoleModel } from '../../services/administration/models/RoleModel';
import { AdministrationService } from '../../services/administration/administration.service';

@Component({
    selector: 'app-create-role',
    templateUrl: './create-role.component.html',
    styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit {

    model: RoleModel;

    roleForm = new FormGroup({
        roleName: new FormControl('')
    });


    constructor(private fb: FormBuilder, private administrationService: AdministrationService) {
        this.roleForm = fb.group({
            roleName: ['', Validators.required]
        });
    }

    ngOnInit() {
    }

    addRole() {
        this.model = this.roleForm.value;
        this.administrationService.createRole(this.model).subscribe(response => {
            console.log(response);
        })
    }

}
