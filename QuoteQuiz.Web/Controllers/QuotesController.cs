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
        //private readonly IQuoteRepository _quoteRepository;
        private readonly IGenericRepository<Quote> _quotesRepository;
        private readonly IMapper _mapper;
        public QuotesController(/*IQuoteRepository quoteRepository,*/ IGenericRepository<Quote> quotesRepository, IMapper mapper)
        {
            //_quoteRepository = quoteRepository;
            _quotesRepository = quotesRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<QuoteModel>> GetQuotes()
        {
            //var result = await _quoteRepository.GetQuotes();
            var result = await _quotesRepository.GetAll();

            return _mapper.Map<IEnumerable<Quote>, IEnumerable<QuoteModel>>(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuoteById(Guid id)
        {
            //var entity = await _quoteRepository.GetQuoteById(id);
            var entity = await _quotesRepository.GetById(id);

            if (entity == null)
                return NotFound();

            var result = _mapper.Map<Quote, QuoteModel>(entity);

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrUpdate([FromBody] QuoteModel model)
        {
            try
            {

                var entity = EntitiesFactory.CreateEntity<Quote>();

                _mapper.Map(model, entity);


                var result = await _quotesRepository.CreateOrUpdate(entity);

                return Ok(result);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message + ", " + e.StackTrace);
            }
            
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var quote = await _quotesRepository.GetById(id);

            if (quote == null)
                return BadRequest();

            await _quotesRepository.Delete(id);

            return Ok();

        }

        //[HttpPut]
        //public async Task<IActionResult> Update([FromBody] QuoteModel model)
        //{
        //    try
        //    {
        //        var entity = await _quoteRepository.Update(model);
        //        var result = _mapper.Map<Quote, QuoteModel>(entity);
        //        return Ok(result);
        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest(e.Message + ", " + e.StackTrace);
        //    }

        //}


    }
}