using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using webApi_Support_Proyect.Models;

namespace webApi_Support_Proyect.Controllers
{
    public class LoginController : ApiController
    {
        public IHttpActionResult Post(LoginData loginData)
        {
            SessionData sessionData = null;
            SupervisorModel superModel = null;
            using (var context = new Entities())
            {
                superModel = context.Supervisor.Where(superItem => superItem.Email == loginData.Email).
                    Select(superItem => new SupervisorModel()
                    {
                        Id_Supervisor = superItem.Id,
                        Pass = superItem.Pass
                    }).FirstOrDefault<SupervisorModel>();
            }
            if (superModel != null && superModel.Pass == loginData.Pass) //corregir con jwt
            {
                sessionData = new SessionData();
                sessionData.IdUser = superModel.Id_Supervisor;
                sessionData.Role = "USU";
                sessionData.Token = "";
                return Json(sessionData);
            }
            SupporterModel suppModel = null;
            using (var context = new Entities())
            {
                suppModel = context.Supporter.Where(suppItem => suppItem.Email == loginData.Email).
                    Select(suppItem => new SupporterModel()
                    {
                        Id_Supporter = suppItem.Id,
                        Pass = suppItem.Pass
                    }).FirstOrDefault<SupporterModel>();
            }
            if (suppModel != null && suppModel.Pass == loginData.Pass) //corregir con jwt
            {
                sessionData = new SessionData();
                sessionData.IdUser = suppModel.Id_Supporter;
                sessionData.Role = "USO";
                sessionData.Token = "";
                return Json(sessionData);
            }
            var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
            {
                Content = new StringContent(string.Format("No se encuentra en usuario")),
                ReasonPhrase = "No se encuentra en usuario"
            };
            return ResponseMessage(resp);
        }
    }

    public class LoginData {
        public string Email { set; get; }
        public string Pass { set; get; }
    }

    public class SessionData
    {
        public int IdUser { set; get; }
        public string Token { set; get; }
        public string Role { set; get; }
    }
}
