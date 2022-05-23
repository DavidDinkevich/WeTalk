using System.ComponentModel.DataAnnotations;

namespace server.Models {
    public class SignupCreds {
        [RegularExpression("[a-zA-Z]*[0-9]+[a-zA-Z]*", ErrorMessage = "Username must be alphanumeric")]

        public string Id { get; set; }
        public string Name { get; set; }
        [DataType(DataType.Password)]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters")]

        public string Password { get; set; }
        public string Server { get; set; }
    }
}
