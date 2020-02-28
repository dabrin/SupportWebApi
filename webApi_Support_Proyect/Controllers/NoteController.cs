    using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;

using System.Web.Http;
using webApi_Support_Proyect.Models;

namespace webApi_Support_Proyect.Controllers
{
    public class NoteController : ApiController
    {

        public IHttpActionResult Post(NoteModel note)
        {

            using (var ctx = new Entities())
            {
                ctx.Note.Add(new Note()
                {
                    //Id = note.Id_Note,
                    Report_Number_Issue = note.Report_Number,
                    Description = note.Description,
                    Note_Time = DateTime.Now
                });
                ctx.SaveChanges();
            }
            return Ok();
        }


        public IHttpActionResult GetAll()
        {

            IList<NoteModel> notes = null;
            using (var context = new Entities())
            {
                notes = context.Note
                    .Select(noteItem => new NoteModel()
                    {
                        Id_Note = noteItem.Id,
                        Report_Number = noteItem.Report_Number_Issue,
                        Description = noteItem.Description,
                        Note_Time = noteItem.Note_Time

                    }).ToList<NoteModel>();
            }
            if (notes.Count == 0)
            {
                return NotFound();
            }
            return Json(notes);

        }


        public IHttpActionResult GetById(int id)
        {
            IList<NoteModel> notes = null;
            //NoteModel noteModel = null;
            using (var context = new Entities())
            {

                notes = context.Note.Where(noteItem => noteItem.Report_Number_Issue == id).
                    Select(noteItem => new NoteModel()
                    {
                        Id_Note = noteItem.Id,
                        Report_Number = noteItem.Report_Number_Issue,
                        Description = noteItem.Description,
                        Note_Time = noteItem.Note_Time

                    }).ToList<NoteModel>();
            }
            if (notes == null)
            {
                return NotFound();
            }
            else
                return Json(notes);

        }



        public IHttpActionResult Delete(int id)
        {
            if (id <= 0)
                return BadRequest("Not a valid Note id");

            using (var ctx = new Entities())
            {
                var note = ctx.Note
                    .Where(n => n.Id == id)
                    .FirstOrDefault();

                ctx.Entry(note).State = System.Data.Entity.EntityState.Deleted;
                ctx.SaveChanges();
            }

            return Ok();
        }

        public IHttpActionResult Put(Note note)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (var ctx = new Entities())
            {
                var existingNote = ctx.Note.Where(s => s.Id == note.Id)
                                                        .FirstOrDefault<Note>();

                if (existingNote != null)
                {
                    existingNote.Description = note.Description;

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
