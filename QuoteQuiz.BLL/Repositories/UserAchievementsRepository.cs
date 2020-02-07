using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QuoteQuiz.DAL.Common;
using QuoteQuiz.DAL.Domain;

namespace QuoteQuiz.BLL.Repositories
{
    public class UserAchievementsRepository : IUserAchievementsRepository
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public UserAchievementsRepository(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        private IQueryable<UserAnswer> GetQuery()
        {
            var query = _unitOfWork.Query<UserAnswer>().Where(x => x.DateDeleted == null);
            return query;
        }

        public async Task<IEnumerable<UserAnswer>> GetUserAchievements()
        {
            var query = await GetQuery().ToListAsync();
            return query;
        }
    }
}
