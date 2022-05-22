﻿#nullable disable
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;
using Newtonsoft.Json.Linq;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using System.Text.Json;

namespace server.Controllers
{   
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase {
        private readonly serverContext _context;
        private static readonly HttpClient client = new HttpClient();


        public UsersController(serverContext context) {
            _context = context;
            //            this.authMan = authMan;
        }

        public User GetCurrentUser() {
            Console.WriteLine(User.Claims.ToList()[0].ToString());
            var claim = User.Claims.SingleOrDefault(x => x.Type.Equals("username")).Value;
            return _context.GetUserByID(claim);
        }

        [HttpGet]
        [Route("info")]
        public async Task<ActionResult<User>> GetCurrentUserInfo() {
            return Ok(GetCurrentUser());
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
            var user = GetCurrentUser();

            if (user == null) {
                return NotFound();
            }
            var contacts = user.Contacts;
            var userContacts = new List<User>();
            for (var i = 0; i < contacts.Count; i++) {
                var contact = contacts[i];
                //                string lastMessage = _context.
                User u = new User() {
                    Id = contact.Id,
                    Name = contact.Name,
                    Server = contact.Server,
                    LastMessage = _context.GetLastMessageWithContact(user.Id, contact.Id),
                };
                userContacts.Add(u);
            }
            return Ok(userContacts);
        }

        [HttpPost]
        [Route("contacts")]
        public async Task<ActionResult> AddContact(Contact inp) {
            //var user = await _context.User.FindAsync(0);
            var user = GetCurrentUser();
            // Add to us
            if (!_context.AddContact(user.Id, inp))
                return NotFound();

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

        [HttpDelete]
        [Route("contacts/{id}")]
        public async Task<ActionResult> DeleteContact(string id) {
            //var user = await _context.User.FindAsync(0);
            var user = GetCurrentUser();
            if (!_context.RemoveContact(user.Id,id))
                return BadRequest();
            return Ok();
        }

        [HttpDelete]
        [Route("contacts/{id}/messages/{id2}")]
        public async Task<ActionResult> DeleteMessage(string id, int id2) {
            var user = GetCurrentUser();
            if (!_context.RemoveMessage(user.Id,id, id2))
                return BadRequest();
            return Ok();
        }

        [HttpPut]
        [Route("contacts/{id}/messages/{id2}")]
        public async Task<ActionResult> PutMessage(string id, int id2, Content content) {
            var user = GetCurrentUser();
            if (!_context.SetMessage(user.Id,id, id2, content.MessageText))
                return BadRequest();
            return Ok();
        }

        [HttpPut]
        [Route("contacts/{id}")]
        public async Task<ActionResult> PutContact(string id, NameAndServer contact) {
            var user = GetCurrentUser();
            if (!_context.SetContact(user.Id, id, contact))
                return BadRequest();
            return Ok();
        }


        [HttpGet]
        [Route("contacts/{id}")]
        public async Task<ActionResult<Contact>> GetContactByID(string id) {
            var user = GetCurrentUser();
            Contact contact = user.Contacts.FirstOrDefault(contact => contact.Id == id);
            if (contact == null) {
                return NotFound();
            }
            _context.UpdateLastInfo(user.Id, contact.Id);
            return contact;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("invitations")]
        public async Task<IActionResult> Invitation(Invitation invo) {
            User to = _context.GetUserByID(invo.To);
            //User from = _context.GetUserByID(invo.From);
            // User not here
            if (to == null)
                return NotFound();
            //if (from == null) {
            //    from = new User() {
            //        Id = invo.From,
            //        Name = invo.From,
            //        Server = invo.Server
            //    };
            //    _context.AddUser(from);
            //}
            // Add as contact

            Contact fromContact = new Contact() {
                Id = invo.From,
                Name = invo.From, // No info given about name, bad API :(
                Server = invo.Server
            };
            _context.AddContact(invo.To, fromContact);
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("transfer")]
        public async Task<IActionResult> Transfer(MsgJson transfer) {
            User to = _context.GetUserByID(transfer.To);
            User from = _context.GetUserByID(transfer.From);
            // User not here
            if (to == null || from == null)
                return NotFound();
            var msg = new Message(transfer.From, transfer.To) {
                MessageText = transfer.Content
            };
            _context.AddMessage(msg);                           
            return Ok();
        }

        [HttpGet]
        [Route("contacts/{id}/messages")]
        public async Task<ActionResult<IList<Message>>> GetMessagesWithContact(string id) {
            var user = GetCurrentUser();
            var messages = _context.GetMessagesWithContact(user.Id, id);
            if (messages == null)
                return NotFound();
            return Ok(messages);
        }

        [HttpGet]
        [Route("contacts/{id1}/messages/{id2}")]
        public async Task<ActionResult<Message>> GetMessageWithContact(string id1, int id2) {
            var user = GetCurrentUser();
            var messages = _context.GetMessagesWithContact(user.Id, id1);
            if (messages == null)
                return NotFound();
            var message = messages.FirstOrDefault(msg => msg.Id == id2);
            if (message == null)
                return NotFound();
            return Ok(message);
        }

        [HttpPost]
        [Route("contacts/{toId}/messages")]
        public async Task<ActionResult> AddMessage(string toId, [Bind("Content")] MsgJson msgJson) {
            if (msgJson == null)
                return BadRequest();
            User activeUser = GetCurrentUser();
            Message msg;
            try { // Our API
                msg = JsonSerializer.Deserialize<Message>(msgJson.Content);
                msg.Sender = activeUser.Id;
                msg.Recipient = toId;
            }
            // Hemi's API
            catch (Exception ex) {
                // Foreign client
                msg = new Message(activeUser.Id, toId) {
                    MessageText = msgJson.Content,
                    Time = serverContext.GetTime()
                };
            }
            // Try to add the message to the database
            if (!_context.AddMessage(msg))
                return BadRequest();

            // UPDATE LISTENERS (SIGNALR)


            // DO TRANSFER

            // First check if this user is registered with us
            // Get "to" user
            User toUser = _context.GetUserByID(toId);
            if (toUser == null) {
                var user = GetCurrentUser();
                Contact toContact = _context.GetContact(user.Id, toId);
                string server = toContact.Server;
                JObject oJsonObject = new JObject();
                oJsonObject.Add("from", activeUser.Id);
                oJsonObject.Add("to", toId);
                oJsonObject.Add("content", msgJson.Content);

                var content = new StringContent(oJsonObject.ToString(), Encoding.UTF8, "application/json");
                await client.PostAsync(
                    string.Format("https://{0}/api/Users/transfer", server),
                    content
                );
            }
            return Created(
                    string.Format("api/contacts/{0}/messages/{1}",
                    toId, msg.Id), msg
            );
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
