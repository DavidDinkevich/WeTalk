using System.ComponentModel.DataAnnotations;

namespace server.Models {
    public class Chat {
        [Key]
        public int Id { get; set; }
        public string User1 { get; set; }
        public string User2 { get; set; }
        public IList<Message> Messages { get; set; }

        public Chat() {
            Messages = new List<Message>();
        }
    }
}
