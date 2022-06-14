using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Data;

namespace server.Controllers {

    [Authorize]
    [Route("api")]
    [ApiController]
    public class AuthenticationController : ControllerBase {
        private readonly IJWTAuthenticationManager authMan;
        private readonly serverContext dbContext;
        public AuthenticationController(IJWTAuthenticationManager authMan, serverContext context) {
            this.authMan = authMan;
            this.dbContext = context;
        }
        
        [AllowAnonymous]
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] UserCred userCred) {
            //Contact c = new Contact { 
            //Id="SomeContact", Name="SomeName", Server="bla", UserId="temp"};
            //dbContext.AddContact("temp", c);
            //dbContext.SaveChanges();
            IList<Contact> conts = dbContext.GetContactsOfUser("temp");
            foreach (var cont in conts) {
                Console.WriteLine(cont.Id);
            }


            //User u = new User() { Id = "temp2",Name="David", Password="abcdefg12345", Server="df",Image="", Last="ddf", LastDate="" };
            //u.Contacts.Add(c);
            //dbContext.UsersDB.Add(u);
            //dbContext.SaveChanges();



            // User not in system
            if (!dbContext.Authenticate(userCred.Username, userCred.Password)) {
                return BadRequest();
            }
            // Make token for user
            var token = authMan.MakeToken(userCred.Username);
            if (token == null)
                return Unauthorized();
            return Ok(token);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("Signup")]
        public async Task<IActionResult> Signup([FromBody] SignupCreds creds) {
            if (!ModelState.IsValid || dbContext.Authenticate(creds.Id, creds.Password)) {
                string errors = ModelState.SelectMany(state => state.Value.Errors).Aggregate("", (current, error) => current + (error.ErrorMessage + ". "));
                return BadRequest(errors);
            }
            // Add to users database
            dbContext.AddUser(new User() {
                Id = creds.Id,
                Name = creds.Name,
                Password = creds.Password,
                Server = creds.Server
            });

            // Make token for user
            var token = authMan.MakeToken(creds.Id);
            if (token == null)
                return Unauthorized();
            return Ok(token);
        }
    }
}
