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
    public partial class TicketManagement : System.Web.UI.Page
    {
        TicketCS T = new TicketCS();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                bindFilter();
                getResult();
            }
        }

        private void bindFilter()
        {
            bindDDLCourse();
            bindDDLStatus();
        }

        private void bindDDLCourse()
        {
            DataTable dt = T.getCourseList();
            ddlCourse.DataSource = dt;
            ddlCourse.DataTextField = "CourseName";
            ddlCourse.DataValueField = "CourseID";
            ddlCourse.DataBind();

            ddlCourse.Items.Insert(0, new ListItem("--ทั้งหมด--", "0"));
            ddlCourse.SelectedIndex = 0;

        }
        private void bindDDLStatus()
        {
            DataTable dt = T.getStatusList();
            ddlStatus.DataSource = dt;
            ddlStatus.DataTextField = "dataTextFiled";
            ddlStatus.DataValueField = "dataValueField";
            ddlStatus.DataBind();
        }

        private void getResult()
        {
            int courseID = int.Parse(ddlCourse.SelectedValue.ToString());
            string startDate = tbStartDate.Text.ToString();
            string expireDate = tbExpireDate.Text.ToString();
            int status = int.Parse(ddlStatus.SelectedValue.ToString());

            DataTable dt = T.getTicketList(courseID, startDate, expireDate, status);
            rptResult.DataSource = dt;
            rptResult.DataBind();

            lbDataCout.Text = dt.Rows.Count.ToString();

            rowNoData.Visible = dt.Rows.Count == 0;


        }
        protected void btnSearch_Click(object sender, EventArgs e)
        {
            getResult();
        }

        protected void btnNewTicket_Click(object sender, EventArgs e)
        {
            lbModelEditTitle.Text = "สร้าง Ticket";

            ScriptManager.RegisterStartupScript(Page, GetType(), "OpenModal", "<script> openModal('modalEditTicket'); </script>", false);
        }

        protected void btnEditTicket_Command(object sender, CommandEventArgs e)
        {
            lbModelEditTitle.Text = "แก้ไข Ticket";

            ScriptManager.RegisterStartupScript(Page, GetType(), "OpenModal", "<script> openModal('modalEditTicket'); </script>", false);
        }

        protected void btnSaveTicket_Click(object sender, EventArgs e)
        {
            




            getResult();
            ScriptManager.RegisterStartupScript(Page, GetType(), "HideModal", "<script> hideModal('#modalEditTicket');</script>", false);
        }
    }
}