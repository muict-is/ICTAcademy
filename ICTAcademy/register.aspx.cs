using ICTAcademy.CS;
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
        RegisterCS R = new RegisterCS();
        protected void Page_Load(object sender, EventArgs e)
        {
            //select Country
            bindDDLCountry();
        }

        protected void btnAdd_Click(object sender, EventArgs e)
        {
            String titleTH = this.titleTH.Text.Trim();
            String firstnameTH = this.firstnameTH.Text.Trim();
            String middleTH = this.middleTH.Text.Trim(); 
            String lastnameTH = this.lastnameTH.Text.Trim(); 
            String titleEN = this.titleEN.Text.Trim(); 
            String firstnameEN = this.firstnameEN.Text.Trim(); 
            String middleEN = this.middleEN.Text.Trim(); ;
            String lastnameEN = this.lastnameEN.Text.Trim();            
            String email = this.email.Text.Trim(); 
            String username = this.username.Text.Trim(); 
            String password = this.password.Text.Trim();

            int country = int.Parse(countryID.SelectedValue.ToString());

            //DateTime localDate = DateTime.Now;
            //String createDate = localDate.ToString(); //Example: 1/31/2024 4:47:50 PM

            R.insertRegisterMember(titleTH, firstnameTH, middleTH, lastnameTH, titleEN, firstnameEN, middleEN, lastnameEN, country, email, username, password);

            //Temp Display Code 
            //ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "alertMessage", "alert('" + titleTH + " - " + firstnameTH + " - " + middleTH + " - " + lastnameTH + " - " + titleEN + " - " + " - " + firstnameEN + " - " + middleEN + " - " + lastnameEN + " - " + countryID + email + " - " + username + " - " + password + " - "  + "')", true);

            //Setting Front to Empty field
            this.titleTH.Text = string.Empty;
            this.firstnameTH.Text = string.Empty;
            this.middleTH.Text = string.Empty;
            this.lastnameTH.Text = string.Empty;
            this.titleEN.Text = string.Empty;
            this.firstnameEN.Text = string.Empty;
            this.middleEN.Text = string.Empty;
            this.lastnameEN.Text = string.Empty;
            this.email.Text = string.Empty;
            this.username.Text = string.Empty;
            this.password.Text = string.Empty; 

            bindDDLCountry();

            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "alertMessage", "alert('add courses success')", true);
        }

        private void bindDDLCountry()
        {
            countryID.DataSource = R.getCountryList();
            countryID.DataTextField = "countryEN";
            countryID.DataValueField = "countryID";
            countryID.DataBind();

            countryID.Items.Insert(0, new ListItem("  ", "0"));
        }
    }
}