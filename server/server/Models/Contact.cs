using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace server.Models {
    public class Contact {
        [Key]
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; }
        public string Server { get; set; }
        [IgnoreDataMember] // TODO: CHECK IF THIS DOESN'T RUIN FUNCTIONS
        public virtual string UserId { get; set; }
        [ForeignKey("UserId")]
        [IgnoreDataMember] // TODO: CHECK IF THIS DOESN'T RUIN FUNCTIONS
        public virtual User User { get; set; }

    }
}
