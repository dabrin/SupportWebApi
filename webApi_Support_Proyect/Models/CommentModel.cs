using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace webApi_Support_Proyect.Models
{
    public class CommentModel
    {

        public int Id { set; get; }
        public int Report_Number { set; get; }
        public string Description { set; get; }
        public DateTime Comment_Time { set; get; }

        public CommentModel() { }

        public CommentModel(int id, int report_Number, string description, DateTime comment_Time)
        {
            Id = id;
            Report_Number = report_Number;
            Description = description;
            Comment_Time = comment_Time;
        }
    }
}