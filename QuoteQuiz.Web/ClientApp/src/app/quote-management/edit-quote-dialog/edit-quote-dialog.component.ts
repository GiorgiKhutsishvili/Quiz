import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { QuoteService } from '../../services/quote/quote.service';
import { QuoteModel } from '../../services/quote/models/QuoteModel';
import { EditAnswerDialogComponent } from '../edit-answer-dialog/edit-answer-dialog.component';
import { AnswerService } from '../../services/answer/answer.service';
declare let alertify: any;

@Component({
    selector: 'app-edit-quote-dialog',
    templateUrl: './edit-quote-dialog.component.html',
    styleUrls: ['./edit-quote-dialog.component.scss']
})
export class EditQuoteDialogComponent implements OnInit {

    //quoteId: string;
    answerId: string;
    quoteModel: QuoteModel = new QuoteModel();

    displayedColumns: string[] = [
        'editColumnDef',
        'deleteColumnDef',
        'answer',
        'isCorrect'
    ];

    editQuoteForm = new FormGroup({
        id: new FormControl(''),
        quoteText: new FormControl('')
    });

    constructor(
        public dialog: MatDialog,
        private router: Router, private route: ActivatedRoute,
        private fb: FormBuilder, private quoteService: QuoteService,
        private answerService: AnswerService,
        public dialogRef: MatDialogRef<EditQuoteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        this.quoteModel.id = data.id;

        this.editQuoteForm = fb.group({
            id: [''],
            quoteText: ['', Validators.required]
        });
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(EditAnswerDialogComponent, {
            width: '50%',
            data: { id: this.answerId }
        });

        dialogRef.afterClosed().subscribe(result => {
           
            if (result !== null) {
                this.ngOnInit();
            }
        });
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }

    oNaddAnswer(): void {
        console.log("ssss");
        this.dialogRef.close();
    }

    dataSource = new MatTableDataSource();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;


    ngOnInit() {
        console.log("EditQuoteAnswerDialogComponent, quoteId", this.quoteModel.id);

        if (this.quoteModel.id !== null) {
            this.quoteService.getQupteById(this.quoteModel.id).subscribe(response => {
                this.quoteModel = response;

                console.log("quoteModel", this.quoteModel);

                this.editQuoteForm.patchValue({
                    id: this.quoteModel.id,
                    quoteText: this.quoteModel.quoteText,
                });

                this.dataSource.data = this.quoteModel.answers;

                console.log("dataSource: ", this.dataSource.data);

            });
        } 
    }

    editAnswer(answerId: string) {
        this.answerId = answerId;
        this.openDialog();
        console.log("editAnswer", this.answerId);
    }

    updateQuote() {
        this.quoteModel = this.editQuoteForm.value;
        console.log("updateQuote model", this.quoteModel);
        this.quoteService.createOrUpdate(this.quoteModel).subscribe(response => {
            if (response.id !== null) {
                alertify.success("success");
            }
            console.log(response);
            this.dialogRef.close({ updateQuoteResponse: response.id });
        });

    }

    deleteAnswer(answerId: string) {
        console.log("deleteAnswer", answerId);
        if (confirm('Are you sure you want to delete this answer?')) {
            this.answerService.deleteAnswer(answerId).subscribe(response => {
                console.log(response);
                if (response) {
                    alertify.success("success");
                    this.ngOnInit();
                }
            });
        }
    }

}
