using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Net;
using Newtonsoft.Json;
using System.Web.Mvc;
using webApi_Support_Proyect.Models;
using System.Net.Http;
using System.Threading.Tasks;

namespace webApi_Support_Proyect.Controllers
{
    public class IssueUserContactController : ApiController
    {
        // GET: IssueUserContactModel
      

        //En teoría así se consume un Api Rest desde aquí
        public IHttpActionResult GetById(int id)
        {
            string url= "http://localhost:8080/api/issue/";
            var httpClient = new HttpClient();
            var json = new WebClient().DownloadString(url+id);
            dynamic m = JsonConvert.DeserializeObject(json);

           return Json(m);

        }
    }
}