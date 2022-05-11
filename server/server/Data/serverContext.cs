#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data
{
    public class serverContext : DbContext
    {

        private static List<User> usersDB = new List<User>() {
            new User() { Id="Shachar100", Name="Shachar" },
            new User() { Id="David100", Name="David" },
            new User() { Id="Aviya100", Name="Aviya" }
        };

        private static List<Chat> chatDB = new List<Chat> {
            new Chat() { 
                Id=0, User1="Shachar100", User2="David100",
                Messages = new List<Message> {
                    new Message("David", "Shachar") { Id=0, MessageText="Ma kore!?", Time=DateTime.Now.ToString() },
                    new Message("Shachar", "David") { Id=1, MessageText="אנחנו לא מתקדמיםםםםםםםםם", Time=DateTime.Now.ToString() }
                }
            },
            new Chat() { 
                Id=1, User1="Shachar100", User2="Aviya100",
                Messages = new List<Message> {
                    new Message("Shachar", "Aviya") { Id=0, MessageText="I'm so excited for Maroon 5!!", Time=DateTime.Now.ToString() },
                    new Message("Shachar", "Aviya") { Id=1, MessageText="sdfsdf", Time=DateTime.Now.ToString() }
                }
            }
        };

        public User GetCurrentUser() {
            int currUserID = 1;
            return usersDB[currUserID];
        }

        public Chat getChat(User u1, User u2) {
            Chat chat = chatDB.FirstOrDefault(
                        chat => (chat.User1 == u1.Id && chat.User2 == u2.Id)
                                || chat.User1 == u2.Id && chat.User2 == u1.Id);
            return chat;
        }

        public IList<Message> GetMessagesWithContact(string contactID) {
            User current = GetCurrentUser();
            User other = current.Contacts.FirstOrDefault(
                user => user.Id == contactID);
            if (other == null)
                return null;
            Chat chat = getChat(current, other);
            if (chat == null)
                return null;
            return chat.Messages;
        }

        public void UpdateLastInfo(User u1, User u2) {
            Chat chat = getChat(u1, u2);
            if (chat == null || chat.Messages.Count() == 0) {
                u1.LastMessage = u2.LastMessage = null;
            } else {
                u1.LastMessage = u2.LastMessage = chat.Messages[chat.Messages.Count() - 1];
            }
        }


        public serverContext (DbContextOptions<serverContext> options)
            : base(options)
        {
            usersDB[1].Contacts = new List<User>() { usersDB[0], usersDB[2] };
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder
                .Entity<User>(
                    eb => {
                        eb.HasNoKey();
                    });
        }

        public DbSet<server.Models.Rating> Rating { get; set; }

        public DbSet<server.Models.Message> Message { get; set; }

        public DbSet<server.Models.User> User { get; set; }

        public DbSet<server.Models.Chat> Chat { get; set; }
    }
}
