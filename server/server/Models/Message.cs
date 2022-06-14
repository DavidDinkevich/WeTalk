using System.ComponentModel.DataAnnotations;

namespace server.Models {
    public class Message {
        [Key]
        public int Id { get; set; }
        public string Sender { get; set; }
        public string Recipient { get; set; }
        public string Content { get; set; }
        public string Time { get; set; }
        // Compatibility with Hemi's API
        public string Created { get {
                return Time;
            } }
        public bool Sent { get; set; } = false;

        public Message(string sender, string recipient) {
            Sender = sender;
            Recipient = recipient;
            Content = "";
            Time = "";
        }
        
    }
}
