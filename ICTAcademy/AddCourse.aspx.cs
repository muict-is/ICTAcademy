using ICTAcademy.CS;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Runtime.InteropServices.ComTypes;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Image = System.Web.UI.WebControls.Image;



namespace ICTAcademy
{
    public partial class AddCourse1 : System.Web.UI.Page
    {
        InstructorCS ICS = new InstructorCS();
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (!IsPostBack)
                {
                    //Add Data Instrutor
                    DataTable dt = getDTInstrutor();
                    bindRPInstrutor(dt);

                    //Add Data Date
                    DataTable dtPeriod = getDTLearningPeriod();
                    bindRPLearningPeriod(dtPeriod);

                    startLeaening.Text = DateTime.Now.ToString("yyyy/MM/dd");
                    endLeaening.Text = DateTime.Now.ToString("yyyy/MM/dd");
                }
            }
            catch {
                Response.Write("Error");
            }
        }


        private void bindRPInstrutor(DataTable dt)
        {

            ViewState.Add("DTInstrutor", dt);

            rptAddInstrutor.DataSource = dt;
            rptAddInstrutor.DataBind();

        }

        private void bindRPLearningPeriod(DataTable dtPeriod)
        {

            ViewState.Add("DTLearningPeriod", dtPeriod);

            rptAddDate.DataSource = dtPeriod;
            rptAddDate.DataBind();

        }

        private DataTable getDTLearningPeriod()
        {

            if (ViewState["DTLearningPeriod"] != null) return (DataTable)ViewState["DTLearningPeriod"];

            //--- mock empty data table
            DataTable dtPeriod = new DataTable();
            dtPeriod.Columns.Add("startdate", typeof(string));
            dtPeriod.Columns.Add("enddate", typeof(string));

            dtPeriod.Rows.Add(new Object[] { string.Empty, string.Empty });
            return dtPeriod;


        }

        private DataTable getDTInstrutor()
        {

            if (ViewState["DTInstrutor"] != null) return (DataTable)ViewState["DTInstrutor"];


            //--- mock empty data table
            DataTable dt = new DataTable();
            //dt.Columns.Add("PreviewImage2", typeof(string));
            dt.Columns.Add("FileUploadImage", typeof(string));
            dt.Columns.Add("Fullname", typeof(string));
            dt.Columns.Add("position", typeof(string));
            dt.Columns.Add("work", typeof(string));
            dt.Columns.Add("email", typeof(string));

            dt.Rows.Add(new Object[] { string.Empty, string.Empty });
            return dt;


        }

        protected void BAddInstruture_Click(object sender, EventArgs e)
        {
            ViewState["DTInstrutor"] = null;
            DataTable dt = getDTInstrutor();

            dt.Rows.RemoveAt(0);

            foreach (RepeaterItem item in rptAddInstrutor.Items) {

                //Image PreviewImage2 = (Image)item.FindControl("PreviewImage2");
                FileUpload FileUploadImage = (FileUpload)item.FindControl("FileUploadImage");
                TextBox Fullname = (TextBox)item.FindControl("Fullname");
                TextBox position = (TextBox)item.FindControl("position");
                TextBox work = (TextBox)item.FindControl("work");
                TextBox email = (TextBox)item.FindControl("email");

                //เหลือจัดการ File Upload Image FileContent gettype
                dt.Rows.Add(new object[] { "data:"+FileUploadImage.FileContent+";base64,{0}"+Convert.ToBase64String(FileUploadImage.FileBytes), Fullname.Text, position.Text, work.Text, email.Text });
            } 

            dt.Rows.Add(new object[] { string.Empty, string.Empty });

            bindRPInstrutor(dt);

        }

        protected void BAddExtendTime_Click(object sender, EventArgs e)
        {
            ViewState["DTLearningPeriod"] = null;
            DataTable dtPeriod = getDTLearningPeriod();

            dtPeriod.Rows.RemoveAt(0);

            foreach (RepeaterItem item in rptAddDate.Items)
            {
                TextBox startdate = (TextBox)item.FindControl("startdate");
                TextBox enddate = (TextBox)item.FindControl("enddate");
               
                dtPeriod.Rows.Add(new object[] { startdate.Text, enddate.Text });
            }

            dtPeriod.Rows.Add(new object[] { string.Empty, string.Empty });

            bindRPLearningPeriod(dtPeriod);
        }


        protected void rptAddDate_ItemDataBound(object sender, RepeaterItemEventArgs e)
        {
            if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
            {

                int itemIdx = e.Item.ItemIndex;
                DataTable dtPeriod = getDTLearningPeriod();

                RepeaterItem item = e.Item;

                TextBox startdate = (TextBox)item.FindControl("startdate");
                TextBox enddate = (TextBox)item.FindControl("enddate");

                startdate.Text = dtPeriod.Rows[itemIdx]["startdate"].ToString();
                enddate.Text = dtPeriod.Rows[itemIdx]["enddate"].ToString();

            }
        }

        protected void rptAddInstrutor_ItemDataBound(object sender, RepeaterItemEventArgs e)
        {
            if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
            {

                int itemIdx = e.Item.ItemIndex;
                DataTable dt = getDTInstrutor();

                RepeaterItem item = e.Item;



                Image PreviewImage2 = (Image)item.FindControl("PreviewImage2");
                TextBox Fullname = (TextBox)item.FindControl("Fullname");
                TextBox position = (TextBox)item.FindControl("position");
                TextBox work = (TextBox)item.FindControl("work");
                TextBox email = (TextBox)item.FindControl("email");

                //FileUploadImage.FileBytes = dt.Rows[itemIdx]["FileUploadImage"].GetType ;

                //string fileName = System.IO.Path.GetFileName(FileUploadImage.PostedFile.FileName);
                //string filePath = Server.MapPath("~/UploadedFiles/") + fileName;
                //fileUploadControl.SaveAs(filePath);
                //byte[] fileBytes = YourFileBytesFunction();

                //FileUploadImage.PostedFile = new HttpPostedFileWrapper(new System.Web.HttpPostedFile(fileName, "image/webp", new MemoryStream(fileBytes)));
                PreviewImage2.ImageUrl = dt.Rows[itemIdx]["FileUploadImage"].ToString();
                Fullname.Text = dt.Rows[itemIdx]["Fullname"].ToString();
                position.Text = dt.Rows[itemIdx]["position"].ToString();
                work.Text = dt.Rows[itemIdx]["work"].ToString();
                email.Text = dt.Rows[itemIdx]["email"].ToString();
                 
            }
        }

        // Method to retrieve file bytes (replace this with your actual method)
        private byte[] YourFileBytesFunction()
        {
            // Implement your logic to retrieve file bytes here
            return new byte[0]; // Return file bytes
        }

        protected void BtnSubmit_Click(object sender, EventArgs e)
        {
            String ImageCourseName = null;

            //TabCourse    
            String CourseNameTH = this.CourseNameTH.Text;
            String CourseNameEN = this.CourseNameEN.Text;
            String CategoryID = this.CategoryID.Text;


            //TabCourseDescription

            if (FileUpload1.PostedFile != null)
            {


                ImageCourseName = System.IO.Path.GetFileName(FileUpload1.PostedFile.FileName);
                FileUpload1.SaveAs(Server.MapPath("~/Assets/Images/" + ImageCourseName));

            }
            else
            {
                ImageCourseName = "NO";
            }


            //if (FileUpload2.HasFile)
            //{
            //    ImageCourseName = "Yes";
            //}
            //else
            //{
            //    ImageCourseName = "NO2222";
            //}


            String courseDescription = this.courseDescription.Text;
            String courseObjective = this.courseObjective.Text;
            String courseProgram = this.courseProgram.Text;
            String courseEvaluation = this.courseEvaluation.Text;
            String stylesID = this.stylesID.Text;
            String maxSeat = this.maxSeat.Text;
            String fee = this.fee.Text;
            String totalHour = this.totalHour.Text;
            String hourPerWeek = this.hourPerWeek.Text;
            String periodTimeID = this.periodTimeID.Text;
            String startLeaening = this.startLeaening.Text;
            String endLeaening = this.endLeaening.Text;

            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "alertMessage", "alert('" + ImageCourseName + "')", true);
        }
    }
}