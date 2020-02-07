using System;
using System.ComponentModel.DataAnnotations;


namespace QuoteQuiz.DAL.interfaces
{
    public interface IDbEntity
    {
        [Key]
        Guid Id { get; set; }
        DateTime DateCreated { get; set; }
        DateTime? DateChanged { get; set; }
        DateTime? DateDeleted { get; set; }
    }
}
