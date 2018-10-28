using System.ComponentModel.DataAnnotations;

namespace Vega.Controllers.Resources
{
    public class ContactResource{
        public string Name { get; set; }
        [Required]
        [StringLength(255)]
        public string Phone { get; set; }
        [StringLength(255)]
        public string Email { get; set; }
    }
}