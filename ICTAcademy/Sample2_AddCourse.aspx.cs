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
    public partial class Sample2_AddCourse : System.Web.UI.Page
    {
        CourseCS C = new CourseCS();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                bindDDLLearningStyle();
            }
            //Session.Add("userAccount", "prach.cha");
            Session.Add("userAccount", "sukumaporn.kon");
        }

        protected void btnAddCourse_Click(object sender, EventArgs e) 
        {
            int learningStyle = int.Parse(ddlLearningStyle.SelectedValue.ToString());
            string courseCode = tbCourseCode.Text.Trim();
            string courseNameTH = tbCourseNameTH.Text.Trim();
            string courseNameEN = tbCourseNameEN.Text.Trim();
            string createBy = Session["userAccount"].ToString();

            C.createCourse(learningStyle, courseCode , courseNameTH, courseNameEN, createBy);

            tbCourseCode.Text = string.Empty;
            tbCourseNameTH.Text = string.Empty; 
            tbCourseNameEN.Text = string.Empty;
            bindDDLLearningStyle(); 

            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "alertMessage", "alert('add courses success')", true);

        }

        private void bindDDLLearningStyle()
        {
            ddlLearningStyle.DataSource = C.getLearningStyleList();
            ddlLearningStyle.DataTextField = "stylesTH";
            ddlLearningStyle.DataValueField = "stylesID";
            ddlLearningStyle.DataBind();

            ddlLearningStyle.Items.Insert(0, new ListItem("--กรุณาระบุ--", "0"));
        }


    }
}