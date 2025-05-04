using System.ComponentModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Net.Http;
using System.Threading.Tasks;

// Here, we request the Django URL for the products

namespace setup_backend_csharp.Controllers;

[ApiController]
[Route("[controller]")]
public class ClothesController : ControllerBase
{
    private readonly ILogger _logger;
    private readonly IHttpClientFactory _httpClientFactory;

    public ClothesController(IHttpClientFactory httpClientFactory, ILogger<ClothesController> logger)
    {
        _logger = logger;
        _httpClientFactory = httpClientFactory;
    }

    [HttpGet]
    public async Task<IActionResult> GetProducts()
    {
        try
        {
            var client = _httpClientFactory.CreateClient("ClothesClient");
            var request = await client.GetAsync("http://localhost:8000/API/Crud/");
            if (request.IsSuccessStatusCode)
            {
                var response = await request.Content.ReadAsStringAsync();
                return Ok(response);
            }
            else
            {
                return StatusCode((int)request.StatusCode, "Error fetching data");
            }
            // Retorno do JSON
            
        }
        catch (Exception e)
        {
            _logger.LogWarning($"We cannot request the API, se the exception: {e}");
            return StatusCode(500, "Internal server error");
        }
    }
}
