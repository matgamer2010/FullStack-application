using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using ProductModel.Models;
using Stripe.Checkout;

namespace setup_backend_csharp.Controllers;

[ApiController]
[Route("[controller]")]
public class PaymentsController : ControllerBase
{
    private readonly ILogger<PaymentsController> _logger;

    public PaymentsController(ILogger<PaymentsController> logger)
    {
        _logger = logger;
    }

    [HttpPost("create-checkout-session")]
    public ActionResult CreateCheckoutSession([FromBody] Product product)
    {
        Console.WriteLine(JsonSerializer.Serialize(product)); // imprime corretamente o objeto

        try
        {
            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString();

            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string> { "card" },
                LineItems = new List<SessionLineItemOptions>
                {
                    new SessionLineItemOptions
                    {
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            Currency = product.Currency,
                            ProductData = new SessionLineItemPriceDataProductDataOptions
                            {
                                Name = product.Name,
                                Images = new List<string> { product.ImageAdress },
                            },
                            UnitAmount = (long)(product.Amount * 100),
                        },
                        Quantity = product.Quantity,
                    },
                },
                Mode = "payment",
                SuccessUrl = "https://mm-vendedores.vercel.app/",
                CancelUrl = "https://mm-vendedores.vercel.app/?message=PagamentoCancelado",
                Metadata = new Dictionary<string, string>
                {
                    { "user", Convert.ToString(product.User) },
                    { "product", Convert.ToString(product.Name) },
                    { "price", Convert.ToString(product.Amount) },
                    { "amount", Convert.ToString(product.Quantity) },
                    { "image_adress", Convert.ToString(product.ImageAdress) },
                    { "data", timestamp },
                }
            };

            var service = new SessionService();
            Session session = service.Create(options);

            return Ok(new { id = session.Id });
        }
        catch (Exception ex)
        {
            _logger.LogWarning($"There was an error with the Payment request. See the reason: {ex}");
            return StatusCode(500, new { err = "An error occurred while creating the Checkout page" });
        }
    }
}
