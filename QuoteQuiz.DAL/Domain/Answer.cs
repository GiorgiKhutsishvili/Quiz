using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using QuoteQuiz.DAL.interfaces;
using System;

namespace QuoteQuiz.DAL.Domain
{
    [Table("Answers")]
    public class Answer : IDbEntity
    {
        [Key]
        public Guid Id { get; set; }
        public Guid? QuoteId { get; set; }
        [Required]
        [StringLength(100)]
        public string AnswerText { get; set; }
        public bool? IsCorrect { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateChanged { get; set; }
        public DateTime? DateDeleted { get; set; }

        [ForeignKey("QuoteId")]
        public virtual Quote Quote { get; set; }
    }
}
