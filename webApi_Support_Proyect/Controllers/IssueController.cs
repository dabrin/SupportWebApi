

using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using webApi_Support_Proyect.Models;
using webApi_Support_Proyect.Models.apiClientApp;

namespace webApi_Support_Proyect.Controllers
{
    public class IssueController : ApiController
    {


        public IHttpActionResult Post(IssueModel issue)
        {

            using (var ctx = new Entities())
            {
                ctx.Issue.Add(new Issue()
                {
                    Report_Number = issue.Report_Number,
                    Id_Supporter = null,
                    Classification = "Media",
                    Status = "Ingresado",
                    Report_Time = DateTime.Now,
                    Resolution_Comment = "Nuevo caso"
                });
                ctx.SaveChanges();
                return Ok();
            }
        }

        public IHttpActionResult GetAll()
        {

            IList<IssueModel> issues = null;
            using (var context = new Entities())
            {
                issues = context.Issue
                    .Select(issueItem => new IssueModel()
                    {
                        Report_Number = issueItem.Report_Number,
                        //Id_Supporter = (issueItem.Id_Supporter).Value,
                        Classification = issueItem.Classification,
                        Status = issueItem.Status,
                        Report_Time = issueItem.Report_Time,
                        Resolution_Comment = issueItem.Resolution_Comment,
                    }).OrderByDescending(x=>x.Report_Time).ToList<IssueModel>();
            }
            if (issues.Count == 0)
            {
                return NotFound();
            }
            return Json(issues);

        }


        public IHttpActionResult GetById(int id)
        {
            IssueModel issue = null;
            using (var context = new Entities())
            {

                issue = context.Issue.Where(issueItem => issueItem.Report_Number == id).
                    Select(issueItem => new IssueModel()
                    {
                        Report_Number = issueItem.Report_Number,
                        //Id_Supporter = issueItem.Id_Supporter.Value,
                        Classification = issueItem.Classification,
                        Status = issueItem.Status,
                        Report_Time = issueItem.Report_Time,
                        Resolution_Comment = issueItem.Resolution_Comment


                    }).FirstOrDefault<IssueModel>();
            }
            if (issue == null)
            {
                return NotFound();
            }
            else
                return Json(issue);

        }

        public IHttpActionResult Delete(int id)
        {
            if (id <= 0)
                return BadRequest("Not a valid Issue id");

            using (var ctx = new Entities())
            {
                var issue = ctx.Issue
                    .Where(s => s.Report_Number == id)
                    .FirstOrDefault();

                ctx.Entry(issue).State = System.Data.Entity.EntityState.Deleted;
                ctx.SaveChanges();
            }

            return Ok();
        }


        public  IHttpActionResult Put(Issue issue)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (var ctx = new Entities())
            {
                var existingIssue = ctx.Issue.Where(s => s.Report_Number == issue.Report_Number)
                                                        .FirstOrDefault<Issue>();

                if (existingIssue != null)
                {
                    //existingIssue.Classification = issue.Classification;
                    //existingIssue.Status = issue.Status;
                    existingIssue.Resolution_Comment = issue.Resolution_Comment;
                    //existingIssue.Report_Time = issue.Report_Time;
                    ctx.SaveChanges();
                    
                }
                else
                {
                    return NotFound();
                }
            }
            return Ok();
        }

        [HttpGet]
        [Route("api/Issue/findIssueBySuppId/{id}")]
        public IHttpActionResult GetAllBySupportId(int id) {
            IList<IssueModel> issues = null;
            //IssueModel issue = null;
            using (var context = new Entities())
            {

                issues = context.Issue.Where(issueItem => issueItem.Id_Supporter == id).
                    Select(issueItem => new IssueModel()
                    {
                        Report_Number = issueItem.Report_Number,
                        Id_Supporter = issueItem.Id_Supporter.Value,
                        Classification = issueItem.Classification,
                        Status = issueItem.Status,
                        Report_Time = issueItem.Report_Time,
                        Resolution_Comment = issueItem.Resolution_Comment


                    }).OrderByDescending(x => x.Report_Time).ToList<IssueModel>();
            }
            if (issues.Count == 0)
            {
                return NotFound();
            }
            else
                return Json(issues);

        }

           
        [HttpGet]
        [Route("api/Issue/findUserClientById/{id}")]
        public async Task<IHttpActionResult> GetUserClientByIdAsync(int id)
        {
            string url = "http://localhost:8080/api/user/" + id;
            var client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync(url);
            response.EnsureSuccessStatusCode();
            return Json(response.Content.ReadAsAsync<UserClientModel>().Result);
        }


