 #nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data
{
    public class serverContext : DbContext {

        private static List<User> usersDB = new List<User>() {
            new User() { Id="Shachar100", Name="Shachar" , Server="localhost:7013"},
            new User() { Id="David100", Name="David", Server="localhost:7013" },
            new User() { Id="Aviya100", Name="Aviya" ,Server="localhost:7013"},
            new User() { Id="NoaEitan100", Name="Noa" ,Server="localhost:7013"}
        };

        private static List<Chat> chatDB = new List<Chat> {
            new Chat() { 
                Id=0, User1="Shachar100", User2="David100",
                Messages = new List<Message> {
                    new Message("David", "Shachar") { Id=0, MessageText="Ma kore!?", Time=GetTime()},
                    new Message("Shachar", "David") { Id=1, MessageText="אנחנו לא מתקדמיםםםםםםםםם", Time=GetTime() }
                }
            },
            new Chat() { 
                Id=1, User1="Shachar100", User2="Aviya100",
                Messages = new List<Message> {
                    new Message("Shachar", "Aviya") { Id=0, MessageText="I'm so excited for Maroon 5!!", Time=GetTime() },
                    new Message("Shachar", "Aviya") { Id=1, MessageText="sdfsdf", Time=GetTime() }
                }
            },
            new Chat() {
                Id=2, User1="Aviya100", User2="David100",
                Messages = new List<Message> {}
            },
            new Chat() {
                Id=3, User1="David100", User2="NoaEitan100",
                Messages= new List<Message> {}
            }
            
        };

        static serverContext() {
            usersDB[1].Contacts = new List<Contact>() { 
                makeContactFromUser(usersDB[0]),
                makeContactFromUser(usersDB[2])
            };

        }

        public static Contact makeContactFromUser(User u) {
            return new Contact { 
                Id = u.Id,
                Server = u.Server,
                Name = u.Name 
            };
        }

        public static string GetTime() {
            return DateTime.Now.ToShortTimeString() + ":" + DateTime.Now.Second.ToString();
        }

        public User GetCurrentUser() {
            int currUserID = 1;
            return usersDB[currUserID];
        }

        public void AddUser(User u) {
            usersDB.Add(u);
        }
        
        public bool AddContact(string u1ID, string u2ID) {
            if (u1ID == u2ID)
                return false;
            var u1 = GetUserByID(u1ID);
            var u2 = GetUserByID(u2ID);
            if (u1 == null || u2 == null)
                return false;
            // Already a contact
            var find = u1.Contacts.FirstOrDefault((c) => c.Id == u2ID);
            if (find != null)
                return true;
            u1.Contacts.Add(makeContactFromUser(u2));
//            u2.Contacts.Add(makeContactFromUser(u1));
            chatDB.Add(new Chat() {
                Id = chatDB.Count,
                User1 = u1.Id,
                User2 = u2.Id
            });

            return true;
        }

        public Chat getChat(string u1Id, string u2Id) {
            Chat chat = chatDB.FirstOrDefault(
                        c => (c.User1 == u1Id && c.User2 == u2Id)
                                || c.User1 == u2Id && c.User2 == u1Id);
            return chat;
        }

        public User GetUserByID(string id) {
            return usersDB.FirstOrDefault((u) => u.Id == id);
        }

        public void UpdateUser(User user) {
            usersDB[usersDB.FindIndex((u) => u.Id == user.Id)] = user;
        }

        public IList<Message> GetMessagesWithContact(string contactID) {
            User current = GetCurrentUser();
            Contact other = current.Contacts.FirstOrDefault(
                contact => contact.Id == contactID);
            if (other == null)
                return null;
            Chat chat = getChat(current.Id, other.Id);
            if (chat == null)
                return null;
            return chat.Messages;
        }

        public void UpdateLastInfo(string u1ID, string u2ID) {
            Chat chat = getChat(u1ID, u2ID);
            User u1 = GetUserByID(u1ID);
            User u2 = GetUserByID(u2ID);
            if (chat == null || chat.Messages.Count() == 0) {
                u1.LastMessage = u2.LastMessage = null;
            } else {
                u1.LastMessage = u2.LastMessage = chat.Messages[chat.Messages.Count() - 1];
            }
        }

        public bool AddMessage(Message msg) {
            Chat chat = getChat(msg.Sender, msg.Recipient);
            if (chat != null) {
                msg.Id = chat.Messages.Count();
                User sender = GetUserByID(msg.Sender);
                User recipient = GetUserByID(msg.Recipient);
                if (sender != null && recipient != null) {
                    msg.Sender = sender.Name;
                    msg.Recipient = recipient.Name;
                    chat.Messages.Add(msg);
                    // saveChanges();
                    return true;
                }
            }
            return false;
        }

        public serverContext (DbContextOptions<serverContext> options)
            : base(options)
        {
            //usersDB[1].Contacts = new List<User>() { usersDB[0], usersDB[2] };
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
