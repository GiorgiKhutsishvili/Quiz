using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using QuoteQuiz.BLL.Models;
using QuoteQuiz.DAL.Common;
using QuoteQuiz.DAL.Domain;
using Microsoft.EntityFrameworkCore;
using QuoteQuiz.DAL.EntitiesFactory;
namespace QuoteQuiz.BLL.Repositories
{
    public class AnswerRepository : IAnswerRepository
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AnswerRepository(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        private IQueryable<Answer> GetQuery()
        {
            var query = _unitOfWork.Query<Answer>().Where(x => x.DateDeleted == null);
            return query;
        }
        public async Task<IEnumerable<Answer>> GetAnswers()
        {
            var query = await GetQuery().ToListAsync();
            return query;
        }

        public async Task<Answer> GetAnswerById(Guid id)
        {
            var entity = await GetQuery().FirstOrDefaultAsync(x => x.Id == id);
            return entity;
        }

        public async Task<Answer> Create(AnswerModel model)
        {
            var entity = EntitiesFactory.CreateEntity<Answer>();

            _mapper.Map(model, entity);

            _unitOfWork.Add(entity);

            await _unitOfWork.CommitAsync();

            return entity;
        }

        public async Task<Answer> Update(AnswerModel model)
        {
            var entity = await GetQuery().FirstOrDefaultAsync(x => x.Id == model.Id);

            //_mapper.Map(model, entity);

            entity.AnswerText = model.AnswerText;
            entity.IsCorrect = model.IsCorrect;
            entity.QuoteId = model.QuoteId;
            entity.Quote.QuoteText = model.Quote.QuoteText;
            

            entity.DateChanged = DateTime.Now;

            entity.Quote.DateChanged = DateTime.Now;

            _unitOfWork.Update(entity);


            await _unitOfWork.CommitAsync();

            return entity;
        }

        public async Task Delete(Guid id)
        {
            var entity = await GetQuery().FirstOrDefaultAsync(x => x.Id == id);

            entity.DateDeleted = DateTime.Now;

            await _unitOfWork.CommitAsync();
        }

        public async Task<UserAnswer> Create(UserAnswerModel model)
        {
            var entity = EntitiesFactory.CreateEntity<UserAnswer>();
            _mapper.Map(model, entity);

            _unitOfWork.Add(entity);

            await _unitOfWork.CommitAsync();

            return entity;
        }

       
    }
}
