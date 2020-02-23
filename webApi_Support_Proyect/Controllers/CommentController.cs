using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using webApi_Support_Proyect.Models;

namespace webApi_Support_Proyect.Controllers
{
    public class CommentController : Controller
    {

        public IHttpActionResult GetById(int id)
        {
            string url = "http://localhost:8080/api/issue/";
            var httpClient = new HttpClient();
            var json = new System.Net.WebClient().DownloadString(url + id);
            dynamic m = JsonConvert.DeserializeObject(json);

            return Json(m);

        }

    }
}