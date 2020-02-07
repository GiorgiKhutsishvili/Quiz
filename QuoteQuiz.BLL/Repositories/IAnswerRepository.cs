using QuoteQuiz.BLL.Models;
using QuoteQuiz.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace QuoteQuiz.BLL.Repositories
{
    public interface IAnswerRepository
    {
        Task<IEnumerable<Answer>> GetAnswers();
        Task<Answer> GetAnswerById(Guid id);
        Task<Answer> Create(AnswerModel model);
        Task<Answer> Update(AnswerModel model);
        Task Delete(Guid id);
        Task<UserAnswer> Create(UserAnswerModel model);
    }
}
