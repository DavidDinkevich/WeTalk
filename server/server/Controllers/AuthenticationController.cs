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
            // User in system
            if (dbContext.Authenticate(creds.Id, creds.Password)) {
                return BadRequest();
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
