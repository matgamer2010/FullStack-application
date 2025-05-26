using Microsoft.AspNetCore.Mvc

namespace mercadopagopix {

    [ApiController]
    [Route("[controller]")]
    class MercadoPagoPix
    {
        public readonly ILogger<MercadoPagoPix> _logger;
        public readonly HttpClient _httpClient;

        public MercadoPagoPix(ILogger<MercadoPagoPix> logger, HttpClient httpClient)
        {
            _logger = logger;
            _httpClient = httpClient;
        }

        [HttpPost("process_pix")]
        public IActionResult PixRoute(HttpContext httpContext)
        {
            var httpClient = _httpClient("mercadoPagoPix");
            
        }
    }
}