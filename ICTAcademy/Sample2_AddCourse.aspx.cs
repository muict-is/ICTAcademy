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
            Session.Add("userAccount", "prach.cha");
        }

        protected void btnAddCourse_Click(object sender, EventArgs e)
        {
            string learningStyle = ddlLearningStyle.SelectedValue.ToString();


            C.createCourse(1, tbCourseCode.Text.Trim(), tbCourseNameTH.Text.Trim(), tbCourseNameEN.Text.Trim(), Session["userAccount"].ToString());

            tbCourseCode.Text = string.Empty;
            tbCourseNameTH.Text = string.Empty; 
            tbCourseNameEN.Text = string.Empty;

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