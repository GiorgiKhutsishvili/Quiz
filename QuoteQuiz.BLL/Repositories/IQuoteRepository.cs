using QuoteQuiz.BLL.Models;
using QuoteQuiz.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace QuoteQuiz.BLL.Repositories
{
    public interface IQuoteRepository
    {
        Task<IEnumerable<Quote>> GetQuotes();
        Task<Quote> GetQuoteById(Guid id);
        Task<Quote> Create(QuoteModel model);
        Task<Quote> Update(QuoteModel model);
        Task Delete(Guid id);
    }
}
