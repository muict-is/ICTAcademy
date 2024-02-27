using ICTAcademy.CS;
using ICTAcademy.DS;
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
            //DataTable dt = C.getCoursListSample();
            DataTable dt = C.getCourseAllList();
            rptCourseList.DataSource = dt;
            rptCourseList.DataBind();

        }

        protected void rptCourseList_ItemDataBound(object sender, RepeaterItemEventArgs e)
        {
            if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
            { 
                int itemIdx = e.Item.ItemIndex;
                DataTable dt = C.getCourseAllList();

                RepeaterItem item = e.Item;
                Image PreviewImage2 = (Image)item.FindControl("Image1");

                //PreviewImage2.ImageUrl = dt.Rows[itemIdx]["ImageCourse"].ToString();
            }
        }
         
        protected void Image1_Command(object sender, CommandEventArgs e)
        {
            String courseDesID = (sender as ImageButton).CommandArgument;
            //ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "alertMessage", "alert('" + courseDesID + "')", true);
            Response.Redirect(Page.ResolveUrl("~/CourseDetail.aspx?cid=" + courseDesID));
        }

    
    }
}