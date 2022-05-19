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
            var token = authMan.Authenticate(dbContext, userCred.Username, userCred.Password);
            if (token == null)
                return Unauthorized();
            return Ok(token);
        }
    }
}
