using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using server.Data;
using Microsoft.AspNetCore.Session;
using server.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<serverContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("serverContext") ?? throw new InvalidOperationException("Connection string 'serverContext' not found.")));

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();

builder.Services.AddDistributedMemoryCache();

builder.Services.AddSession(options => {
    options.IOTimeout = TimeSpan.FromMinutes(2);
});

builder.Services.Configure<CookiePolicyOptions>(options => {
    options.CheckConsentNeeded = context => true;
    options.MinimumSameSitePolicy = SameSiteMode.None;
});

builder.Services.AddCors(options => {
    options.AddPolicy("Allow All",
        builder => {
            builder
//                .SetIsOriginAllowed(origin=> true)
                .WithOrigins("http://localhost:3000")
                .AllowAnyMethod()
                .AllowCredentials()
                .AllowAnyHeader();
        });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}



// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment()) {
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}



app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseCors("Allow All");

//app.UseSession();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Users}/{action=GetContacts}/{id?}");

app.UseWebSockets();
//app.MapHub<MessageHub>("messageHub");

app.UseEndpoints(endpoints => {
    endpoints.MapHub<MessageHub>("Hubs/messageHub");
});

app.Run();
