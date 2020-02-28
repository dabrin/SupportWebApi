using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using webApi_Support_Proyect.Models;

namespace webApi_Support_Proyect.Controllers
{
    public class SupporterController : ApiController
    {


        public IHttpActionResult Post(SupporterModel supp)
        {

            using (var ctx = new Entities())
            {
                var existSupport = ctx.Supporter.Where(s => s.Email == supp.Email).FirstOrDefault<Supporter>();
                if (existSupport != null)
                {
                    var resp = new HttpResponseMessage(HttpStatusCode.Conflict)
                    {
                        Content = new StringContent(string.Format("El correo ya existe")),
                        ReasonPhrase = "El correo ya existe"
                    };
                    return ResponseMessage(resp);
                }

                ctx.Supporter.Add(new Supporter()
                {
                    Id_Supervisor = supp.Id_Supervisor,
                    Pass = supp.Pass,
                    Name = supp.Name,
                    First_Surname = supp.First_SurName,
                    Second_Surname = supp.Second_Surname,
                    Email = supp.Email

                });
                ctx.SaveChanges();
            }
            return Ok();
        }

        public IHttpActionResult GetAll()
        {

            IList<SupporterModel> issues = null;
            using (var context = new Entities())
            {
                issues = context.Supporter
                    .Select(suppItem => new SupporterModel()
                    {
                        Id_Supervisor= suppItem.Id_Supervisor,
                        
                        Id_Supporter = suppItem.Id,

                        Name = suppItem.Name,
                        First_SurName = suppItem.First_Surname,
                        Second_Surname = suppItem.Second_Surname,
                        Email = suppItem.Email,
                    }).ToList<SupporterModel>();
            }
            if (issues.Count == 0)
            {
                return NotFound();
            }
            return Json(issues);

        }


        public IHttpActionResult GetById(int id)
        {

            SupporterModel suppModel = null;
            using (var context = new Entities())
            {

                suppModel = context.Supporter.Where(suppItem => suppItem.Id == id).
                    Select(suppItem => new SupporterModel()
                    {
                        Id_Supporter = suppItem.Id,
                        Id_Supervisor = suppItem.Id_Supervisor,
                        Name = suppItem.Name,
                        First_SurName = suppItem.First_Surname,
                        Second_Surname= suppItem.Second_Surname,
                        Email= suppItem.Email

                    }).FirstOrDefault<SupporterModel>();
            }
            if (suppModel == null)
            {
                return NotFound();
            }
            else
                return Json(suppModel);

        }


        public IHttpActionResult Delete(int id)
        {
            if (id <= 0)
                return BadRequest("Not a valid Supporter id");

            using (var ctx = new Entities())
            {
                var supporter = ctx.Supporter
                    .Where(s => s.Id == id)
                    .FirstOrDefault();

                ctx.Entry(supporter).State = System.Data.Entity.EntityState.Deleted;
                ctx.SaveChanges();
            }

            return Ok();
        }

        public IHttpActionResult Put(Supporter supporter)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (var ctx = new Entities())
            {
                var existSupporter = ctx.Supporter.Where(s => s.Id == supporter.Id)
                                                        .FirstOrDefault<Supporter>();

                if (existSupporter != null)
                {
                    existSupporter.Name = supporter.Name;
                    existSupporter.First_Surname = supporter.First_Surname;
                    existSupporter.Second_Surname = supporter.Second_Surname;
                    existSupporter.Email = supporter.Email;

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
