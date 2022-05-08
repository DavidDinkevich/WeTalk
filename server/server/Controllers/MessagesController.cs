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

namespace server.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase {
        private readonly serverContext _context;

        public static List<Message> messages = new List<Message>();

        public MessagesController(serverContext context) {
            messages.Add(new Message { MessageText = "sdasd" });
            messages.Add(new Message { MessageText = "a" });
            messages.Add(new Message { MessageText = "b" });
            messages.Add(new Message { MessageText = "c" });
            messages.Add(new Message { MessageText = "d" });
            _context = context;
        }

        // GET: api/Messages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessage() {
            return await _context.Message.ToListAsync();
            //            messages.Add(new Message { MessageText="sdasd"});
            //return messages;
            //List<Message> list = new List();

        }

        // GET: api/Messages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Message>> GetMessage(int id) {
            var message = await _context.Message.FindAsync(id);
            //Message message = null;
            if (message == null) {
                return NotFound();
            }

            return message;
        }

        // PUT: api/Messages/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMessage(int id, Message message) {
            if (id != message.Id) {
                return BadRequest();
            }

            _context.Entry(message).State = EntityState.Modified;

            try {
                await _context.SaveChangesAsync();
            } catch (DbUpdateConcurrencyException) {
                if (!MessageExists(id)) {
                    return NotFound();
                } else {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Messages
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Message>> PostMessage(Message message) {
            //_context.Message.Add(message);
            //await _context.SaveChangesAsync();

            return CreatedAtAction("GetMessage", new { id = message.Id }, message);
        }

        // DELETE: api/Messages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMessage(int id) {
            //var message = await _context.Message.FindAsync(id);
            Message message = null;
            if (message == null) {
                return NotFound();
            }

            //            _context.Message.Remove(message);
            //await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MessageExists(int id) {
            // return _context.Message.Any(e => e.Id == id);
            return false;
        }
    }
}
