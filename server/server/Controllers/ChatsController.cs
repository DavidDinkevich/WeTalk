﻿#nullable disable
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
    public class ChatsController : ControllerBase
    {
        private readonly serverContext _context;

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
        [Route("transfer")]
        public async Task<ActionResult> AddMessage(MsgJson msgJson) {
            return _context.AddMessage(msgJson) ? new EmptyResult() : BadRequest();
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
