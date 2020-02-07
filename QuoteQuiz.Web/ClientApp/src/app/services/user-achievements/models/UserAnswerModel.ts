import { QuoteModel } from '../../quote/models/QuoteModel';
import { UserModel } from './UserModel';
import { AnswerModel } from '../../answer/models/AnswerModel';

export class UserAnswerModel {
    id: string;
    quoteId: string;
    answerId: string;
    userId: string;
    isCorrect: boolean;
    user: UserModel;
    quote: QuoteModel;
    answer: AnswerModel;
}
