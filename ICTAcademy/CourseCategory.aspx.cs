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
                String Lang = "E";

                Repeater rptCourses = e.Item.FindControl("rptCourses") as Repeater;
                rptCourses.DataSource = C.getCourseByCategoryID(Lang, categoryID);

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
                //HiddenField hfAvailable = (HiddenField)e.Item.FindControl("hfAvailable");                 

                int hfAvailable = int.Parse(((HiddenField)e.Item.FindControl("hfAvailable")).Value); 
                int hfMaxSeat = int.Parse(((HiddenField)e.Item.FindControl("hfMaxSeat")).Value);

                Literal ltrStatus = (Literal)e.Item.FindControl("ltrStatus");
                Label lbmaxSeat = (Label)e.Item.FindControl("lbmaxSeat");
                

                if (hfStartRegisdate.Value.Length > 0)
                {

                    DateTime StartRegisdate = DateTime.Parse(hfStartRegisdate.Value);
                    DateTime EndRegisdate = DateTime.Parse(hfEndRegisdate.Value);

                    //ltrStatus.Text = "<span class='badge text-bg-danger'>Close on " + EndRegisdate + " </span>";

                    //<span class='badge text-bg-danger'>Close on " + EndRegisdate + " </span>

                    //if (StartRegisdate <= DateTime.Now && DateTime.Now <= EndRegisdate)
                    //{
                    //    ltrStatus.Text = "<span class='badge text-bg-success'>OPEN</span>";
                    //} 


                    //if (EndRegisdate < DateTime.Now)
                    //{
                    //    ltrStatus.Text = "<span class='badge text-bg-danger'>CLOSED "+ EndRegisdate + "</span>"+ DateTime.Now;
                    //} 

                }


                if (hfAvailable == 0 && hfMaxSeat != 0) {  
                    // Full 
                    ltrStatus.Text = "<span class='badge text-bg-danger'>FULL</span>";

                }
                if (hfMaxSeat == 0)
                {
                    // UNLIMITED   
                    lbmaxSeat.Text = "<span class='badge text-bg-secondary'>UNLIMITED</span>";

                }
                else {
                    lbmaxSeat.Text = "<h4>"+ hfMaxSeat + "</h4>";
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