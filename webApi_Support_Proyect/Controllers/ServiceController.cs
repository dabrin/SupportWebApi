using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using webApi_Support_Proyect.Models;

namespace webApi_Support_Proyect.Controllers
{
    public class ServiceController : ApiController
    {
        public IHttpActionResult Post(ServiceModel service)
        {

            using (var ctx = new Entities())
            {
                ctx.Service.Add(new Service()
                {
                    Id = service.Id_Service,
                    Name = service.Name
                });
                ctx.SaveChanges();
            }
            return Ok();
        }

        public IHttpActionResult GetAll()
        {

            IList<ServiceModel> services = null;
            using (var context = new Entities())
            {
                services = context.Service
                    .Select(serviceItem => new ServiceModel()
                    {
                        Id_Service = serviceItem.Id,
                        Name = serviceItem.Name
                    }).ToList<ServiceModel>();
            }
            if (services.Count == 0)
            {
                return NotFound();
            }
            return Json(services);
            
        }

        

        public IHttpActionResult GetById(int id)
        {

            ServiceModel service = null;
            using (var ctx = new Entities())
            {

                service = ctx.Service.Where(serviceItem => serviceItem.Id == id).
                    Select(serviceItem => new ServiceModel()
                    {
                        Id_Service = serviceItem.Id,
                        Name = serviceItem.Name


                    }).FirstOrDefault<ServiceModel>();
            }
            if (service == null)
            {
                return NotFound();
            }
            else
                return Json(service);

        }


        public IHttpActionResult Delete(int id)
        {
            if (id <= 0)
                return BadRequest("Not a valid Service id");

            using (var ctx = new Entities())
            {
                var service = ctx.Service
                    .Where(s => s.Id == id)
                    .FirstOrDefault();

                ctx.Entry(service).State = System.Data.Entity.EntityState.Deleted;
                ctx.SaveChanges();
            }

            return Ok();
        }

        public IHttpActionResult Put(Service service)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (var ctx = new Entities())
            {
                var existingService = ctx.Service.Where(s => s.Id == service.Id)
                                                        .FirstOrDefault<Service>();

                if (existingService != null)
                {
                    existingService.Name = service.Name;
                    
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
