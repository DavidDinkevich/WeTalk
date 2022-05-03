
using System.ComponentModel.DataAnnotations;

namespace server.Models {
    public class Rating {
        public int Id { get; set; }
        [Required]
        [Range(1, 5, ErrorMessage = "Value must be between 1 and 5")]
        [Display(Name = "Rating")]
        public int RatingsCount { get; set; }
        [Required]
        [Display(Name = "Author")]
        public string Name { get; set; }
        [Required]
        public string Message { get; set; }
        public string Time { get; set; }

    }
}
