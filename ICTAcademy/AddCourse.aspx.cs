using ICTAcademy.CS;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;


namespace ICTAcademy
{
    public partial class AddCourse1 : System.Web.UI.Page
    {
        InstructorCS ICS = new InstructorCS();
        protected void Page_Load(object sender, EventArgs e)
        {
            getInstrutorList();
        }

        protected void uploadImage_Click(object sender, EventArgs e)
        {
            //ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "alertMessage", "alert('Run uploadImage_Click')", true);
          
        }

        private void getInstrutorList()
        {
            DataTable dt = ICS.getInstructorData();

            rptAddInstrutor.DataSource = dt;
            rptAddInstrutor.DataBind();



        }
    }
}