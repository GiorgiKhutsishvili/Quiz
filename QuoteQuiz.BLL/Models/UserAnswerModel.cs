using System;
using System.Collections.Generic;
using System.Text;

namespace QuoteQuiz.BLL.Models
{
    public class UserAnswerModel
    {
        public Guid Id { get; set; }
        public Guid? QuoteId { get; set; }
        public Guid? AnswerId { get; set; }
        public Guid? UserId { get; set; }
        public bool IsCorrect { get; set; }
        public UserModel User { get; set; }
        public QuoteModel Quote { get; set; }

        public AnswerModel Answer { get; set; }
    }
}
