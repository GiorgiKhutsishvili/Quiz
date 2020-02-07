import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AdministrationService } from '../services/administration/administration.service';

@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

    users: any[];

    displayedColumns: string[] = [
        'disableColumnDef',
        'editColumnDef',
        'deleteColumnDef',
        'userName',
        'email',
    ];

    dataSource = new MatTableDataSource();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;


    constructor(private administrationService: AdministrationService) { }

    ngOnInit() {
        this.administrationService.getUsers().subscribe(response => {
            this.users = response;
            this.dataSource.data = this.users.filter(x => x.dateDeleted === null);

            console.log(this.users);
        });

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    disableUser(userId: string) {
        console.log("disableUser", userId);
        if (confirm('Are sure you want disable this user?')) {
            this.administrationService.disableUser(userId).subscribe(response => {
                console.log(response);
                if (response === true) {
                    this.ngOnInit();
                }
            });
        }
    }

    editUser(userId: string) {
        console.log("editQuoteAnswer", userId);
        window.open('/user-management/edit-user/' + userId);
    }

    deleteUser(userId: string) {
        console.log(userId);

        if (confirm('Are sure you want to delete this user?')) {
            this.administrationService.deleteUser(userId).subscribe(response => {
                console.log(response);
                if (response === true) {
                    this.ngOnInit();
                }
            });
        }
    }

}
