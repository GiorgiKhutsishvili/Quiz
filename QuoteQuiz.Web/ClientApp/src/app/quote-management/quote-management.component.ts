import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AnswerService } from '../services/answer/answer.service';
import { QuoteService } from '../services/quote/quote.service';
import { Router } from '@angular/router';
import { QuoteModel } from '../services/quote/models/QuoteModel';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditQuoteDialogComponent } from './edit-quote-dialog/edit-quote-dialog.component';

@Component({
    selector: 'app-quote-management',
    templateUrl: './quote-management.component.html',
    styleUrls: ['./quote-management.component.scss']
})
export class QuoteManagementComponent implements OnInit {

    quoteId: string;
    quotes: QuoteModel[] = new Array<QuoteModel>();

    displayedColumns: string[] = [
        'editColumnDef',
        'deleteColumnDef',
        'Quote'
    ];

    constructor(public dialog: MatDialog, private answerService: AnswerService, private quoteService: QuoteService, private router: Router) { }


    openDialog(): void {
        const dialogRef = this.dialog.open(EditQuoteDialogComponent, {
            width: '50%',
            data: { id: this.quoteId }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    dataSource = new MatTableDataSource();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;



    ngOnInit() {
        this.quoteService.getQuotes().subscribe(response => {
            this.quotes = response;
            this.dataSource.data = this.quotes;

            console.log("quotes", this.quotes);
        });

        this.dataSource.filterPredicate = ((data: any, filter: string) => {
            if (filter == null || filter == '')
                return true;

            if (data == null)
                return false;

            let jsonText = JSON.stringify(data);
            return jsonText.indexOf(filter) > -1;
        });

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    editQuote(quoteId: string) {
        this.quoteId = quoteId;
        this.openDialog();
        console.log("editQuote", this.quoteId);
        //this.router.navigate(['/quote-management/edit-quote-answer/', quoteId]);
        //window.open('/quote-management/edit-quote-answer/' + answerId);
    }

    deleteQuote(quoteId: string) {
        console.log("deleteQuote", quoteId);
        if (confirm('Are you sure you want to delete this quote? All answers to this quote also will be deleted.')) {
            this.quoteService.deleteQuote(quoteId).subscribe(response => {
                console.log(response);
                if (response === null) {
                    this.ngOnInit();
                }
            });
        }
    }
}
