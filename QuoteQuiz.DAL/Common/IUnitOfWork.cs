using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using QuoteQuiz.DAL.interfaces;

namespace QuoteQuiz.DAL.Common
{
    public interface IUnitOfWork : IDisposable
    {
        ITransaction BeginTransaction(IsolationLevel isolationLevel = IsolationLevel.ReadCommitted);

        void Add<T>(T entity) where T : class, IDbEntity;
        void Update<T>(T entity) where T : class, IDbEntity;
        void Remove<T>(T entity) where T : class, IDbEntity;
        IQueryable<T> Query<T>() where T : class, IDbEntity;
        void Commit();
        Task CommitAsync();
        void Attach<T>(T entity) where T : class, IDbEntity;
    }
}
