import { AnswerModel } from '../../answer/models/AnswerModel';

export class QuoteModel {
    id: string;
    quoteText: string;
    answers: AnswerModel[] = new Array <AnswerModel>();
}
