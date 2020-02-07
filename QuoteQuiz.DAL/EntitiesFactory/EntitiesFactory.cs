using QuoteQuiz.DAL.interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace QuoteQuiz.DAL.EntitiesFactory
{
    public static class EntitiesFactory
    {
        public static TEntity CreateEntity<TEntity>() where TEntity : class, IDbEntity, new()
        {
            var entity = new TEntity
            {
                Id = Guid.NewGuid(),
                DateCreated = DateTime.Now
            };
            return entity;
        }
    }
}
