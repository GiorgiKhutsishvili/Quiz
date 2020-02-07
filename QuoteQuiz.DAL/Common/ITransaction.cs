using System;

namespace QuoteQuiz.DAL.Common
{
    public interface ITransaction : IDisposable
    {
        void Commit();
        void Rollback();
    }
}
