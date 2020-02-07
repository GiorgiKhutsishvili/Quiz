using System;
using System.Collections.Generic;
using System.Text;

namespace QuoteQuiz.BLL.Models
{
    public class QuoteModel
    {
        public Guid Id { get; set; }
        public string QuoteText { get; set; }
        public ICollection<AnswerModel> Answers { get; set; }
    }
}
