using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
// Framework and Data Context (Model) for database
using Microsoft.EntityFrameworkCore;
using MpPong.Data;
using MpPong.PongHandler;

namespace MpPong
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.

            // Database connection string - Currently hard coded as a localhost development
            // UseSqlServer() is where we would define a database connection string.
            // DefaultConnection can be found in appsettings.json for the project
            // By default, it creates an SQL Server LocalDb, which is not intended for production use.
            // It creates the database (databaseName.mdf) locally on the users system at the following path:
            // C:/Users/<user>/(MpPongPlayerDb.mdf)
            services.AddDbContext<MpPongPlayerContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddMvc();
            services.AddWebSocketManager();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IServiceProvider serviceProvider, IHostingEnvironment env, ILoggerFactory loggerFactory, MpPongPlayerContext context)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            //Brandons websocket stuff below
            app.UseWebSockets();

            app.MapWebSocketManager("/ws", serviceProvider.GetService<PongHttpHandler>());

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();
            app.UseFileServer();
            
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            // Adds the context to the configure state
            DbInitializer.Initialize(context);

        }
    }
}
