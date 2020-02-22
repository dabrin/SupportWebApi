using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace webApi_Support_Proyect.Controllers
{
    public class UserController : ApiController
    {

        public IHttpActionResult GetById(int id)
        {

            string url = "http://localhost:8080/api/user/";
            var httpClient = new HttpClient();
            var json = new WebClient().DownloadString(url + id);
            dynamic m = JsonConvert.DeserializeObject(json);


            return Json(m);

        }
    }
}
