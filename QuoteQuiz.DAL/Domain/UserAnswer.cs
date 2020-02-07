using QuoteQuiz.DAL.interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuoteQuiz.DAL.Domain
{
    [Table("UserAnswers")]

    public class UserAnswer : IDbEntity
    {
        [Key]
        public Guid Id { get; set; }
        public Guid? QuoteId { get; set; }
        public Guid? AnswerId { get; set; }
        public Guid? UserId { get; set; }
        public bool IsCorrect { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateChanged { get; set; }
        public DateTime? DateDeleted { get; set; }

        [ForeignKey("QuoteId")]
        public virtual Quote Quote { get; set; }

        [ForeignKey("AnswerId")]
        public virtual Answer Answer { get; set; }

    }
}
