using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserTokensController : ControllerBase
    {
        private readonly serverContext _context;

        public UserTokensController(serverContext context)
        {
            _context = context;
        }

        /*// GET: api/UserTokens
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FirebaseManager>>> GetUserToken()
        {
          if (_context.UserToken == null)
          {
              return NotFound();
          }
            return await _context.UserToken.ToListAsync();
        }

        // GET: api/UserTokens/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FirebaseManager>> GetUserToken(string id)
        {
          if (_context.UserToken == null)
          {
              return NotFound();
          }
            var userToken = await _context.UserToken.FindAsync(id);

            if (userToken == null)
            {
                return NotFound();
            }

            return userToken;
        }

        // PUT: api/UserTokens/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        *//*[HttpPut("{id}")]
        public async Task<IActionResult> PutUserToken(string id, FirebaseManager userToken)
        {
            if (id != userToken.UserName)
            {
                return BadRequest();
            }

            _context.Entry(userToken).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserTokenExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }*//*

        // POST: api/UserTokens
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<FirebaseManager>> PostUserToken(FirebaseManager userToken)
        {
          if (_context.UserToken == null)
          {
              return Problem("Entity set 'serverContext.UserToken'  is null.");
          }
            _context.UserToken.Add(userToken);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserTokenExists(userToken.UserName))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUserToken", new { id = userToken.UserName }, userToken);
        }

        // DELETE: api/UserTokens/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserToken(string id)
        {
            if (_context.UserToken == null)
            {
                return NotFound();
            }
            var userToken = await _context.UserToken.FindAsync(id);
            if (userToken == null)
            {
                return NotFound();
            }

            _context.UserToken.Remove(userToken);
            await _context.SaveChangesAsync();

            return NoContent();
        }*/
/*
        private bool UserTokenExists(string id)
        {
            return (_context.UserToken?.Any(e => e.UserName == id)).GetValueOrDefault();
        }*/

        [HttpPost]
        [Route("/api/notificationToken")]
        public IActionResult createToken(SetFirebaseTokenRequest token) {
            var username = User.Claims.SingleOrDefault(x => x.Type.Equals("username"))?.Value;
            FirebaseManager.AddUser(username, token.FirebaseToken);
            return Ok();
        }
    }
}
