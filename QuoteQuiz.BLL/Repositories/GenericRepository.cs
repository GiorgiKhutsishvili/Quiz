using QuoteQuiz.DAL.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using QuoteQuiz.DAL.Common;

namespace QuoteQuiz.BLL.Repositories
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class, IDbEntity
    {
        private readonly IUnitOfWork _unitOfWork;

        public GenericRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        private IQueryable<TEntity> GetQuery()
        {
            var query = _unitOfWork.Query<TEntity>().Where(x => x.DateDeleted == null);
            return query;
        }
        public async Task<IEnumerable<TEntity>> GetAll()
        {
            var query = await GetQuery().ToListAsync();
            return query;
        }

        public async Task<TEntity> GetById(Guid id)
        {
            var entity = await GetQuery().FirstOrDefaultAsync(x => x.Id == id);
            return entity;
        }

        public async Task<TEntity> Create(TEntity entity)
        {
            _unitOfWork.Add(entity);
            await _unitOfWork.CommitAsync();

            return entity;
        }

        public async Task<TEntity> Update(TEntity entity)
        {
            _unitOfWork.Update(entity);
            await _unitOfWork.CommitAsync();

            return entity;
        }

        public async Task<TEntity> CreateOrUpdate(TEntity entity)
        {
            var data = await GetById(entity.Id);
            if (data == null)
            {
                await Create(entity);
            }
            else
            {
                await Update(entity);
            }

            await _unitOfWork.CommitAsync();
            return entity;
        }

        public async Task<Boolean> Delete(Guid id)
        {
            var entity = await GetById(id);
            if (entity == null) return false;

            entity.DateDeleted = DateTime.Now;
            _unitOfWork.Update(entity);

            await _unitOfWork.CommitAsync();
            return true;
        }
    }
}
