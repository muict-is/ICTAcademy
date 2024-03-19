using ICTAcademy.CS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ICTAcademy
{
    public partial class ResetPassword : System.Web.UI.Page
    {
        AuthenticationCS A = new AuthenticationCS();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                // Check if the parameter exists in the URL
                if (Request.QueryString["token"] != null && A.getUserIDByToken(Request.QueryString["token"]) > 0)
                {
                    ViewState.Add("token", Request.QueryString["token"]);
                    mv.SetActiveView(viewDefaultForm);
                   
                    
                }
                else
                {
                    mv.SetActiveView(viewInvalidToken);
                }

            }
        }

       
        protected void btnSave_Click(object sender, EventArgs e)
        {
            string token = ViewState["token"].ToString();
            int userID = A.getUserIDByToken(token);

            if ( userID > 0)
            {
                string newPassword = tbPassword.Text;
                A.resetPassword(userID, token, newPassword);
            }
            else
            {
                divErrorLogin.Visible = true;
            }

        }
    }
}