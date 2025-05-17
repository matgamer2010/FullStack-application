using System.ComponentModel.DataAnnotations;

namespace ProductModel.Models
{
    public class Product
    {
        [Required(ErrorMessage = "The Field: Name is required")]
        public string Name { get; set; } = "ERROR WITH PAYMENT";
        [Required]
        public decimal Amount { get; set; }
        [Required]
        public string Currency { get; set; } = "brl";
        [Required]
        public string ImageAdress { get; set; } = "";
        [Required]
        public int Quantity { get; set; } = 1;
        [Required]  
        public string User { get; set; } = "User not defined";
    }
}

