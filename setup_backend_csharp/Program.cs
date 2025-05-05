using DotNetEnv;
using Stripe;
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";


var builder = WebApplication.CreateBuilder(args);

Env.Load("secrets.env");
Stripe.StripeConfiguration.ApiKey = Environment.GetEnvironmentVariable("StripeSecretKey");


// Add services to the container.
builder.Services.AddControllers();  
builder.Services.AddRazorPages();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddHttpClient("ClothesClient").ConfigurePrimaryHttpMessageHandler(() =>
    new HttpClientHandler
    {
        AllowAutoRedirect = true,
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        policy =>
        {
            policy.WithOrigins(
                "http://localhost:3000", 
                "https://mm-vendedores-mateus-projects-7cfb9e28.vercel.app/", 
                "https://mm-vendedores.vercel.app/"
                )
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    // app.UseHsts();
}

// app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseCors("AllowSpecificOrigin");

app.UseAuthorization();

app.MapControllers();
app.MapRazorPages();

app.Run();
