using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using QuoteQuiz.DAL.Domain;

namespace QuoteQuiz.DAL.DataContext
{
    public class QuoteQuizContext : IdentityDbContext<ApplicationUser>
    {
        public QuoteQuizContext(DbContextOptions<QuoteQuizContext> options) : base(options)
        {

        }


        public DbSet<Quote> Quotes { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<UserAnswer> UserAnswers { get; set; }

        
    }
}
