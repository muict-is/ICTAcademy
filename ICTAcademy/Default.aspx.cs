using ICTAcademy.CS;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ICTAcademy
{
    public partial class Default : System.Web.UI.Page
    {
        CourseCS C = new CourseCS();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                getCourseList();
            }
           
        }


        private void getCourseList()
        {
            DataTable dt = C.getCoursListSample();
            rptCourseList.DataSource = dt;
            rptCourseList.DataBind();
        }
    }
}