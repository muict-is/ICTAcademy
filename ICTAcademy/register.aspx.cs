using ICTAcademy.CS;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
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
            String lang = "E";
            if (!IsPostBack)
            {
                bindDDLCountry(lang);
                bindDDLRegisterType(lang);
                bindDDLGender(lang);
                bindDDLBirth();
                bindDDLTitle();
            }
        }

        protected void btnAdd_Click(object sender, EventArgs e)
        {

            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "alertMessage", "alert('5555')", true);


            string firstnameTH = this.firstnameTH.Text.Trim();
            string middleTH = this.middleTH.Text.Trim();
            string lastnameTH = this.lastnameTH.Text.Trim();
            string firstnameEN = this.firstnameEN.Text.Trim();
            string middleEN = this.middleEN.Text.Trim(); ;
            string lastnameEN = this.lastnameEN.Text.Trim();
            string email = this.email.Text.Trim();
            string username = this.email.Text.Trim();
            string password = this.password.Text.Trim();

            int titleTH = int.Parse(title_TH.SelectedValue.ToString());
            int titleEN = int.Parse(title_EN.SelectedValue.ToString());
            string yearOfBirth = ddByear.SelectedValue.ToString();
            int registerTypeID = int.Parse(ddRegisterType.SelectedValue.ToString());
            int gender = int.Parse(ddGender.SelectedValue.ToString());
            int country = int.Parse(countryID.SelectedValue.ToString());

            bool adminRole = Convert.ToBoolean(0);

            R.insertRegisterMember( registerTypeID,  gender,  yearOfBirth,  titleTH,  firstnameTH,  middleTH,  lastnameTH,  titleEN,  firstnameEN,  middleEN,  lastnameEN,  country,  email,  username,  password, adminRole);

            //Temp Display Code 
            //ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "alertMessage", "alert('"+ yearOfBirth + " - " + registerTypeID + " - " + gender + " - " + country + " - " + adminRole + " - " + titleTH + " - " + firstnameTH + " - " + middleTH + " - " + lastnameTH + " - " + titleEN + " - " + " - " + firstnameEN + " - " + middleEN + " - " + lastnameEN + " - " + countryID + email + " - " + username + " - " + password + " - "  + "')", true);

            //Setting Front to Empty field
            //this.titleTH.Text = string.Empty;
            //this.firstnameTH.Text = string.Empty;
            //this.middleTH.Text = string.Empty;
            //this.lastnameTH.Text = string.Empty;
            //this.titleEN.Text = string.Empty;
            //this.firstnameEN.Text = string.Empty;
            //this.middleEN.Text = string.Empty;
            //this.lastnameEN.Text = string.Empty;
            //this.email.Text = string.Empty;
            //this.username.Text = string.Empty;
            //this.password.Text = string.Empty; 

            //bindDDLCountry();
            //ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "alertMessage", "alert('add courses success')", true);
        }

        private void bindDDLCountry(String lang)
        {
            countryID.DataSource = R.getCountryList(lang);
            countryID.DataTextField = "country";
            countryID.DataValueField = "countryID";
            countryID.DataBind();

            countryID.Items.Insert(0, new ListItem("  ", ""));
        }

        private void bindDDLRegisterType(String lang)
        {
            ddRegisterType.DataSource = R.getRegisterType(lang);
            ddRegisterType.DataTextField = "registerType";
            ddRegisterType.DataValueField = "registerTypeID";
            ddRegisterType.DataBind();

            ddRegisterType.Items.Insert(0, new ListItem("  ", ""));
        }

        private void bindDDLGender(String lang)
        {
            ddGender.DataSource = R.getGender(lang);
            ddGender.DataTextField = "gender";
            ddGender.DataValueField = "genderID";
            ddGender.DataBind();

            ddGender.Items.Insert(0, new ListItem(" ", ""));
        }
        
        private void bindDDLBirth()
        {

            DateTime theDate = DateTime.Now;
            int currentYear = theDate.Year;

            ddByear.Items.Insert(0, new ListItem(" ", ""));

            for (int i = currentYear - 70; i < currentYear - 12; i++) {
                ddByear.Items.Insert(1, new ListItem(i.ToString(), i.ToString()));
            }

        }

        private void bindDDLTitle()
        {
            title_EN.DataSource = R.getTitle("E");
            title_EN.DataTextField = "title";
            title_EN.DataValueField = "titleID";
            title_EN.DataBind();
            title_EN.Items.Insert(0, new ListItem(" ", ""));

            title_TH.DataSource = R.getTitle("T");
            title_TH.DataTextField = "title";
            title_TH.DataValueField = "titleID";
            title_TH.DataBind();
            title_TH.Items.Insert(0, new ListItem(" ", ""));
        }

       
    }
}