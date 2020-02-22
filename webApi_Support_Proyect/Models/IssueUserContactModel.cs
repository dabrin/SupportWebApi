using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace webApi_Support_Proyect.Models
{
    public class IssueUserContactModel
    {

                public string Report_Number { set; get; }
                public string Full_Name { set; get; }
                public string Email { set; get; }
                public string Address { set; get; }
                public string Second_Contact { set; get; }
                public string State { set; get; }
                public int Contact_Phone { set; get; }
                public int Contact_Email { set; get; }
                public string Comments { set; get; }//Creo que son listas
                public string Note { set; get; }//Creo que son listas
        
   
     
    }
}