using System.ComponentModel.DataAnnotations;

namespace server.Models {
    public class MsgJson {
        public string From { get; set; }
        public string To { get; set; }
        public string Content { get; set; }        
    }
}
