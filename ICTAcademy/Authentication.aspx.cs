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
    public partial class Authentication : System.Web.UI.Page
    {
        AuthenticationCS A = new AuthenticationCS();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {

            }
        }

        protected void btnLogin_Click(object sender, EventArgs e)
        {
            string username = tbUsername.Text.Trim().ToLower();
            string password = tbPassword.Text.Trim();
            divError.Visible = false;


            DataTable dt = A.getUserAccount(username, password);
            
            if(dt.Rows.Count > 0) // authen success
            {
                // get user info
                foreach(DataRow dr in dt.Rows)
                {
                    Session.Add("Fullname", $"{dr["firstnameEN"].ToString()} {dr["lastnameEN"].ToString()}");
                    Session.Add("isAdmin", (bool)(dr["adminRole"]));
                    Session.Add("RegisterID", int.Parse(dr["RegisterID"].ToString()));

                    Response.Redirect("Default.aspx");
                }
            }
            else // authen failed
            {
                tbPassword.Text = "";
                divError.Visible = true;
            }
        }

        protected void btnForgetPassword_Click(object sender, EventArgs e)
        {

        }
    }
}