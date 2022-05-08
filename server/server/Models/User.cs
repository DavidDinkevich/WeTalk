using System.ComponentModel.DataAnnotations;


namespace server.Models {
    public class User {
        [Key]
        public int Id { get; set; }

        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Password { get; set; }
        
        public ICollection<User> Contacts { get; set; }
        public string Server { get; set; }
        public int LastMessage { get; set; }
        public string LastDate { get; set; }

        public User() {
            Contacts = new List<User>();
        }

    }
}
