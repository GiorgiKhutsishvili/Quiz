using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace QuoteQuiz.BLL.Models
{
    public class UserModel
    {
        public Guid Id { get; set; }
        public string Email { get; set; }

        public string UserName { get; set; }
    }
}
