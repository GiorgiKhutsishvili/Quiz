import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { RoleModel } from './models/RoleModel';
import { RegisterModel } from '../account/models/RegisterModel';

@Injectable()

export class AdministrationService {

    private readonly createRoleUrl = 'api/Administration/CreateRole'; 
    private readonly createUserUrl = 'api/Administration/CreateUser';
    private readonly getUserUrl = 'api/Administration/GetUserById'
    private readonly getUsersUrl = 'api/Administration/GetUsers';
    private readonly disableUserUrl = 'api/Administration/DisableUser';
    private readonly updateUserUrl = 'api/Administration/UpdateUser';
    private readonly deleteUserUrl = 'api/Administration/DeleteUser';


    constructor(private http: HttpClient, private router: Router) { }

    getUsers() {
        return this.http.get<any>(this.getUsersUrl);
    }

    getUserById(userId: string): Observable<any> {
        return this.http.get<any>(this.getUserUrl + '/' + userId);
    }

    createRole(model: RoleModel): Observable<RoleModel> {
        return this.http.post<RoleModel>(this.createRoleUrl, model);
    }

    createUser(model: RegisterModel): Observable<RegisterModel> {
        return this.http.post<RegisterModel>(this.createUserUrl, model);
    }

    disableUser(userId: string) {
        return this.http.get(this.disableUserUrl + '/' + userId);
    }

    updateUser(user): Observable<any> {
        return this.http.post<any>(this.updateUserUrl, user);
    }

    deleteUser(userId: string) {
        return this.http.delete(this.deleteUserUrl + '/' + userId);
    }

}
