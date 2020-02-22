using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace webApi_Support_Proyect.Models
{
    public class IssueModel
    {
        
        public IssueModel() { }

        public IssueModel(int report_Number, int id_Supporter, string classification, string status, DateTime report_Time, string resolution_Comment)
        {
            Report_Number = report_Number;
            Id_Supporter = id_Supporter;
            Classification = classification;
            Status = status;
            Report_Time = report_Time;
            Resolution_Comment = resolution_Comment;
        }

        public int Report_Number { set; get; }
        public int Id_Supporter { set; get; }
        public string Classification { set; get; }
        public string Status { set; get; }
        public DateTime Report_Time{ set; get; }
        public string Resolution_Comment { set; get; }
    }
}