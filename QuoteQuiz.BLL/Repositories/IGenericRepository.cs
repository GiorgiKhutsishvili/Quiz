using QuoteQuiz.DAL.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuoteQuiz.BLL.Repositories
{
    public interface IGenericRepository<TEntity> where TEntity : IDbEntity
    {
        Task<IEnumerable<TEntity>> GetAll();
        Task<TEntity> GetById(Guid id);
        Task<TEntity> Create(TEntity entity);
        Task<TEntity> Update(TEntity entity);
        Task<TEntity> CreateOrUpdate(TEntity entity);
        Task<bool> Delete(Guid id);
    }
}
