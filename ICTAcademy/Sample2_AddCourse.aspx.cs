using ICTAcademy.CS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ICTAcademy
{
    public partial class Sample2_AddCourse : System.Web.UI.Page
    {
        CourseCS C = new CourseCS();
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btnAddCourse_Click(object sender, EventArgs e)
        {
            C.createCourse(1, tbCourseCode.Text.Trim(), tbCourseNameTH.Text.Trim(), tbCourseNameEN.Text.Trim(), "prach.cha");

            tbCourseCode.Text = string.Empty;
            tbCourseNameTH.Text = string.Empty;
            tbCourseNameEN.Text = string.Empty;

            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "alertMessage", "alert('add courses success')", true);

        }

       
    }
}