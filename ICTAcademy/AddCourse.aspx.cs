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
using static System.Net.Mime.MediaTypeNames;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ListView;
using Image = System.Web.UI.WebControls.Image;



namespace ICTAcademy
{
    public partial class AddCourse1 : System.Web.UI.Page
    {
        InstructorCS ICS = new InstructorCS();
        CourseCS C = new CourseCS();
        protected void Page_Load(object sender, EventArgs e)
        {
           
            String lang = "E";

            if (!IsPostBack)
            {

                bindDDLCategory(lang);
                bindDDLstylesID();

                //Add Data Instrutor
                DataTable dt = getDTInstrutor();
                bindRPInstrutor();

                //Add Data Date
                DataTable dtPeriod = getDTLearningPeriod();
                bindRPLearningPeriod(dtPeriod);

            }

            ScriptManager.RegisterStartupScript(Page, GetType(), "activeJS", "<script>activeJS()</script>", false);

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
            //if (ViewState["DTInstrutor"] != null) return (DataTable)ViewState["DTInstrutor"];
            if (Session["ItemDt"] != null) return (DataTable)Session["ItemDt"];

            //--- mock empty data table
            DataTable dt = new DataTable();
            //dt.Columns.Add("PreviewImage2", typeof(string));
            dt.Columns.Add("FileUploadImage", typeof(string));
            dt.Columns.Add("Fullname", typeof(string));
            dt.Columns.Add("position", typeof(string));
            dt.Columns.Add("work", typeof(string));
            dt.Columns.Add("email", typeof(string)); 
            dt.Columns.Add("Image", typeof(Stream));
            dt.Columns.Add("ImageName", typeof(string));
            dt.Columns.Add("ImageType", typeof(string));
            dt.Columns.Add("ImageContentLength", typeof(string));

            Session["ItemDt"] = dt;

            dt.Rows.Add(new Object[] { string.Empty, string.Empty });
            return dt;

        }

        protected void BAddInstruture_Click(object sender, EventArgs e)
        {

            AddItem();
            bindRPInstrutor();
            //bindRPInstrutor(dt);
             
        }

        private void bindRPInstrutor()
        {
            // get data from session
            DataTable itemDt = (DataTable)Session["ItemDt"];
            // bind to repeater
            rptAddInstrutor.DataSource = itemDt; 
            rptAddInstrutor.DataBind();
        }

        private void AddItem()
        {
            // Get the current data from Session
            DataTable itemDt = (DataTable)Session["ItemDt"];

            // get added item from repeater
            foreach (RepeaterItem repeaterItem in rptAddInstrutor.Items)
            {
                // get control from repeater
                
                FileUpload fuImage = (FileUpload)repeaterItem.FindControl("FileUploadImage");
                TextBox Fullname = (TextBox)repeaterItem.FindControl("Fullname");
                TextBox position = (TextBox)repeaterItem.FindControl("position");
                TextBox work = (TextBox)repeaterItem.FindControl("work");
                TextBox email = (TextBox)repeaterItem.FindControl("email");

                // check if fileupload has file
                if (fuImage.HasFile)
                {
                    // get file name
                    string fileName = fuImage.FileName;
                    // get file type
                    string fileType = fuImage.PostedFile.ContentType;
                    // get file stream
                    Stream fileStream = fuImage.PostedFile.InputStream;
                    // update file date to datatable
                    MemoryStream ms = new MemoryStream();
                    fileStream.CopyTo(ms);
                    itemDt.Rows[repeaterItem.ItemIndex]["Image"] = ms;
                    itemDt.Rows[repeaterItem.ItemIndex]["ImageName"] = fileName;
                    itemDt.Rows[repeaterItem.ItemIndex]["ImageType"] = fileType;
                    itemDt.Rows[repeaterItem.ItemIndex]["ImageContentLength"] = fuImage.PostedFile.ContentLength;
                }
                itemDt.Rows[repeaterItem.ItemIndex]["Fullname"] = Fullname.Text;
                itemDt.Rows[repeaterItem.ItemIndex]["position"] = position.Text;
                itemDt.Rows[repeaterItem.ItemIndex]["work"] = work.Text;
                itemDt.Rows[repeaterItem.ItemIndex]["email"] = email.Text;
            }
            // Add new row
            //itemDt.Rows.Add("", null, null, null);
            itemDt.Rows.Add(new object[] { string.Empty, string.Empty });
            //update session
            Session["ItemDt"] = itemDt; 

        }

