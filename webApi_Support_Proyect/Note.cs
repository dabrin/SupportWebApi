//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace webApi_Support_Proyect
{
    using System;
    using System.Collections.Generic;
    
    public partial class Note
    {
        public int Id { get; set; }
        public int Report_Number_Issue { get; set; }
        public string Description { get; set; }
        public System.DateTime Note_Time { get; set; }
    
        public virtual Issue Issue { get; set; }
    }
}