        [HttpGet]
        [Route("api/Issue/findIssueClient/{reportNumber}")]
        public async Task<IHttpActionResult> GetIssueClientByReportNumberAsync(int reportNumber)
        {
            string url = "http://localhost:8080/api/issue/" + reportNumber;
            var client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync(url);
            response.EnsureSuccessStatusCode();
            return Json(response.Content.ReadAsAsync<IssueClientModel>().Result);
        }

        [HttpGet]
        [Route("api/Issue/findCommentClientById/{id}")]
        public IHttpActionResult GetCommentClientById(int id)
        {
            string url = "http://localhost:8080/api/comment/findAllByIssueReportNumber/";
            var httpClient = new HttpClient();
            var json = new System.Net.WebClient().DownloadString(url + id);
            dynamic m = JsonConvert.DeserializeObject(json);
            return Json(m);
        }

        [HttpPost]
        [Route("api/Issue/CommentClient")]
        public async Task<IHttpActionResult> PostCommentClientAsync(CommentClientModel comment)
        {
            comment.commentTime = DateTime.Now;
            string url = "http://localhost:8080/api/comment/";
            var client = new HttpClient();
            HttpResponseMessage response = await client.PostAsJsonAsync(url, comment);
            response.EnsureSuccessStatusCode();
            return Json(response.Content.ReadAsAsync<CommentClientModel>().Result);
        }

        [HttpPut]
        [Route("api/Issue/UpdateStatus")]
        public async Task<IHttpActionResult> PutStatusAsync(UpdateIntStringClientModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (var ctx = new Entities())
            {
                var existingIssue = ctx.Issue.Where(s => s.Report_Number == model.reportNumber)
                                                        .FirstOrDefault<Issue>();
                if (existingIssue != null)
                {
                    string url = "http://localhost:8080/api/issue/updateStatus";
                    var client = new HttpClient();
                    HttpResponseMessage response = await client.PutAsJsonAsync(url, model);
                    response.EnsureSuccessStatusCode();
                    existingIssue.Status = model.val;
                    ctx.SaveChanges();
                }
                else
                {
                    return NotFound();
                }
            }
            return Ok();
        }

        [HttpPut]
        [Route("api/Issue/UpdateSupportAssigned")]
        public async Task<IHttpActionResult> PutSupportAssignedsAsync(UpdateSupportAssignedModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (var ctx = new Entities())
            {
                var existingIssue = ctx.Issue.Where(s => s.Report_Number == model.Report_Number)
                                                        .FirstOrDefault<Issue>();
                if (existingIssue != null)
                {
                    UpdateIntStringClientModel data = new UpdateIntStringClientModel();

                    var supporter = ctx.Supporter.Where(s => s.Id == model.Id_Supporter)
                        .FirstOrDefault<Supporter>();

                    if (supporter != null)
                    {
                        data.reportNumber = model.Report_Number;
                        data.val = supporter.Name + " " + supporter.First_Surname + " " + supporter.Second_Surname;
                        string url = "http://localhost:8080/api/issue/updateSupporterAssigned";
                        var client = new HttpClient();
                        HttpResponseMessage response = await client.PutAsJsonAsync(url, data);
                        response.EnsureSuccessStatusCode();
                    }
                    else return NotFound();

                    existingIssue.Id_Supporter = model.Id_Supporter;
                    ctx.SaveChanges();
                }
                else
                {
                    return NotFound();
                }
            }
            return Ok();
        }

    }
}
