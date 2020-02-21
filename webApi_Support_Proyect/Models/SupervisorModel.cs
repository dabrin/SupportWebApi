using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace webApi_Support_Proyect.Models
{
    public class SupervisorModel
    {
        public SupervisorModel(int id_Supervisor, string pass, string name, string first_surname, string second_Surname, string email)
        {
            Id_Supervisor = id_Supervisor;
            Pass = pass;
            Name = name;
            First_surname = first_surname;
            Second_Surname = second_Surname;
            Email = email;
        }
        public SupervisorModel() { }

        public int Id_Supervisor { get; set; }
        public string Pass { get; set; }
        public string Name{ get; set; }
        public string First_surname{ get; set; }
        public string Second_Surname { get; set; }
        public string Email { get; set; }



    }
}