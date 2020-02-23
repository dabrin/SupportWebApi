using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace webApi_Support_Proyect.Models
{
    public class CommentModel
    {

        public int Id { set; get; }
        public int issueByReportNumber { set; get; }
        public string description { set; get; }
        public DateTime commentTime { set; get; }

        public CommentModel() { }

        
    }
}