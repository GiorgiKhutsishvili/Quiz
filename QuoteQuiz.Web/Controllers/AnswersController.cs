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
using QuoteQuiz.DAL.EntitiesFactory;

namespace QuoteQuiz.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AnswersController : ControllerBase
    {
        private readonly IGenericRepository<Answer> _answersRepository;
        private readonly IGenericRepository<UserAnswer> _userAnswersRepository;

        private readonly IMapper _mapper;

        public AnswersController(IGenericRepository<Quote> quotesRepository, IGenericRepository<Answer> answersRepository, IGenericRepository<UserAnswer> userAnswersRepository, IMapper mapper)
        {
            _answersRepository = answersRepository;
            _userAnswersRepository = userAnswersRepository;
            _mapper = mapper;
        }


        [HttpGet]
        public async Task<IEnumerable<AnswerModel>> GetAnswers()
        {
            var result = await _answersRepository.GetAll();

            return _mapper.Map<IEnumerable<Answer>, IEnumerable<AnswerModel>>(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAnswerById(Guid id)
        {
            //var entity = await _answerRepository.GetAnswerById(id);
            var entity = await _answersRepository.GetById(id);

            if (entity == null)
                return NotFound();

            var result = _mapper.Map<Answer, AnswerModel>(entity);

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> CheckAnswer(Guid id)
        {
            string message = null;

            //var entity = await _answerRepository.GetAnswerById(id);
            var entity = await _answersRepository.GetById(id);

            if (entity == null)
                return NotFound();

            var result = _mapper.Map<Answer, AnswerModel>(entity);

            var userId = HttpContext.User.Claims.First().Value;
            if (userId == null)
                return NotFound("UserId Is Not Found");

            var userAnswerModel = new UserAnswerModel
            {
                QuoteId = result.QuoteId,
                AnswerId = result.Id,
                UserId = Guid.Parse(userId),
                IsCorrect = result.IsCorrect
            };

            var userAnswer = EntitiesFactory.CreateEntity<UserAnswer>();

            _mapper.Map(userAnswerModel, userAnswer);

            if (userAnswer != null)
                //await _answerRepository.Create(userAnswerModel);
                await _userAnswersRepository.CreateOrUpdate(userAnswer);


            if (result.IsCorrect == true)
            {
                //message = string.Format("{0}{1}", "Correct, The Right Answer Is: ", result.AnswerText);
                message = $"{0}{1}, {"Correct, The Right Answer Is: "}, {result.AnswerText}";
            }
            else
            {
                var correctAnswer = result.Quote.Answers.FirstOrDefault(x => x.IsCorrect == true);

                if (correctAnswer == null)
                    return NotFound("Correct Answer Is Not Found");

                //message = string.Format("{0}{1}", "Sorry, you are wrong! The right answer is: ", correctAnswer.AnswerText);
                message = $"{0}{1}, {"Sorry, you are wrong! The right answer is: "},{correctAnswer.AnswerText}";
            }


            return Ok(message);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AnswerModel model)
        {
            try
            {
                if (model == null)
                    return BadRequest("Model is null");

                var entity = EntitiesFactory.CreateEntity<Answer>();

                _mapper.Map(model, entity);


                var result = await _answersRepository.Create(entity);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message + ", " + e.StackTrace);
            }

        }

        [HttpPost]
        public async Task<IActionResult> Update([FromBody] AnswerModel model)
        {
            try
            {
                if (model == null)
                    return BadRequest("Model is null");

                var answer = await _answersRepository.GetById(model.Id);

                if (answer == null)
                    return BadRequest("quote is null");

                _mapper.Map(model, answer);

                var result = await _answersRepository.Update(answer);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrUpdate([FromBody] AnswerModel model)
        {
            try
            {
                if (model == null)
                    return BadRequest("Model is null");

                if (model.Id == null || model.Id == Guid.Empty)
                    return await Create(model);

                return await Update(model);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var answer = await _answersRepository.GetById(id);

            if (answer == null)
                return BadRequest();

            var result = await _answersRepository.Delete(id);

            return Ok(result);

        }
    }
}