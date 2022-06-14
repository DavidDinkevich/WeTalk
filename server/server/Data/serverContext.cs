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

        public static readonly string Server = "127.0.0.1:7013";

        private static List<User> usersDB = new List<User>() {
            //new User() { Id="Shachar100", Name="Shachar", Password="yomama100", Server=Server },
            //new User() { Id="David100", Name="David", Password="yomama100", Server=Server },
            //new User() { Id="Aviya100", Name="Aviya", Password="yomama100", Server=Server},
            //new User() { Id="NoaEitan100", Name="Noa", Password="yomama100", Server=Server}
        };

        private static List<Chat> chatDB = new List<Chat> {
            /*new Chat() { 
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
            }*/
            
        };

        static serverContext() {
            /*usersDB[1].Contacts = new List<Contact>() { 
                makeContactFromUser(usersDB[0]),
                makeContactFromUser(usersDB[2])
            };*/

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
            //            return usersDB.Any(u => u.Id == username && u.Password == password);
            return UsersDB.Any(u => u.Id == username && u.Password == password);
        }


        public User GetCurrentUser(string token) {
            int currUserID = 1;
            return usersDB[currUserID];
        }

        public Contact GetContact(string uid, string cid) {
            return ContactsDB.Where(c => (c.UserId == uid && c.Id == cid)).SingleOrDefault(); 
        }

        public async void AddUser(User u) {
            //usersDB.Add(u);
            UsersDB.Add(u);
//            await SaveChangesAsync();
            
        }
        
        public bool AddContact(string u1ID, Contact other) {
            if (u1ID == other.Id)
                return false;
            var u1 = GetUserByID(u1ID);
            if (u1 == null)
                return false;
            // Already a contact
            var find = GetContact(u1ID, other.Id);
            if (find != null)
                return false;
            //u1.Contacts.Add(other);
            //chatDB.Add(new Chat() {
            //    Id = chatDB.Count,
            //    User1 = u1.Id,
            //    User2 = other.Id
            //});
            ContactsDB.Add(other);
            SaveChanges();

            return true;
        }

        public IList<Contact> GetContactsOfUser(string uid) {
            return ContactsDB.Where(c => c.UserId == uid).ToList();
        }

        public Chat getChat(string u1Id, string u2Id) {
            Chat chat = chatDB.FirstOrDefault(
                        c => (c.User1 == u1Id && c.User2 == u2Id)
                                || c.User1 == u2Id && c.User2 == u1Id);
            return chat;
        }

        //public Contact GetContact(string activeUserID,string contactId) {
        //    User currUser = GetUserByID(activeUserID);
        //    Contact c = currUser.Contacts.FirstOrDefault((c) => c.Id == contactId);
        //    return c;
        //}

        public bool RemoveContact(string activeUserID, string contactId) {
            var contact = GetContact(activeUserID, contactId);
            if (contact == null)
                return false;
            //return GetUserByID(activeUserID).Contacts.Remove(contact);
            ContactsDB.Remove(contact);
            SaveChanges();
            return true;
        }

        public bool RemoveMessage(string activeUserID, string contactId, int messageId) {
            User curr = GetUserByID(activeUserID);
            IList<Message> messages = GetMessagesWithContact(activeUserID, contactId);
            Message target = messages.FirstOrDefault(m => m.Id == messageId);
            if (target == null)
                return false;
            Message.Remove(target);
            SaveChanges();
            return true;
            //Chat c = getChat(curr.Id, contactId);
            //if (c == null)
            //    return false;
            //Message msg = c.Messages.FirstOrDefault((m) => m.Id == messageId);
            //if (msg == null)
            //    return false;
            //c.Messages.Remove(msg);
            //return true; ;
        }

        public User GetUserByID(string id) {
            var res = UsersDB.Where(u => u.Id == id).ToList();
            if (res.Count == 0)
                return null;
            return res[0];
        }

        public Contact GetUserOrContact(string id) {
            User u = GetUserByID(id);
            if (u != null)
                return makeContactFromUser(u);
            else {
                foreach (User user in usersDB) {
                    //foreach (Contact c in user.Contacts) {
                    //    if (c.Id == id)
                    //        return c;
                    //}
                    // TODO
                }
            }
            return null;
        }

        public void UpdateUser(User user) {
            usersDB[usersDB.FindIndex((u) => u.Id == user.Id)] = user;
        }

        public IList<Message> GetMessagesWithContact(string activeUserID, string contactID) {
            User current = GetUserByID(activeUserID);
            IList<Message> messages = Message.Where(m => 
                        (m.Sender == activeUserID && m.Recipient == contactID) 
                     || (m.Sender == contactID && m.Recipient == activeUserID))
                .ToList();
            return messages;
            //Contact other = current.Contacts.FirstOrDefault(
            //    contact => contact.Id == contactID);
            //if (other == null)
            //    return null;
            //Chat chat = getChat(current.Id, other.Id);
            //if (chat == null)
            //    return null;
            //foreach (Message msg in chat.Messages)
            //    msg.Sent = (msg.Sender == current.Name || msg.Sender == current.Id);
            //return chat.Messages;
        }

        public void UpdateLastInfo(string u1ID, string u2ID) {
            Chat chat = getChat(u1ID, u2ID);
            User u1 = GetUserByID(u1ID);
            User u2 = GetUserByID(u2ID);
            var last = chat == null || chat.Messages.Count() == 0 ? null : chat.Messages[chat.Messages.Count() - 1];
            if (u1 != null)
                u1.Last = last.Content;
            if (u2 != null)
                u2.Last = last.Content;
        }

        public Message GetLastMessageWithContact(string activeUserID, string contactId) {
            User curr = GetUserByID(activeUserID);
            Chat chat = getChat(curr.Id, contactId);
            if (chat == null || chat.Messages.Count == 0)
                return null;
            return chat.Messages[chat.Messages.Count - 1];
        }

        public bool SetMessage(string activeUserID, string contactId, int msgId, string content) {
            IList<Message> msgs = GetMessagesWithContact(activeUserID, contactId);
            Message target = msgs.FirstOrDefault(m => m.Id == msgId);
            if (target == null)
                return false;
            target.Content = content;
            SaveChanges();           
            //Chat chat = getChat(GetUserByID(activeUserID).Id, contactId);
            //if (chat == null)
            //    return false;
            //Message msg = chat.Messages.FirstOrDefault(m => m.Id == msgId);
            //if (msg == null)
            //    return false;
            //msg.Content = content;
            return true;
        }

        public bool AddMessage(Message msg) {
            Message.Add(msg);
            SaveChanges();
            return true;
            //Chat chat = getChat(msg.Sender, msg.Recipient);
            //if (chat != null) {
            //    msg.Id = chat.Messages.Count();
            //    Contact sender = GetUserOrContact(msg.Sender);
            //    Contact recipient = GetUserOrContact(msg.Recipient);
            //    if (sender != null && recipient != null) {
            //        msg.Sender = sender.Name;
            //        msg.Recipient = recipient.Name;
            //        chat.Messages.Add(msg);
            //        // saveChanges();
            //        return true;
            //    }
            //}
            //return false;
        }

        public bool SetContact(string activeUserID, string id, NameAndServer contact) {
            IList<Contact> contacts = GetContactsOfUser(activeUserID);
            Contact target = contacts.FirstOrDefault(c => c.Id == id);
            if (target == null)
                return false;
            // Update
            target.Name = contact.Name;
            target.Server = contact.Server;
            SaveChanges();
            return true;
        }

        public serverContext (DbContextOptions<serverContext> options)
            : base(options)
        {
            //usersDB[1].Contacts = new List<User>() { usersDB[0], usersDB[2] };
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            //modelBuilder.Entity<User>().HasKey(x => x.Id);
            //modelBuilder.Entity<User>()
            //    .HasMany(c => c.Contacts)
            //    .WithOne(u => u.User)
            //    .HasForeignKey(p => p.UserId);

            //modelBuilder.Entity<Contact>().HasKey(x => x.Id);
            //modelBuilder.Entity<Contact>()
            //    .HasOne(c => c.User)
            //    .WithMany(u => u.Contacts)
            //    .HasForeignKey(p => p.UserId);


            //modelBuilder.Entity<User>()
            //    .Navigation(b => b.Contacts)
            //    .UsePropertyAccessMode(PropertyAccessMode.Property);

            // Add the shadow property to the model
            //modelBuilder.Entity<Contact>()
            //    .Property<string>("UserId");

            // Use the shadow property as a foreign key
            //modelBuilder.Entity<Contact>()
            //    .HasOne(p => p.User)
            //    .WithMany(b => b.Contacts)
            //    .HasForeignKey("UserId");


        }

        public DbSet<server.Models.Rating> Rating { get; set; }

        public DbSet<server.Models.Message> Message { get; set; }

        public DbSet<server.Models.User> UsersDB { get; set; }

        public DbSet<server.Models.Chat> Chat { get; set; }
        public DbSet<server.Models.Contact> ContactsDB { get; set; }
    }
}
