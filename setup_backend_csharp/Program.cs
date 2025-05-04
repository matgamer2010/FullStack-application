var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
using DotNetEnv;
using Stripe;


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
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins("https://mm-vendedores.vercel.app/") // ou sua URL do frontend
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

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();
app.MapRazorPages();

app.MapGet("/hi", () => "Hello!");

app.Run();
