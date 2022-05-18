using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controllers {

    [Authorize]
    [Route("api")]
    [ApiController]
    public class AuthenticationController : ControllerBase {
        private readonly IJWTAuthenticationManager authMan;
        public AuthenticationController(IJWTAuthenticationManager authMan) {
            this.authMan = authMan;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] UserCred userCred) {
            var token = authMan.Authenticate(userCred.Username, userCred.Password);
            if (token == null)
                return Unauthorized();
            return Ok(token);
        }
    }
}
