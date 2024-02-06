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
    public partial class CourseDetail : System.Web.UI.Page
    {
        CourseCS C = new CourseCS();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                int courseID = int.Parse(Request.QueryString["cid"]);
                ViewState["courseID"] = courseID;

                getCourseIDList((int)ViewState["courseID"]);

            
            }
        }

        private void getCourseIDList(int courseID)
        {
            //DataTable dt = C.getCoursListSample();
            DataTable dt = C.getcourseByIDList(courseID);


            foreach (DataRow dr in dt.Rows)
            {
                lbCourseCode.Text = dr["courseCode"].ToString();
                lbcourseNameEN.Text = dr["courseNameEN"].ToString();
                lbCategoryEN.Text = dr["CategoryEN"].ToString();
                lbcourseDescription.Text = dr["courseDescription"].ToString();
                lbcourseObjective.Text = dr["courseObjective"].ToString();
                lbcourseProgram.Text = dr["courseProgram"].ToString();
                lbcourseEvaluation.Text = dr["courseEvaluation"].ToString();

                ImageBlog.ImageUrl = dr["ImageCourse"].ToString();

                lbFee.Text = decimal.Parse(dr["Fee"].ToString()).ToString("N2");
                lbmaxSeat.Text = int.Parse(dr["maxSeat"].ToString()).ToString();




                //<%#Eval("Fee").ToString().Length >0 ? decimal.Parse(Eval("Fee").ToString()).ToString("N2") : "" %>
            }


        }


    }
}