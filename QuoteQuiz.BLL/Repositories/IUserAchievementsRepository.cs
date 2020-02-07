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
    public interface IUserAchievementsRepository
    {
        Task<IEnumerable<UserAnswer>> GetUserAchievements();
    }
}
