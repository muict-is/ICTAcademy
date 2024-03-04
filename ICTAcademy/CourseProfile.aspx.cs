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

namespace ICTAcademy
{
    public partial class CourseProfile : System.Web.UI.Page
    {
        RegisterCS R = new RegisterCS();
        CourseCS C = new CourseCS();
        protected void Page_Load(object sender, EventArgs e)
        {
            Session["Username"] = "sukumaporn";

            if (!IsPostBack)
            {
                if (Session["Username"] != null)
                {
                    ViewState.Add("Username", Session["Username"].ToString());
                    getUserProfile();
                    getCourseApply();
                }
                else
                {
                    Response.Redirect("Default.aspx");
                }
                
            }
                
        }

        private void getCourseApply()
        {
            
            string username = ViewState["Username"].ToString();
            DataTable dt = C.getCourseApplyList(username);

            //ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "alertMessage", "alert('" + dt.Rows.Count + "')", true);

            if (dt.Rows.Count != 0)
            {
                rptMyCourse.DataSource = dt;
                rptMyCourse.DataBind();
            } 
            else {
                rptMyCourse.DataSource = null;
                rptMyCourse.DataBind();
                noData.Visible = true;
            }
           
        }

        private void getUserProfile()
        {
            string username = ViewState["Username"].ToString();
            DataTable dt = R.getMemberByUsername(username);

            foreach (DataRow dr in dt.Rows) 
            {
                lbfullname.Text = dr["titleTH"].ToString() + " " + dr["firstnameTH"].ToString() + " " + dr["middleTH"].ToString() + " " + dr["lastnameTH"].ToString();
                lbfullnameEN.Text = dr["titleEN"].ToString() + " " + dr["firstnameEN"].ToString() + " " + dr["middleEN"].ToString() + " " + dr["lastnameEN"].ToString();
                lbStyle.Text = dr["registerTypeEN"].ToString();
                lbEmail.Text = dr["email"].ToString();

                //Info Modal
                titleTH.SelectedValue = dr["titleTH"].ToString();
                firstnameTH.Text = dr["firstnameTH"].ToString();
                middleTH.Text = dr["middleTH"].ToString();
                lastnameTH.Text = dr["lastnameTH"].ToString();
                titleEN.SelectedValue = dr["titleEN"].ToString();
                firstnameEN.Text = dr["firstnameEN"].ToString();
                middleEN.Text = dr["middleEN"].ToString();
                lastnameEN.Text = dr["lastnameEN"].ToString();
                email.Text = dr["email"].ToString();


                int registerTypeID = int.Parse(dr["registerTypeID"].ToString());
                
                if (registerTypeID == 1 || registerTypeID == 2)
                {   //Student , Staff
                    email.Enabled = false;
                    // ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "alertMessage", "alert('" + registerTypeID + "')", true);
                }
                else 
                {
                    //Alumni , General
                    email.Enabled = true;
                }

            }
        }

        protected void lbSaveChange_Click(object sender, EventArgs e)
        {
            string username = ViewState["Username"].ToString();
            String titleTH = this.titleTH.Text.Trim();
            String firstnameTH = this.firstnameTH.Text.Trim();
            String middleTH = this.middleTH.Text.Trim();
            String lastnameTH = this.lastnameTH.Text.Trim();
            String titleEN = this.titleEN.Text.Trim();
            String firstnameEN = this.firstnameEN.Text.Trim();
            String middleEN = this.middleEN.Text.Trim();
            String lastnameEN = this.lastnameEN.Text.Trim();
            String email = this.email.Text.Trim();
             
            R.updateRegisterMember(titleTH, firstnameTH, middleTH, lastnameTH, titleEN, firstnameEN, middleEN, lastnameEN, email, username);
            getUserProfile();

        }

        protected void Onexpand(object sender, EventArgs e)
        {
            RepeaterItem row = (sender as Button).NamingContainer as RepeaterItem;
            (row.FindControl("litsort") as Literal).Visible = false;
            (row.FindControl("litfull") as Literal).Visible = true;
            (row.FindControl("btnexpand") as Button).Visible = false;
            (row.FindControl("btncollapse") as Button).Visible = true;
        }

        protected void Oncollapse(object sender, EventArgs e)
        {
            RepeaterItem row = (sender as Button).NamingContainer as RepeaterItem;
            (row.FindControl("litsort") as Literal).Visible = true;
            (row.FindControl("litfull") as Literal).Visible = false;
            (row.FindControl("btnexpand") as Button).Visible = true;
            (row.FindControl("btncollapse") as Button).Visible = false;
        }

        protected void Button1_Command(object sender, CommandEventArgs e)
        {
            int courseApplyID = int.Parse((sender as LinkButton).CommandArgument);
            //ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "alertMessage", "alert('" + courseApplyID + "')", true);

            int statusCancle = 4; 
            C.getUpdateStatusApply(statusCancle, courseApplyID);
            getUserProfile();
            getCourseApply();
        }
    }
}