import { QuoteModel } from '../../quote/models/QuoteModel';

export class AnswerModel {
    id: string;
    quoteId: string;
    answerText: string;
    quoteText: string;
    isCorrect?: boolean;
    quote: QuoteModel = new QuoteModel();
}
