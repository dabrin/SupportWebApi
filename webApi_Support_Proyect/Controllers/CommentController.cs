using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using webApi_Support_Proyect.Models;
using System.Web.Script.Serialization;
using System.Threading.Tasks;

namespace webApi_Support_Proyect.Controllers
{
    public class CommentController : ApiController
    {

        public IHttpActionResult GetById(int id)
        {
            string url = "http://localhost:8080/api/comment/findAllByIssueReportNumber/";
            var httpClient = new HttpClient();
            var json = new System.Net.WebClient().DownloadString(url + id);
            dynamic m = JsonConvert.DeserializeObject(json);

            return Json(m);

        }


        public async Task<IHttpActionResult> PostAsync(CommentModel comment) {
            string url = "http://localhost:8080/api/comment/";
            var client = new HttpClient();
            HttpResponseMessage response = await client.PostAsJsonAsync(url, comment);
            response.EnsureSuccessStatusCode();
            return Json(response.Content.ReadAsAsync<CommentModel>().Result);
        }

    }
}