using System.ComponentModel.DataAnnotations;

namespace server.Models {
    public class ParamContact {
        [Key]
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; }
        public string Server { get; set; }
    }
}
