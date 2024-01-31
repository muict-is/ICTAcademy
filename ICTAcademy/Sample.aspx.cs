using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ICTAcademy
{
    public partial class Sample : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                DataTable dt = getDTStudent();
                bindRPTStudent(dt);
            }

        }

        private void bindRPTStudent(DataTable dt)
        {
            ViewState.Add("DTStudent", dt);

            rptFormStudent.DataSource = dt;
            rptFormStudent.DataBind();

            


        }

        protected void rptFormStudent_ItemDataBound(object sender, RepeaterItemEventArgs e)
        {
            if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
            {
               
                int itemIdx = e.Item.ItemIndex;
                DataTable dt = getDTStudent();
                


                RepeaterItem item = e.Item;
                
                TextBox tbStudent = (TextBox)item.FindControl("tbStudentID");
                DropDownList ddlYear = (DropDownList)item.FindControl("ddlYear");

                tbStudent.Text = dt.Rows[itemIdx]["StudentID"].ToString();

                ddlYear.DataSource = getYearList();
                ddlYear.DataTextField = "YearText";
                ddlYear.DataValueField = "YearValue";
                ddlYear.DataBind();
                ddlYear.Items.Insert(0, new ListItem("-select-", "0"));
                ddlYear.SelectedValue = dt.Rows[itemIdx]["StudentYear"].ToString();



            }
        }

        private DataTable getDTStudent()
        {
            if (ViewState["DTStudent"] != null) return (DataTable)ViewState["DTStudent"];
            
            
            //--- mock empty data table
            DataTable dt = new DataTable();

            dt.Columns.Add("StudentID", typeof(string));
            dt.Columns.Add("StudentYear", typeof(int));

            dt.Rows.Add(new Object[] { string.Empty, 0 });
            return dt;
                
        }

        private DataTable getYearList()
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("YearText", typeof(string));
            dt.Columns.Add("YearValue", typeof(int));

            for (int i = 1; i <= 4; i++) dt.Rows.Add(new Object[] { $"Year:{i}", i });

            return dt;

        }


        protected void btnAdd_Click(object sender, EventArgs e)
        {
            ViewState["DTStudent"] = null;
            DataTable dt = getDTStudent();

            dt.Rows.RemoveAt(0);
            foreach (RepeaterItem item in rptFormStudent.Items)
            {
                TextBox tbStudent = (TextBox)item.FindControl("tbStudentID");
                DropDownList ddlYear = (DropDownList)item.FindControl("ddlYear");

                dt.Rows.Add(new object[] { tbStudent.Text, ddlYear.SelectedValue.ToString() });
            }

            dt.Rows.Add(new object[] { string.Empty, 0 });

            bindRPTStudent(dt);
        }

        protected void btnbSave_Click(object sender, EventArgs e)
        {
            log.Text = "<p> Result </p>";
            log.Text += "<ul>";
            foreach(RepeaterItem item in rptFormStudent.Items)
            {
                TextBox tbStudent = (TextBox)item.FindControl("tbStudentID");
                DropDownList ddlYear = (DropDownList)item.FindControl("ddlYear");

                log.Text += $"<li> ID : {tbStudent.Text} , Year : {ddlYear.SelectedValue}";
            }
            log.Text += "</ul>";
        }

        
    }
}