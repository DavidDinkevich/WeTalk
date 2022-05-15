#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;


namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly serverContext _context;


        public UsersController(serverContext context)
        {
            _context = context;

        }

        

        /*
        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            return await _context.User.ToListAsync();
        }
        */
        [HttpGet]
        [Route("contacts")]
        public async Task<ActionResult<ICollection<User>>> GetContacts() {
            if (HttpContext.Session.GetString("username") == null)
                return BadRequest("Invalid session");

            //var user = await _context.User.FindAsync(0);
            var user = _context.GetCurrentUser();

            if (user == null) {
                return NotFound();
            }
            var contacts = user.Contacts;
            for (var i = 0; i < contacts.Count; i++) {
                var contact = contacts[i];
                _context.UpdateLastInfo(user, contact);
            }
            return Ok(contacts);
        }

        [HttpPost]
        [Route("contacts")]
        public async Task<ActionResult> AddContact(AddContactInput inp) {
            //var user = await _context.User.FindAsync(0);
            var user = _context.GetCurrentUser();
            if (_context.ConnectUsers(user.Id, inp.Id))
                return Ok();
            return NotFound();
        }


        [HttpGet]
        [Route("contacts/{id}")]
        public async Task<ActionResult<User>> GetContactByID(string id) {
            var user = _context.GetCurrentUser();
            User contact = user.Contacts.FirstOrDefault(user => user.Id == id);
            if (contact == null) {
                return NotFound();
            }
            _context.UpdateLastInfo(user, contact);
            return contact;
        }

        // PUT: api/Users/5
        [HttpPut("contacts/{id}")]
        public async Task<IActionResult> PutUser(string id, User user) {
            if (id != user.Id) {
                return BadRequest();
            }

            User userInDB = _context.GetUserByID(id);
            if (userInDB == null) {
                return NotFound();
            }
            else {
                _context.UpdateUser(user);
            }

            //            _context.Entry(user).State = EntityState.Modified;

            /*            try {
                            await _context.SaveChangesAsync();
                        } catch (DbUpdateConcurrencyException) {
                            if (!UserExists(id)) {
                                return NotFound();
                            } else {
                                throw;
                            }
                        }
            */
            return NoContent();
        }

        [HttpPost]
        [Route("Login")]
        
        
        public async Task<IActionResult> Login() {
            Console.WriteLine("we ACTUALLY got here!!!!");
            HttpContext.Session.SetString("username", "shachar");
            Console.WriteLine(HttpContext.Session.GetString("username"));
            return Ok();
        }

        /*
        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id) {
            var user = await _context.User.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.User.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.User.Any(e => e.Id == id);
        }
        */
    }
}
