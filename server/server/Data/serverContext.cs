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
            new User() { Id=0, Username="Shachar" },
            new User() { Id=1, Username="David" },
            new User() { Id=2, Username="Aviya" }
        };

        private static List<Chat> chatDB = new List<Chat> {
            new Chat() { 
                Id=0, User1=0, User2=1,
                Messages = new List<Message> {
                    new Message() { Id=0, MessageText="Ma kore!?" },
                    new Message() { Id=1, MessageText="אנחנו לא מתקדמיםםםםםםםםם" }
                }
            },
            new Chat() { 
                Id=1, User1=0, User2=2,
                Messages = new List<Message> {
                    new Message() { Id=0, MessageText="I'm so excited for Maroon 5!!" },
                    new Message() { Id=1, MessageText="sdfsdf" }
                }
            }
        };

        public User GetCurrentUser() {
            int currUserID = 1;
            return usersDB[currUserID];
        }

        public ICollection<Message> GetMessagesWithContact(int contactID) {
            User current = GetCurrentUser();
            User other = current.Contacts.FirstOrDefault(
                user => user.Id == contactID);
            if (other == null)
                return null;
            Chat chat = chatDB.FirstOrDefault(
                chat => (  chat.User1 == current.Id && chat.User2 == contactID)
                        || chat.User1 == contactID && chat.User2 == current.Id);
            if (chat == null)
                return null;
            return chat.Messages;
        }


        public serverContext (DbContextOptions<serverContext> options)
            : base(options)
        {
            usersDB[1].Contacts = new List<User>() { usersDB[0] };
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
