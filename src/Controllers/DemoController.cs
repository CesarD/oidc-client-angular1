using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Api.Controllers
{
    [RoutePrefix("api/Demo")]
    public class DemoController : ApiController
    {
        [Route("{nombre}")]
        [HttpGet]
        public async Task<IHttpActionResult> Get(string nombre)
        {
            return await Task.FromResult(Ok($"Hola {nombre}"));
        }
    }
}
