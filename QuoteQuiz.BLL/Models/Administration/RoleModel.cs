using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace QuoteQuiz.BLL.Models.Administration
{
    public class RoleModel
    {
        [Required]
        public string RoleName { get; set; }
    }
}
