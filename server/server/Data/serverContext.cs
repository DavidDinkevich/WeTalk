 #nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace server.Data
{
    public class serverContext : DbContext {

        public static readonly string Server = "192.168.220.36:7013";

        private static List<User> usersDB = new List<User>() {
            new User() { Id="Shachar100", Name="Shachar", Password="yomama100", Server=Server,
                            Contacts = new List<Contact> { new Contact() { Id="John3", Name="John", Server = "david.net:22" } }  },
            new User() { Id="David100", Name="David", Password="yomama100", Server=Server },
            new User() { Id="Aviya100", Name="Aviya", Password="yomama100", Server=Server},
            new User() { Id="NoaEitan100", Name="Noa", Password="yomama100", Server=Server}
        };

        private static List<Chat> chatDB = new List<Chat> {
            new Chat() { 
                Id=0, User1="Shachar100", User2="John3",
                Messages = new List<Message> {
                    new Message("Shachar100", "John3") { Id=0, Content="Ma kore!?", Time=GetTime()},
                    //new Message("David", "Shachar") { Id=0, MessageText="Ma kore!?", Time=GetTime()},
                    //new Message("Shachar", "David") { Id=1, MessageText="אנחנו לא מתקדמיםםםםםםםםם", Time=GetTime() }
                }
            },
            new Chat() { 
                Id=0, User1="Shachar100", User2="David100",
                Messages = new List<Message> {
                    //new Message("David", "Shachar") { Id=0, MessageText="Ma kore!?", Time=GetTime()},
                    //new Message("Shachar", "David") { Id=1, MessageText="אנחנו לא מתקדמיםםםםםםםםם", Time=GetTime() }
                }
            },
            new Chat() { 
                Id=1, User1="Shachar100", User2="Aviya100",
                Messages = new List<Message> {
                    //new Message("Shachar", "Aviya") { Id=0, MessageText="I'm so excited for Maroon 5!!", Time=GetTime() },
                    //new Message("Shachar", "Aviya") { Id=1, MessageText="sdfsdf", Time=GetTime() }
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
            return DateTime.Now.ToString("yyyy'-'MM'-'dd'T'HH':'mm':'ss.fffffff");
        }

        public bool Authenticate(string username, string password) {
            return usersDB.Any(u => u.Id == username && u.Password == password);
        }


        public User GetCurrentUser(string token) {
            int currUserID = 1;
            return usersDB[currUserID];
        }

        public void AddUser(User u) {
            usersDB.Add(u);
        }
        
        public bool AddContact(string u1ID, Contact other) {
            if (u1ID == other.Id)
                return false;
            var u1 = GetUserByID(u1ID);
            if (u1 == null)
                return false;
            // Already a contact
            var find = u1.Contacts.FirstOrDefault((c) => c.Id == other.Id);
            if (find != null)
                return false;
            u1.Contacts.Add(other);
//            u2.Contacts.Add(makeContactFromUser(u1));
            chatDB.Add(new Chat() {
                Id = chatDB.Count,
                User1 = u1.Id,
                User2 = other.Id
            });

            return true;
        }

        public Chat getChat(string u1Id, string u2Id) {
            Chat chat = chatDB.FirstOrDefault(
                        c => (c.User1 == u1Id && c.User2 == u2Id)
                                || c.User1 == u2Id && c.User2 == u1Id);
            return chat;
        }

        public Contact GetContact(string activeUserID,string contactId) {
            User currUser = GetUserByID(activeUserID);
            Contact c = currUser.Contacts.FirstOrDefault((c) => c.Id == contactId);
            return c;
        }

        public bool RemoveContact(string activeUserID, string contactId) {
            var contact = GetContact(activeUserID, contactId);
            return GetUserByID(activeUserID).Contacts.Remove(contact);
        }

        public bool RemoveMessage(string activeUserID, string contactId, int messageId) {
            User curr = GetUserByID(activeUserID);
            Chat c = getChat(curr.Id, contactId);
            if (c == null)
                return false;
            Message msg = c.Messages.FirstOrDefault((m) => m.Id == messageId);
            if (msg == null)
                return false;
            c.Messages.Remove(msg);
            return true; ;
        }

        public User GetUserByID(string id) {
            return usersDB.FirstOrDefault((u) => u.Id == id);
        }

        public Contact GetUserOrContact(string id) {
            User u = GetUserByID(id);
            if (u != null)
                return makeContactFromUser(u);
            else {
                foreach (User user in usersDB) {
                    foreach (Contact c in user.Contacts) {
                        if (c.Id == id)
                            return c;
                    }
                }
            }
            return null;
        }

        public void UpdateUser(User user) {
            usersDB[usersDB.FindIndex((u) => u.Id == user.Id)] = user;
        }

        public IList<Message> GetMessagesWithContact(string activeUserID, string contactID) {
            User current = GetUserByID(activeUserID);
            Contact other = current.Contacts.FirstOrDefault(
                contact => contact.Id == contactID);
            if (other == null)
                return null;
            Chat chat = getChat(current.Id, other.Id);
            if (chat == null)
                return null;
            foreach (Message msg in chat.Messages)
                msg.Sent = (msg.Sender == current.Name || msg.Sender == current.Id);
            return chat.Messages;
        }

        public void UpdateLastInfo(string u1ID, string u2ID) {
            Chat chat = getChat(u1ID, u2ID);
            User u1 = GetUserByID(u1ID);
            User u2 = GetUserByID(u2ID);
            var last = chat == null || chat.Messages.Count() == 0 ? null : chat.Messages[chat.Messages.Count() - 1];
            if (u1 != null)
                u1.Last = last;
            if (u2 != null)
                u2.Last = last;
        }

        public Message GetLastMessageWithContact(string activeUserID, string contactId) {
            User curr = GetUserByID(activeUserID);
            Chat chat = getChat(curr.Id, contactId);
            if (chat == null || chat.Messages.Count == 0)
                return null;
            return chat.Messages[chat.Messages.Count - 1];
        }

        public bool SetMessage(string activeUserID, string contactId, int msgId, string content) {
            Chat chat = getChat(GetUserByID(activeUserID).Id, contactId);
            if (chat == null)
                return false;
            Message msg = chat.Messages.FirstOrDefault(m => m.Id == msgId);
            if (msg == null)
                return false;
            msg.Content = content;
            return true;
        }

        public bool AddMessage(Message msg) {
            Chat chat = getChat(msg.Sender, msg.Recipient);
            if (chat != null) {
                msg.Id = chat.Messages.Count();
                Contact sender = GetUserOrContact(msg.Sender);
                Contact recipient = GetUserOrContact(msg.Recipient);
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

        public bool SetContact(string activeUserID, string id, NameAndServer contact) {
            Contact cont = GetUserByID(activeUserID).Contacts.FirstOrDefault(c => c.Id == id);
            if (cont == null)
                return false;
            cont.Name = contact.Name;
            cont.Server = contact.Server;
            return true;
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

        public DbSet<server.Models.User> UsersDB { get; set; }

        public DbSet<server.Models.Chat> Chat { get; set; }
    }
}
