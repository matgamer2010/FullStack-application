using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

[ApiController]
[Route("[controller]/")]
class StripeWebhookController: ControllerBase
{
    private readonly ILogger<StripeWebhookController> _logger;
    private readonly HttpContext _httpContext;

    public StripeWebhookController(ILogger<StripeWebhookController> logger, HttpContext httpContext)
    {
        _httpContext = httpContext;
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> Post()
    {
        var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
        const endpointSecret string = Environment.GetEnvironmentVariable("WEBHOOK_KEY");
        var stripeEvent = EventUtility.ConstructEvent(
            json,
            Request.Headers["Stripe-Signature"],
            endpointSecret
        );

        if(stripeEvent.Type == Events.CheckoutSessionCompleted)
        {
            var session = stripeEvent.Data.Object as Stripe.Checkout.Session;

            var product = session.MetaData["product"];
            var price = session.MetaData["price"];
            var quantity = session.MetaData["quantity"];
            var user = session.MetaData["user"];
            var amount = session.MetaData["amount"];
            var image = session.MetaData["image_adress"];
            var data = session.MetaData["data"];


            var body = new Dictionary<string, string>
                {
                    { "product_name", product },
                    { "image_adress", image },
                    { "product_value", price },
                    { "amount", amount },
                    { "payment_date", data },
                    { "username", user }
                };

            var content = new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json");

            var response = await httpClient.PostAsync("http://127.0.0.1:8000/forms/process_payments/", content);

            if (!response.IsSuccessStatusCode)
            {
                _logger.LogError("Error processing payment: {StatusCode}", response.StatusCode);
                return StatusCode((int)response.StatusCode);
            }
            else
            {
                _logger.LogInformation("Payment processed successfully");
                return Ok();
            }

    }
}