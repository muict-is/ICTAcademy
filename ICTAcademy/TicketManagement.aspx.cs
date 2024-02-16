using ICTAcademy.CS;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
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

            ScriptManager.RegisterStartupScript(Page, GetType(), "activeJS", "<script>activeJS()</script>", false);
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
        private void bindDDLCourseEdit(int courseID)
        {
            DataTable dt = T.getCourseList();
            ddlCourseEdit.DataSource = dt;
            ddlCourseEdit.DataTextField = "CourseName";
            ddlCourseEdit.DataValueField = "CourseID";
            ddlCourseEdit.DataBind();

            ddlCourseEdit.Items.Insert(0, new ListItem("--ทั้งหมด--", "0"));
            ddlCourseEdit.SelectedValue = courseID.ToString();

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

            string ticket = e.CommandArgument.ToString();
            DataTable dt = T.getTicketList(ticket);



            foreach (DataRow dr in dt.Rows)
            {
                bindDDLCourseEdit(int.Parse(dr["CourseID"].ToString()));

                tbTicketEdit.Text = dr["code"].ToString();
                tbStartDateEdit.Text = dr["startDate"].ToString().Length > 0 ? DateTime.Parse(dr["startDate"].ToString()).ToString("yyyy/MM/dd", CultureInfo.GetCultureInfo("en-US")) : "";
                tbExpireDateEdit.Text = dr["expireDate"].ToString();
                tbDiscountEdit.Text = dr["discount"].ToString();
                tbAmountEdit.Text = dr["limitCode"].ToString();
                lbUsedCode.Text = dr["usedCode"].ToString();

                int usedCode = int.Parse(dr["usedCode"].ToString());
                if (usedCode > 0 )
                {
                    ddlCourseEdit.Enabled = false;
                    tbStartDateEdit.Enabled = false;
                    tbDiscountEdit.Enabled = false;
                    divWarningEdit.Visible = true;
                }
                else
                {
                    ddlCourseEdit.Enabled = true;
                    tbStartDateEdit.Enabled = true;
                    tbDiscountEdit.Enabled = true;

                    divWarningEdit.Visible = false;
                }

                rvAmountEdit.MinimumValue = usedCode.ToString();
                rvAmountEdit.ErrorMessage = $"* ระบุค่า {usedCode} -  1,000";
            }

            ScriptManager.RegisterStartupScript(Page, GetType(), "OpenModal", "<script> openModal('modalEditTicket'); </script>", false);
        }

        protected void btnSaveTicket_Click(object sender, EventArgs e)
        {
            getResult();
            ScriptManager.RegisterStartupScript(Page, GetType(), "HideModal", "<script> hideModal('#modalEditTicket');</script>", false);
        }
    }
}