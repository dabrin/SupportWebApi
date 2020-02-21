using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace webApi_Support_Proyect.Models
{
    public class NoteModel
    {
        public NoteModel(int id_Note, int report_Number, string description, DateTime note_Time)
        {
            Id_Note = id_Note;
            Report_Number = report_Number;
            Description = description;
            Note_Time = note_Time;
        }
        public NoteModel() { }

        public int Id_Note { set; get; }
        public int Report_Number { set; get; }
        public string Description { set; get; }
        public DateTime Note_Time { set; get; }
    }
}