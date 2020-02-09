import { Component, OnInit, Inject } from '@angular/core';
import { AnswerModel } from '../../services/answer/models/AnswerModel';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AnswerService } from '../../services/answer/answer.service';

@Component({
    selector: 'app-edit-answer-dialog',
    templateUrl: './edit-answer-dialog.component.html',
    styleUrls: ['./edit-answer-dialog.component.scss']
})
export class EditAnswerDialogComponent implements OnInit {

    answerModel: AnswerModel = new AnswerModel();

    editAnswerForm = new FormGroup({
        id: new FormControl(''),
        quoteId: new FormControl(''),
        answerText: new FormControl(''),
        isCorrect: new FormControl('')
    });

    constructor(public dialogRef: MatDialogRef<EditAnswerDialogComponent>,
        private fb: FormBuilder,
        private answerService: AnswerService,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        this.answerModel.id = data.id;

        this.editAnswerForm = fb.group({
            id: [''],
            quoteId: [''],
            answerText: ['', Validators.required],
            isCorrect: ['', Validators.required]
        });
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {

        if (this.answerModel.id !== null) {
            this.answerService.getAnswerById(this.answerModel.id).subscribe(response => {
                this.answerModel = response;

                console.log("answerModel", this.answerModel);

                this.editAnswerForm.patchValue({
                    id: this.answerModel.id,
                    quoteId: this.answerModel.quoteId,
                    answerText: this.answerModel.answerText,
                    isCorrect: this.answerModel.isCorrect
                });
            });
        }
    }

    updateAnswer() {
        this.answerModel = this.editAnswerForm.value;
        console.log("updateAnswer model", this.answerModel);
        this.answerService.createOrUpdate(this.answerModel).subscribe(response => {
            console.log(response);
        });

        this.dialogRef.close();

    }

    

}
