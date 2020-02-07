import { Component, OnInit, ViewChild } from '@angular/core';
import { UserAchievementsService } from '../services/user-achievements/user-achievements.service';
import { UserAnswerModel } from '../services/user-achievements/models/UserAnswerModel';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'app-user-achievements',
    templateUrl: './user-achievements.component.html',
    styleUrls: ['./user-achievements.component.scss']
})
export class UserAchievementsComponent implements OnInit {

    userAnswers: UserAnswerModel[];

    displayedColumns: string[] = [
        'quoteText',
        'answerText',
        'isCorrect',
        'email',
        'userName'
    ];


    dataSource = new MatTableDataSource();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(private userAchievementsService: UserAchievementsService) { }

    ngOnInit() {
        this.userAchievementsService.getUserAchievements().subscribe(response => {
            this.userAnswers = response;
            this.dataSource.data = this.userAnswers;

            console.log("userAchievements", this.userAnswers);

            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });

        this.dataSource.filterPredicate = ((data: any, filter: string) => {
            if (filter == null || filter == '')
                return true;

            if (data == null)
                return false;

            let jsonText = JSON.stringify(data);
            return jsonText.indexOf(filter) > -1;
        });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }


}
