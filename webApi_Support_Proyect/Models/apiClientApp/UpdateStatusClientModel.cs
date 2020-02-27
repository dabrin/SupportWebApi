using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace webApi_Support_Proyect.Models.apiClientApp
{
    public class UpdateStatusClientModel
    {
        public int reportNumber { get; set; }
        public string status { get; set; }
    }
}