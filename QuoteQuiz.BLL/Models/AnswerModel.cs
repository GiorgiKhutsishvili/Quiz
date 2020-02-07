using System;
using System.Collections.Generic;
using System.Text;

namespace QuoteQuiz.BLL.Models
{
    public class AnswerModel
    {
        public Guid Id { get; set; }
        public Guid? QuoteId { get; set; }
        public string AnswerText { get; set; }
        public bool IsCorrect { get; set; }
        public virtual QuoteModel Quote { get; set; }
    }
}
