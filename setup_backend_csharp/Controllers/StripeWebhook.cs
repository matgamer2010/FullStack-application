using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Stripe;
using System.Text;
using System.Text.Json;

[ApiController]
[Route("[controller]")]
public class StripeWebhookController : ControllerBase
{
    private readonly ILogger<StripeWebhookController> _logger;

    public StripeWebhookController(ILogger<StripeWebhookController> logger)
    {
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> Post()
    {
        var endpointSecret = Environment.GetEnvironmentVariable("WEBHOOK_KEY");
        var json = await new StreamReader(Request.Body).ReadToEndAsync();

        Event stripeEvent;
        try
        {
            stripeEvent = EventUtility.ConstructEvent(
                json,
                Request.Headers["Stripe-Signature"],
                endpointSecret
            );
        }
        catch (Exception e)
        {
            _logger.LogError($"Erro ao validar webhook: {e.Message}");
            return BadRequest();
        }

        if (stripeEvent.Type == "checkout.session.completed")
        {
            var session = stripeEvent.Data.Object as Stripe.Checkout.Session;

            if (session == null || session.Metadata == null)
            {
                _logger.LogError("Sessão ou metadata ausente.");
                return BadRequest();
            }

            var product = session.Metadata["product"];
            var price = session.Metadata["price"];
            var quantity = session.Metadata["quantity"];
            var user = session.Metadata["user"];
            var amount = session.Metadata["amount"];
            var image = session.Metadata["image_adress"];
            var data = session.Metadata["data"];
            var option = session.Metadata["option"];

            var body = new Dictionary<string, string>
            {
                { "product_name", product },
                { "image_adress", image },
                { "product_value", price },
                { "amount", amount },
                { "payment_date", data },
                { "username", user },
                { "option", option }
            };

            var content = new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json");

            using var httpClient = new HttpClient();
            var response = await httpClient.PostAsync("http://127.0.0.1:8000/forms/process_payments/", content);

            if (!response.IsSuccessStatusCode)
            {
                _logger.LogError("Erro ao enviar dados ao Django: {StatusCode}", response.StatusCode);
                return StatusCode((int)response.StatusCode);
            }

            _logger.LogInformation("Pagamento processado com sucesso.");
        }

        return Ok();
    }
}
