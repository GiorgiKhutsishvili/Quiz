using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using QuoteQuiz.BLL.Models;
using QuoteQuiz.BLL.Models.Account;
using QuoteQuiz.BLL.Models.Administration;
using QuoteQuiz.DAL.Domain;

namespace QuoteQuiz.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AdministrationController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        public AdministrationController(RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            this.roleManager = roleManager;
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            var users = userManager.Users;
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var user = await userManager.FindByIdAsync(id);

            if (user == null)
                return NotFound("user is not found");



            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> CreateRole([FromBody]RoleModel model)
        {

            IdentityRole identityRole = new IdentityRole
            {
                Name = model.RoleName
            };

            IdentityResult result = await roleManager.CreateAsync(identityRole);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody]RegisterModel model)
        {
            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                IsEnabled = true
            };

            var result = await userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);


            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateUser(UserModel model)
        {
            var user = await userManager.FindByIdAsync(model.Id.ToString());

            if (user == null)
                return NotFound("user is not found");

            user.Email = model.Email;
            user.UserName = model.UserName;

            var result = await userManager.UpdateAsync(user);

            if (!result.Succeeded)
                return BadRequest();


            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var entity = await userManager.FindByIdAsync(id);

            if (entity == null)
                return NotFound("user is not found");

            entity.DateDeleted = DateTime.Now;

            var result = await userManager.UpdateAsync(entity);

            if (result.Succeeded)
            {
                return Ok(result.Succeeded);
            }
            else
            {
                return BadRequest(result.Errors);
            }

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> DisableUser(string id)
        {
            var entity = await userManager.FindByIdAsync(id);

            if (entity == null)
                return NotFound("user is not found");

            entity.IsEnabled = false;
            entity.DateChanged = DateTime.Now;

            var result = await userManager.UpdateAsync(entity);

            if (result.Succeeded)
            {
                return Ok(result.Succeeded);
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }


    }
}