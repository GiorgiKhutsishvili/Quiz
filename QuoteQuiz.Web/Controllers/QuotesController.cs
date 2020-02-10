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
            var result = await _quotesRepository.GetAll();

            return _mapper.Map<IEnumerable<Quote>, IEnumerable<QuoteModel>>(result);
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


                var result = await _quotesRepository.Create(entity);
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

                var quote = await _quotesRepository.GetById(model.Id);

                if (quote == null)
                    return BadRequest("quote is null");

                _mapper.Map(model, quote);

                var result = await _quotesRepository.Update(quote);

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