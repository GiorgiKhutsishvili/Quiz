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
    public class QuoteRepository : IQuoteRepository
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public QuoteRepository(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        private IQueryable<Quote> GetQuery()
        {
            var query = _unitOfWork.Query<Quote>().Where(x => x.DateDeleted == null);
            return query;
        }

        public async Task<IEnumerable<Quote>> GetQuotes()
        {
            var query = await GetQuery().ToListAsync();
            return query;
        }


        public async Task<Quote> GetQuoteById(Guid id)
        {
            var entity = await GetQuery().FirstOrDefaultAsync(x => x.Id == id);
            return entity;
        }

        public async Task<Quote> Create(QuoteModel model)
        {
            var entity = EntitiesFactory.CreateEntity<Quote>();

            _mapper.Map(model, entity);

            _unitOfWork.Add(entity);

            await _unitOfWork.CommitAsync();

            return entity;
        }



        public async Task<Quote> Update(QuoteModel model)
        {
            
            var entity = await GetQuery().FirstOrDefaultAsync(x => x.Id == model.Id);

            _mapper.Map(model, entity);

            entity.DateChanged = DateTime.Now;

            _unitOfWork.Update(entity);


            await _unitOfWork.CommitAsync();

            return entity;
            
        }

        public async Task Delete(Guid id)
        {
            var entity = await GetQuery().FirstOrDefaultAsync(x => x.Id == id);

            entity.DateDeleted = DateTime.Now;

            foreach(var item in entity.Answers)
            {
                item.DateDeleted = DateTime.Now;
            }

            await _unitOfWork.CommitAsync();

        }
    }
}
