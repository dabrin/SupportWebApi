using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using webApi_Support_Proyect.Models;

namespace webApi_Support_Proyect.Controllers
{
    public class SupervisorController : ApiController
    {

        public IHttpActionResult Post(SupervisorModel sup)
        {

            using (var ctx = new Entities())
            {
                ctx.Supervisor.Add(new Supervisor()
                {
                    //Id = sup.Id_Supervisor,
                    Pass = sup.Pass,
                    Name = sup.Name,
                    First_Surname = sup.First_surname,
                    Second_Surname = sup.Second_Surname,
                    Email=sup.Email
                });
                ctx.SaveChanges();
            }
            return Ok();
        }

        public IHttpActionResult GetAll()
        {

            IList<SupervisorModel> supports = null;
            using (var context = new Entities())
            {
                supports = context.Supervisor
                    .Select(supItem => new SupervisorModel()
                    {
                        Id_Supervisor = supItem.Id,
                        Name = supItem.Name,
                        First_surname = supItem.First_Surname,
                        Second_Surname = supItem.Second_Surname,
                        Email = supItem.Email,
                    }).ToList<SupervisorModel>();
            }
            if (supports.Count == 0)
            {
                return NotFound();
            }
            return Json(supports);

        }

        public IHttpActionResult GetById(int id)
        {
            SupervisorModel superModel = null;
            using (var context = new Entities())
            {

                superModel = context.Supervisor.Where(superItem => superItem.Id == id).
                    Select(superItem => new SupervisorModel()
                    {
                         Id_Supervisor= superItem.Id,
                        Name = superItem.Name,
                        First_surname = superItem.First_Surname,
                        Second_Surname = superItem.Second_Surname,
                        Email = superItem.Email

                    }).FirstOrDefault<SupervisorModel>();
            }
            if (superModel == null)
            {
                return NotFound();
            }
            else
                return Json(superModel);
        }


        public IHttpActionResult Delete(int id)
        {
            if (id <= 0)
                return BadRequest("Not a valid Supervisor id");

            using (var ctx = new Entities())
            {
                var supervisor = ctx.Supervisor
                    .Where(s => s.Id == id)
                    .FirstOrDefault();

                ctx.Entry(supervisor).State = System.Data.Entity.EntityState.Deleted;
                ctx.SaveChanges();
            }

            return Ok();
        }


        public IHttpActionResult Put(Supervisor supervisor)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (var ctx = new Entities())
            {
                var existingSupervisor = ctx.Supervisor.Where(s => s.Id == supervisor.Id)
                                                        .FirstOrDefault<Supervisor>();

                if (existingSupervisor != null)
                {
                    existingSupervisor.Name = supervisor.Name;
                    existingSupervisor.First_Surname = supervisor.First_Surname;
                    existingSupervisor.Second_Surname = supervisor.Second_Surname;
                    existingSupervisor.Email = supervisor.Email;
                    
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
