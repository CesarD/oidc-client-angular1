using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;
using IdentityServer3.AccessTokenValidation;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;

[assembly: OwinStartup(typeof(Api.Startup))]
namespace Api
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCors(CorsOptions.AllowAll);

            app.UseIdentityServerBearerTokenAuthentication(new IdentityServerBearerTokenAuthenticationOptions
            {
                Authority = "https://localhost:44355",
                
                ValidationMode = ValidationMode.ValidationEndpoint,
                
                ClientId = "api",
                ClientSecret = "api-secret",
                
                RequiredScopes = new[] { "api" }
            });

            app.UseClaimsTransformation(async principal =>
                                        {
                                            var newUser = new ClaimsPrincipal(principal);
                                            newUser.Identities.First().AddClaims(new []
                                                                                    {
                                                                                        new Claim("customClaim1", "value1"),
                                                                                        new Claim("customClaim2", "value2")
                                                                                    });

                                            return await Task.FromResult(newUser);

                                        });
            
            var httpConfiguration = new HttpConfiguration();
            
            // Web API routes
            httpConfiguration.MapHttpAttributeRoutes();
            // Web API configuration and services
            httpConfiguration.Filters.Add(new AuthorizeAttribute());
            
            app.UseWebApi(httpConfiguration);
        }
    }
}
