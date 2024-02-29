using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ICTAcademy
{
    public partial class test_authen : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected async Task btnLogin_ClickAsync()
        {
            string sessionData = "{ \"userId\": 123, \"username\": \"john_doe\" }";

            // Send data to PHP application
            using (HttpClient client = new HttpClient())
            {
                var content = new StringContent(sessionData, Encoding.UTF8, "application/json");
                HttpResponseMessage response = await client.PostAsync("http://placement.ict.mahidol.ac.th/login/index.php", content);
                response.EnsureSuccessStatusCode();
                Response.Redirect("http://placement.ict.mahidol.ac.th/login/index.php");
            }
        }

        protected void btnLogin_Click(object sender, EventArgs e)
        {
            btnLogin_ClickAsync();
        }
    }
}