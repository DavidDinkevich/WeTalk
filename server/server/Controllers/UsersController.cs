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
using System.Net.Http;
using Newtonsoft.Json.Linq;
using System.Text;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly serverContext _context;
        private static readonly HttpClient client = new HttpClient();



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
            //string username = HttpContext.Session.GetString("username");
            //if (username == null)
            //    return BadRequest("Invalid session");

            //var user = await _context.User.FindAsync(0);
            var user = _context.GetCurrentUser();

            if (user == null) {
                return NotFound();
            }
            var contacts = user.Contacts;
            var userContacts = new List<User>();
            for (var i = 0; i < contacts.Count; i++) {
                var contact = contacts[i];
                _context.UpdateLastInfo(user.Id, contact.Id);
                userContacts.Add(_context.GetUserByID(contact.Id));
            }
            return Ok(userContacts);
        }

        [HttpPost]
        [Route("contacts")]
        public async Task<ActionResult> AddContact(Contact inp) {
            //var user = await _context.User.FindAsync(0);
            var user = _context.GetCurrentUser();
            // Add to us
            if (!_context.AddContact(user.Id, inp.Id))
                return NotFound();

            Console.WriteLine(string.Format("https://{0}/api/Users/invitations", inp.Server));
            // SEND INVITATION TO OTHER SERVER
            JObject oJsonObject = new JObject();

            oJsonObject.Add("from", user.Id);
            oJsonObject.Add("to", inp.Id);
            oJsonObject.Add("server", inp.Server);

            var content = new StringContent(oJsonObject.ToString(), Encoding.UTF8, "application/json");
            var response = await client.PostAsync(
                string.Format("https://{0}/api/Users/invitations", inp.Server),
                content);
            //var responseString = await response.Content.ReadAsStringAsync();

            return Ok();
        }


        [HttpGet]
        [Route("contacts/{id}")]
        public async Task<ActionResult<Contact>> GetContactByID(string id) {
            var user = _context.GetCurrentUser();
            Contact contact = user.Contacts.FirstOrDefault(contact => contact.Id == id);
            if (contact == null) {
                return NotFound();
            }
            _context.UpdateLastInfo(user.Id, contact.Id);
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

        [HttpGet]
        [Route("Login")]
        [AutoValidateAntiforgeryToken]
        
        
        public async Task<IActionResult> Login() {
            Console.WriteLine("we ACTUALLY got here!!!!");
            HttpContext.Session.SetString("username", "shachar");
            Console.WriteLine(HttpContext.Session.GetString("username"));
            return Ok();
        }

        [HttpPost]
        [Route("invitations")]
        public async Task<IActionResult> Invitation(Invitation invo) {
            Console.WriteLine("We got");
            //Console.WriteLine(invo.ToString());
            User to = _context.GetUserByID(invo.To);
            User from = _context.GetUserByID(invo.From);
            // User not here
            if (to == null)
                return NotFound();
            if (from == null) {
                from = new User() {
                    Id = invo.From,
                    Name = invo.From,
                    Server = invo.Server
                };
                _context.AddUser(from);
            }
            // Add as contact
            _context.AddContact(invo.To, invo.From);
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
