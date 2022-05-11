using System.ComponentModel.DataAnnotations;


namespace server.Models {
    public class User {
        [Key]
        public string Id { get; set; }

        public string Name { get; set; }
        public string Password { get; set; }
        
        public IList<User> Contacts { get; set; }
        public string Server { get; set; }
        public Message LastMessage { get; set; }
        public string LastDate { get; set; }
        public string Image { get; set; }
        public User() {
            Image = "";
            Contacts = new List<User>();
        }

    }
}
