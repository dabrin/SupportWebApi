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


        public IHttpActionResult Post(CommentModel comment) {
            ///JavaScriptSerializer js = new JavaScriptSerializer();
            
            string url = "http://localhost:8080/api/comment/";
            var httpClient = new HttpClient();
            var m = comment;
            //m = Json(comment);
            var json = new System.Net.WebClient().UploadString(url,  Json(m));

            return Json(json);
        }

    }
}