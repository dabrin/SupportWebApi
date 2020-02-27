using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace webApi_Support_Proyect.Models
{
    public class IssueClientModel
    {
        public string reportNumber { set; get; }
        public string status { set; get; }
        public string supportUserAssigned { set; get; }
        public string contactPhone { set; get; }
        public string contactEmail { set; get; }
        public string userById { get; set; }
    }
}