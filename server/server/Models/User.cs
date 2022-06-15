using System.ComponentModel.DataAnnotations;


namespace server.Models {
    public class User {
        [Key]

        public string Id { get; set; }
        public string Name { get; set; }

        public string Password { get; set; }
        
        //public List<Contact> Contacts { get; set; }
        public string Server { get; set; } = "";
        public string Last { get; set; } = "";
        public string LastDate { get; set; } = "";
        public string Image { get; set; }
        public User() {
            Image = "";
            //Contacts = new List<Contact>();
        }

    }
}
