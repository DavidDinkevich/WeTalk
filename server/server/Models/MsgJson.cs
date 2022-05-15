using System.ComponentModel.DataAnnotations;

namespace server.Models {
    public class MsgJson {
        public string From { get; set; } = string.Empty;
        public string To { get; set; } = string.Empty;
        [Required]
        public string Content { get; set; }        
    }
}
