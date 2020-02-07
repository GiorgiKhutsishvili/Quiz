using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuoteQuiz.BLL.Models;
using QuoteQuiz.BLL.Repositories;
using QuoteQuiz.DAL.Domain;
using Microsoft.AspNetCore.Identity;

namespace QuoteQuiz.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserAchievementsController : ControllerBase
    {
        private readonly IUserAchievementsRepository _userAchievementsRepository;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> userManager;

        public UserAchievementsController(IUserAchievementsRepository userAchievementsRepository, IMapper mapper, UserManager<ApplicationUser> userManager)
        {
            _userAchievementsRepository = userAchievementsRepository;
            _mapper = mapper;
            this.userManager = userManager;
        }

        [HttpGet]
        public async Task<IEnumerable<UserAnswerModel>> GetUserAchievements()
        {
            var entities = await _userAchievementsRepository.GetUserAchievements();

            var result = _mapper.Map<IEnumerable<UserAnswer>, IEnumerable<UserAnswerModel>>(entities);

            var recordsDict = userManager.Users.ToDictionary(n => n.Id);

            foreach (var item in result)
            {
                var record = recordsDict.GetValueOrDefault(item.UserId.ToString());
                item.User = new UserModel
                {
                    Id = Guid.Parse(record.Id),
                    UserName = record.Email,
                    Email = record.Email
                };
                
            }

            return result;
        }
    }
}