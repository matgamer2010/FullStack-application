using System.ComponentModel;
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
        Console.WriteLine(product);
        try
        {
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
                            },
                            UnitAmount = (long)(product.Amount * 100),
                        },
                        Quantity = 1,
                    },
                },
                Mode = "payment",
                SuccessUrl = "https://mm-vendedores.vercel.app/",
                CancelUrl = "https://mm-vendedores.vercel.app/?message=PagamentoCancelado",
            };
            var service = new SessionService();
            Session session = service.Create(options);

            return Ok(new { id = session.Id });
        }
        catch (Exception ex)
        {
            _logger.LogWarning($"There was an error with the Payment request. See the reason: {ex}");
            return StatusCode(500, new { err = "An error ocurred while creating the Checkout page" });
        }
        
    }
}
