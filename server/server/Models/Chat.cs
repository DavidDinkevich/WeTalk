using System.ComponentModel.DataAnnotations;

namespace server.Models {
    public class Chat {
        [Key]
        public int Id { get; set; }
        public int User1 { get; set; }
        public int User2 { get; set; }
        public ICollection<Message> Messages { get; set; }

        public Chat() {
            Messages = new List<Message>();
        }
    }
}
