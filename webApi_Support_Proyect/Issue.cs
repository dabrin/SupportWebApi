
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
    
public partial class Issue
{

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
    public Issue()
    {

        this.Note = new HashSet<Note>();

    }


    public int Report_Number { get; set; }

    public Nullable<int> Id_Supporter { get; set; }

    public string Classification { get; set; }

    public string Status { get; set; }

    public System.DateTime Report_Time { get; set; }

    public string Resolution_Comment { get; set; }



    public virtual Supporter Supporter { get; set; }

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

    public virtual ICollection<Note> Note { get; set; }

}

}
