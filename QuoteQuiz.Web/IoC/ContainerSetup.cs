using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using QuoteQuiz.BLL.Repositories;
using QuoteQuiz.DAL.Common;
using QuoteQuiz.DAL.DataContext;
using QuoteQuiz.DAL.Domain;
using System.Text;

namespace QuoteQuiz.Web.IoC
{
    public static class ContainerSetup
    {
        public static void Setup(IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddEntityFrameworkSqlServer();



            services.AddDbContext<QuoteQuizContext>(options =>
                options.UseLazyLoadingProxies().
                    UseSqlServer(configuration.GetConnectionString("DefaultConnection"), b => b.MigrationsAssembly("QuoteQuiz.Web")));



            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<QuoteQuizContext>();

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is the secret phrase"));

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(cfg =>
            {
                cfg.RequireHttpsMetadata = false;
                cfg.SaveToken = true;
                cfg.TokenValidationParameters = new TokenValidationParameters()
                {
                    IssuerSigningKey = signingKey,
                    ValidateAudience = false,
                    ValidateIssuer = false,
                    ValidateLifetime = false,
                    ValidateIssuerSigningKey = true
                };
            });

            AddUow(services, configuration);
            AddRepositories(services);
            ConfigureAutoMapper(services);
            AddCors(services);
        }

        private static void AddUow(IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IUnitOfWork>(ctx => new UnitOfWork(ctx.GetRequiredService<QuoteQuizContext>()));


            //services.AddScoped<IActionTransactionHelper, ActionTransactionHelper>();
            //services.AddScoped<UnitOfWorkFilterAttribute>();
        }

        private static void AddRepositories(IServiceCollection services)
        {
            services.AddScoped<IUserAchievementsRepository, UserAchievementsRepository>();
            services.AddScoped<IGenericRepository<Quote>, GenericRepository<Quote>>();
            services.AddScoped<IGenericRepository<Answer>, GenericRepository<Answer>>();
            services.AddScoped<IGenericRepository<UserAnswer>, GenericRepository<UserAnswer>>();
        }

        private static void ConfigureAutoMapper(IServiceCollection services)
        {
            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new BLL.Mapper.AutoMapper());
            });

            IMapper mapper = mappingConfig.CreateMapper();
            services.AddSingleton(mapper);
        }

        private static void AddCors(IServiceCollection services)
        {
            services.AddCors(opt => opt.AddPolicy("Cors", builder =>
            {
                builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            }));
        }
    }
}