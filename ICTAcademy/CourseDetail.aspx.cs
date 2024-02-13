using ICTAcademy.CS;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Globalization;
using System.Threading;

using System.Runtime.InteropServices.ComTypes;

namespace ICTAcademy
{
    public partial class CourseDetail : System.Web.UI.Page
    {
        CourseCS C = new CourseCS();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {

                try { 
                    int courseDesID = int.Parse(Request.QueryString["cid"]);
                    ViewState["courseDesID"] = courseDesID;

                    getCourseIDList((int)ViewState["courseDesID"]);
                    getInstructors((int)ViewState["courseDesID"]);
                }
                catch (Exception ex)
                {
                    Response.Redirect("Default.aspx");
                }

            
            }
        }

        private void getInstructors(int courseDesID)
        {
            
            DataTable dt = C.GetInstructorsByCourseID(courseDesID);
            rptInstructors.DataSource = dt;
            rptInstructors.DataBind();

        }

        private void getCourseIDList(int courseDesID)
        {
            //DataTable dt = C.getCoursListSample();
            DataTable dt = C.getcourseByIDList(courseDesID);


            foreach (DataRow dr in dt.Rows)
            {
                lbCourseCode.Text = dr["courseCode"].ToString();
                lbcourseNameEN.Text = dr["courseNameEN"].ToString();
                lbCategoryEN.Text = dr["CategoryEN"].ToString();
                lbhour.Text = dr["totalHour"].ToString();
                lbhourPerWeek.Text = dr["hourPerWeek"].ToString();
                lbstyleEN.Text = dr["stylesEN"].ToString();
                lbstyleTH.Text = dr["stylesTH"].ToString();
                             

                lbcourseDescription.Text = dr["courseDescription"].ToString();

                if (dr["courseObjective"].ToString() != null) { 
                    lbcourseObjective.Text = dr["courseObjective"].ToString();
                    DivlbcourseObjective.Visible = true;
                }

                if (dr["courseOutline"].ToString() != null)
                {
                    lbcourseOutline.Text = dr["courseOutline"].ToString();
                    DivlbcourseOutline.Visible = true;
                }

                if (dr["courseEvaluation"].ToString() != null)
                {
                    lbcourseEvaluation.Text = dr["courseEvaluation"].ToString();
                    DivlbcourseEvaluation.Visible = true;
                }                

                ImageBlog.ImageUrl = dr["ImageCourse"].ToString();

                lbFee.Text = decimal.Parse(dr["Fee"].ToString()).ToString("N2");
                lbmaxSeat.Text = int.Parse(dr["maxSeat"].ToString()).ToString();


                DateTime startLearning = Convert.ToDateTime(dr["startLearning"].ToString());
                DateTime endLearning = Convert.ToDateTime(dr["endLearning"].ToString());
                DateTime startRegisdate = Convert.ToDateTime(dr["startRegisdate"].ToString());
                DateTime endRegisdate = Convert.ToDateTime(dr["endRegisdate"].ToString());

                Thread.CurrentThread.CurrentCulture = new CultureInfo("en-US");
                //openRegisStart.Text = DateTime.Today.ToString("dddd dd MMMM yyyy"); 
                lbstartLearning.Text =  startLearning.Date.ToString(" dd MMMM yyyy") + " - " + endLearning.Date.ToString(" dd MMMM yyyy");

                //Thread.CurrentThread.CurrentCulture = new CultureInfo("en-US");   
                //<%#Eval("Fee").ToString().Length >0 ? decimal.Parse(Eval("Fee").ToString()).ToString("N2") : "" %>

                //ยังไม่เปิดให้ลงทะเบียน
                if(DateTime.Now.Date < startRegisdate)
                {
                    DivEnroll.Visible = true;
                    Thread.CurrentThread.CurrentCulture = new CultureInfo("en-US");
                    DivEnrollText.Text = "<span style='color:#EE4B2B'><b>Register on " + startRegisdate.Date.ToString("dddd dd MMMM yyyy") + "</b></span>";

                    DivEnrollOpen.Visible = false;
                    DivEnrollClose.Visible = false;
                }

                //Open
                if (DateTime.Now.Date >= startRegisdate && DateTime.Now.Date < endRegisdate)
                {
                    DivEnroll.Visible = false;                    
                    DivEnrollOpen.Visible = true;
                    DivEnrollClose.Visible = false;
                }

                //Close
                if (DateTime.Now.Date > endRegisdate)
                {
                    DivEnroll.Visible = false;
                    DivEnrollOpen.Visible = false;
                    DivEnrollClose.Visible = true;
                }

            }


        }


    }
}