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
using System.Text.Json;
using Newtonsoft.Json.Linq;
using System.Text;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatsController : ControllerBase
    {
        private readonly serverContext _context;
        private static readonly HttpClient client = new HttpClient();

        public ChatsController(serverContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("contacts/{id}/messages")]
        public async Task<ActionResult<IList<Message>>> GetMessagesWithContact(string id) {
            var messages = _context.GetMessagesWithContact(id);
            if (messages == null)
                return NotFound();
            return Ok(messages);
        }

        [HttpGet]
        [Route("contacts/{id1}/messages/{id2}")]
        public async Task<ActionResult<Message>> GetMessageWithContact(string id1, int id2) {
            var messages = _context.GetMessagesWithContact(id1);
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
            User activeUser = _context.GetCurrentUser();
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

            // DO TRANSFER

            // First check if this user is registered with us
            // Get "to" user
            User toUser = _context.GetUserByID(toId);
            if (toUser == null) {
                Contact toContact = _context.GetContact(toId);
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
        // GET: api/Chats
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Chat>>> GetChat()
        {
            return await _context.Chat.ToListAsync();
        }

        // GET: api/Chats/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Chat>> GetChat(int id)
        {
            var chat = await _context.Chat.FindAsync(id);

            if (chat == null)
            {
                return NotFound();
            }

            return chat;
        }

        // PUT: api/Chats/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChat(int id, Chat chat)
        {
            if (id != chat.Id)
            {
                return BadRequest();
            }

            _context.Entry(chat).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChatExists(id))
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

        // POST: api/Chats
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Chat>> PostChat(Chat chat)
        {
            _context.Chat.Add(chat);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetChat", new { id = chat.Id }, chat);
        }

        // DELETE: api/Chats/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChat(int id)
        {
            var chat = await _context.Chat.FindAsync(id);
            if (chat == null)
            {
                return NotFound();
            }

            _context.Chat.Remove(chat);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ChatExists(int id)
        {
            return _context.Chat.Any(e => e.Id == id);
        }
        */
    }
}
