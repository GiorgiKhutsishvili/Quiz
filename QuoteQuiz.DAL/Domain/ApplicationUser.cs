using Microsoft.AspNetCore.Identity;
using QuoteQuiz.DAL.interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace QuoteQuiz.DAL.Domain
{
    public class ApplicationUser : IdentityUser
    {
        public string Token { get; set; }
        public bool? IsEnabled { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateChanged { get; set; }
        public DateTime? DateDeleted { get; set; }
    }
}
