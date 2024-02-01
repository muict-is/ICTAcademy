using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ICTAcademy
{
    public partial class register : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btnAdd_Click(object sender, EventArgs e)
        {
            String titleTH = this.titleTH.Text;
            String firstnameTH = this.firstnameTH.Text;
            String middleTH = this.middleTH.Text;
            String lastnameTH = this.lastnameTH.Text;
            String titleEN = this.titleEN.Text;
            String firstnameEN = this.firstnameEN.Text;
            String middleEN = this.middleEN.Text;
            String lastnameEN = this.lastnameEN.Text;
            String countryID = this.countryID.Text;
            String email = this.email.Text;
            String username = this.username.Text;
            String password = this.password.Text;

            DateTime localDate = DateTime.Now;
            String createDate = localDate.ToString(); //Example: 1/31/2024 4:47:50 PM

            //Temp Display Code 
            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "alertMessage", "alert('" + titleTH + " - " + firstnameTH + " - " + middleTH + " - " + lastnameTH + " - " + titleEN + " - " + " - " + firstnameEN + " - " + middleEN + " - " + lastnameEN + " - " + countryID + email + " - " + username + " - " + password + " - " + createDate + "')", true);
             
        }
    }
}