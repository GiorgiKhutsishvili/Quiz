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
    public class QuotesController : ControllerBase
    {
        private readonly IGenericRepository<Quote> _quotesRepository;
        private readonly IMapper _mapper;
        public QuotesController(IGenericRepository<Quote> quotesRepository, IMapper mapper)
        {
            _quotesRepository = quotesRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<QuoteModel>> GetQuotes()
        {
            var quotes = await _quotesRepository.GetAll();

            var answersLp = quotes.SelectMany(x => x.Answers.Where(n => n.DateDeleted == null)).ToLookup(x => x.QuoteId);

            foreach(var item in quotes)
            {
                item.Answers = answersLp[item.Id].ToList();
            }

            return _mapper.Map<IEnumerable<Quote>, IEnumerable<QuoteModel>>(quotes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuoteById(Guid id)
        {
            var entity = await _quotesRepository.GetById(id);

            var answers = entity.Answers.Where(x => x.DateDeleted == null);

            entity.Answers = answers.ToList();

            if (entity == null)
                return NotFound();

            var result = _mapper.Map<Quote, QuoteModel>(entity);

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] QuoteModel model)
        {
            try
            {
                if (model == null)
                    return BadRequest("Model is null");

                var entity = EntitiesFactory.CreateEntity<Quote>();

                _mapper.Map(model, entity);


                var quote = await _quotesRepository.Create(entity);

                var result = _mapper.Map(quote, model);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message + ", " + e.StackTrace);
            }

        }

        [HttpPost]
        public async Task<IActionResult> Update([FromBody] QuoteModel model)
        {
            try
            {
                if (model == null)
                    return BadRequest("Model is null");

                var entity = await _quotesRepository.GetById(model.Id);

                if (entity == null)
                    return BadRequest("quote is null");

                _mapper.Map(model, entity);

                var quote = await _quotesRepository.Update(entity);

                var result = _mapper.Map(quote, model);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrUpdate([FromBody] QuoteModel model)
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
            var quote = await _quotesRepository.GetById(id);

            if (quote == null)
                return BadRequest();

            foreach(var item in quote.Answers)
            {
                item.DateDeleted = DateTime.Now;
            }
            var result = await _quotesRepository.Delete(id);

            return Ok(result);

        }


    }
}