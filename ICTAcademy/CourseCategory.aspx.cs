using ICTAcademy.CS;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.DynamicData;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml.Linq;

namespace ICTAcademy
{
    public partial class HomeCoursesList : System.Web.UI.Page
    {

        CourseCS C = new CourseCS();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                getCourseCategory();
            }
        }

        private void getCourseCategory()
        {

            DataTable dt = C.getCategoryGroup();

            //ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "alertMessage", "alert('" + dt.Rows.Count + "')", true);
            if (dt.Rows.Count != 0)
            {
                rptCourseCategory.DataSource = dt;
                rptCourseCategory.DataBind();
            }
            else
            {
                rptCourseCategory.DataSource = null;
                rptCourseCategory.DataBind();
                rptCourseCategory.Visible = true;
            }

        }

        protected void rptCourseCategory_ItemDataBound(object sender, RepeaterItemEventArgs e)
        {
            if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
            {
                int categoryID = int.Parse((e.Item.FindControl("hfCategoryID") as HiddenField).Value);
                Repeater rptCourses = e.Item.FindControl("rptCourses") as Repeater;
                rptCourses.DataSource = C.getCourseByCategoryID(categoryID);

                //DataTable datepare = C.getCourseByCategoryID(categoryID);
                //datepare.Columns.Add("startRegis");

                rptCourses.DataBind();
            }
        }

        protected void rptCourses_ItemDataBound(object sender, RepeaterItemEventArgs e)
        {
            if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
            {
                HiddenField hfStartRegisdate = (HiddenField)e.Item.FindControl("hfStartRegisdate");
                HiddenField hfEndRegisdate = (HiddenField)e.Item.FindControl("hfEndRegisdate");
                Literal ltrStatus = (Literal)e.Item.FindControl("ltrStatus");

                ltrStatus.Text = "<span class='badge text-bg-danger'>No Date</span>"; 

                if (hfStartRegisdate.Value.Length > 0)
                {
                    DateTime StartRegisdate = DateTime.Parse(hfStartRegisdate.Value);
                    DateTime EndRegisdate = DateTime.Parse(hfEndRegisdate.Value);

                    if (StartRegisdate < DateTime.Now &&  DateTime.Now < EndRegisdate)
                    {
                        ltrStatus.Text = "<span class='badge text-bg-warning'>Coming Soon</span>";
                    }

                    if (StartRegisdate >= DateTime.Now && DateTime.Now < EndRegisdate)
                    {
                        ltrStatus.Text = "<span class='badge text-bg-success'>Open</span>";
                    }

                    if (StartRegisdate >= DateTime.Now && DateTime.Now < EndRegisdate)
                    {
                        ltrStatus.Text = "<span class='badge text-bg-success'>Open</span>";
                    }

                }

            }
        }

        protected void Image1_Command(object sender, CommandEventArgs e)
        {
            String courseDesID = e.CommandArgument.ToString(); 
            //ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "alertMessage", "alert('" + courseDesID + "')", true);
            Response.Redirect(Page.ResolveUrl("~/CourseDetail.aspx?cid=" + courseDesID));
        }
    }
}