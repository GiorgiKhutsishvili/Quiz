using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using QuoteQuiz.DAL.interfaces;

namespace QuoteQuiz.DAL.Domain
{
    [Table("Quotes")]
    public class Quote : IDbEntity
    {
        public Quote()
        {
            Answers = new List<Answer>();
        }
        [Key]
        public Guid Id { get; set; }
        [Required]
        [MaxLength]
        public string QuoteText { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateChanged { get; set; }
        public DateTime? DateDeleted { get; set; }
        public virtual ICollection<Answer> Answers { get; set; }
    }
}
