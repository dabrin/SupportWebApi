using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace webApi_Support_Proyect.Models
{
    public class SupporterModel
    {
        public SupporterModel(int id_Supporter, int id_Supervisor, string pass, string name, string first_SurName, string second_Surname, string email)
        {
            Id_Supporter = id_Supporter;
            Id_Supervisor = id_Supervisor;
            Pass = pass;
            Name = name;
            First_SurName = first_SurName;
            Second_Surname = second_Surname;
            Email = email;
        }

        public SupporterModel() { }


        public int Id_Supporter { set; get; }
        public int Id_Supervisor { set; get; }
        public string Pass { set; get; }
        public string Name { set; get; }
        public string First_SurName { set; get; }
        public string Second_Surname { set; get; }
        public string Email { set; get; }
    }
}