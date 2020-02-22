using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Net;
using Newtonsoft.Json;
using System.Web.Mvc;
using webApi_Support_Proyect.Models;

namespace webApi_Support_Proyect.Controllers
{
    public class IssueUserContactController : Controller
    {
        // GET: IssueUserContactModel
        public ActionResult Index()
        {
            return View();
        }

        //En teoría así se consume un Api Rest desde aquí
        public IHttpActionResult GetById(int id)
        {

            string url= "http://localhost:8080/api/issue/";
            var json = new WebClient().DownloadString(url);
            dynamic m = JsonConvert.DeserializeObject(json);

            IssueModel issue = null;

            foreach (var i in m) {
                issue.Report_Number = i.Report_Number;

            }
            


            return Json(m);

        }
    }
}