using System;
using AutoMapper;
using QuoteQuiz.BLL.Models;
using QuoteQuiz.DAL.Domain;

namespace QuoteQuiz.BLL.Mapper
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            CreateMap<QuoteModel, Quote>()
                .ForMember(n => n.Id, m => m.Ignore())
                .ForMember(n => n.DateDeleted, m => m.Ignore())
                .ForMember(n => n.DateCreated, m => m.Ignore());

            CreateMap<Quote, QuoteModel>();

            CreateMap<AnswerModel, Answer>()
            .ForMember(n => n.Id, m => m.Ignore())
                .ForMember(n => n.Quote, m => m.Ignore())
                .ForMember(n => n.DateDeleted, m => m.Ignore())
                .ForMember(n => n.DateCreated, m => m.Ignore());


            CreateMap<Answer, AnswerModel>();

            CreateMap<UserAnswerModel, UserAnswer>()
                .ForMember(n => n.Id, m => m.Ignore())
                .ForMember(n => n.DateDeleted, m => m.Ignore())
                .ForMember(n => n.DateCreated, m => m.Ignore());

            CreateMap<UserAnswer, UserAnswerModel>();


        }
    }
}