        //protected void BAddExtendTime_Click(object sender, EventArgs e)
        //{
        //    ViewState["DTLearningPeriod"] = null;
        //    DataTable dtPeriod = getDTLearningPeriod();

        //    dtPeriod.Rows.RemoveAt(0);

        //    foreach (RepeaterItem item in rptAddDate.Items)
        //    {
        //        TextBox startdate = (TextBox)item.FindControl("startdate");
        //        TextBox enddate = (TextBox)item.FindControl("enddate");
               
        //        dtPeriod.Rows.Add(new object[] { startdate.Text, enddate.Text });
        //    }

        //    dtPeriod.Rows.Add(new object[] { string.Empty, string.Empty });

        //    bindRPLearningPeriod(dtPeriod);
        //}


        protected void rptAddDate_ItemDataBound(object sender, RepeaterItemEventArgs e)
        {
            if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
            {

                int itemIdx = e.Item.ItemIndex;
                DataTable dtPeriod = getDTLearningPeriod();

                RepeaterItem item = e.Item;

                TextBox startdate = (TextBox)item.FindControl("startdate");
                TextBox enddate = (TextBox)item.FindControl("enddate");

                //startdate.Text = dtPeriod.Rows[itemIdx]["startdate"].ToString();
                //enddate.Text = dtPeriod.Rows[itemIdx]["enddate"].ToString();

            }
        }

        protected void rptAddInstrutor_ItemDataBound(object sender, RepeaterItemEventArgs e)
        {
            if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
            {

                int itemIdx = e.Item.ItemIndex;
                DataTable dt = getDTInstrutor();

                RepeaterItem item = e.Item;

                // get control from repeater               
                TextBox Fullname = (TextBox)item.FindControl("Fullname");
                TextBox position = (TextBox)item.FindControl("position");
                TextBox work = (TextBox)item.FindControl("work");
                TextBox email = (TextBox)item.FindControl("email");

                // get data from session
                DataTable temp = (DataTable)Session["ItemDt"];
                // copy to new Datatable name itemDt
                DataTable itemDt = temp.Copy();

                //set value to control
                Fullname.Text = dt.Rows[itemIdx]["Fullname"].ToString();
                position.Text = dt.Rows[itemIdx]["position"].ToString();
                work.Text = dt.Rows[itemIdx]["work"].ToString();
                email.Text = dt.Rows[itemIdx]["email"].ToString();

                // check if image is not null
                if (itemDt.Rows[e.Item.ItemIndex]["Image"] != DBNull.Value)
                {
                    // set image to previewImage
                    Image previewImage = (Image)e.Item.FindControl("previewImage");
                    // get image stream
                    MemoryStream imageStream = (MemoryStream)itemDt.Rows[e.Item.ItemIndex]["Image"];
                    if (imageStream != null && imageStream.CanRead)
                    {
                        using (MemoryStream memoryStream = new MemoryStream())
                        { 
                            imageStream.Position = 0;
                            imageStream.CopyTo(memoryStream);
                            string base64String = Convert.ToBase64String(memoryStream.ToArray());
                            previewImage.ImageUrl = "data:" + itemDt.Rows[e.Item.ItemIndex]["ImageType"] + ";base64," + base64String;
                        }
                    }

                }

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
            //String periodTimeID = this.periodTimeID.Text;
            //String startLeaening = this.startLeaening.Text;
            //String endLeaening = this.endLeaening.Text;

            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "alertMessage", "alert('" + ImageCourseName + "')", true);
        }

        private void bindDDLCategory(String lang)
        {
            CategoryID.DataSource = C.getAllCategory(lang);
            CategoryID.DataTextField = "Category";
            CategoryID.DataValueField = "CategoryID";
            CategoryID.DataBind();

            CategoryID.Items.Insert(0, new ListItem("  ", ""));
        }

        private void bindDDLstylesID()
        {
            stylesID.DataSource = C.getLearningStyleList();
            stylesID.DataTextField = "LearningStyles";
            stylesID.DataValueField = "stylesID";
            stylesID.DataBind();

            stylesID.Items.Insert(0, new ListItem("  ", ""));
        }

      


        //protected void btnTestFileUpload_Click(object sender, EventArgs e)
        //{
        //    string logResult = "- no file -";
        //    if(FileUpload3.HasFile)
        //    {
        //        logResult = FileUpload3.FileName.ToString();
        //        logResult = FileUpload3.FileName.ToString();
        //    }

        //    ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "alertMessage", "alert(' File name : " + logResult + "')", true);
        //}
    }
}