using ICTAcademy.DS.TicketDSTableAdapters;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace ICTAcademy.CS
{
    public class TicketCS
    {
        private SP_Select_CodeDiscountTableAdapter selTicket = null;
        protected SP_Select_CodeDiscountTableAdapter selTicketADT
        {
            get
            {
                if (selTicket == null) selTicket = new SP_Select_CodeDiscountTableAdapter();
                return selTicket;
            }
        }
        public DataTable getTicketList(string ticket)
        {
            return getTicketList(ticket, 0, null, null, 1);
        }
        public DataTable getTicketList( int courseID, string startDate, string expireDate, int status)
        {
            return getTicketList(null, courseID, startDate, expireDate, status);
        }
        public DataTable getTicketList(string code, int courseID, string startDate, string expireDate, int status)
        {
            
            return selTicketADT.GetData(code, courseID, startDate, expireDate, status);
        }


        private SP_Insert_CodeDiscountTableAdapter insTicket = null;
        protected SP_Insert_CodeDiscountTableAdapter insTicketADT
        {
            get
            {
                if (insTicket == null) insTicket = new SP_Insert_CodeDiscountTableAdapter();
                return insTicket;
            }
        }
        public void createNewTicket(string ticket, int courseID, int discount, string startDate, string expireDate, int limitCode, string createBy )
        {
            insTicketADT.InsertData(ticket, courseID, discount, DateTime.Parse(startDate), DateTime.Parse(expireDate), limitCode, createBy);
        }

        private SP_Update_CodeDiscountTableAdapter updTicket = null;
        protected SP_Update_CodeDiscountTableAdapter updTicketADT
        {
            get
            {
                if (updTicket == null) updTicket = new SP_Update_CodeDiscountTableAdapter();
                return updTicket;
            }
        }
        public void updateTicketDetail(int ticketID, int courseID, int discount, string startDate, string expireDate, int limitCode, int status, string updateby)
        {
            updTicketADT.UpdateData(ticketID, courseID, discount, startDate, expireDate, limitCode, status, updateby);
        }

        private SP_Update_CodeDiscountUsedCodeTableAdapter updTicketUsedCode = null;
        protected SP_Update_CodeDiscountUsedCodeTableAdapter updTicketUsedCodeADT
        {
            get
            {
                if (updTicketUsedCode == null) updTicketUsedCode = new SP_Update_CodeDiscountUsedCodeTableAdapter();
                return updTicketUsedCode;
            }
        }
        public bool useTicket(string ticket, int courseID)
        {
            DataTable dt = updTicketUsedCodeADT.UpdateData(ticket, courseID);
            foreach(DataRow dr in dt.Rows)
            {
                if ((int)dr["canAdd"] == 1) return true;
            }

            return false;
        }


        private SP_Select_AllCourseTableAdapter selCourse = null;
        protected SP_Select_AllCourseTableAdapter selCourseADT
        {
            get
            {
                if (selCourse == null) selCourse = new SP_Select_AllCourseTableAdapter();
                return selCourse;
            }
        }
        public DataTable getCourseList ()
        {
            DataTable dt = selCourseADT.GetData();
            dt.Columns.Add("CourseName", typeof(string));
            foreach(DataRow dr in dt.Rows)
            {
                dr["CourseName"] = $"{dr["courseCode"]} {dr["courseNameTH"]} / {dr["courseNameEN"]}";
            }

            return dt;
        }

        public DataTable getStatusList()
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("dataTextFiled", typeof(string));
            dt.Columns.Add("dataValueField", typeof(int));
            //dt.Rows.Add(new Object[] { "--ทั้งหมด--", -1 });
            dt.Rows.Add(new Object[] { "ใช้งาน", 1 });
            dt.Rows.Add(new Object[] { "ยกเลิกใช้งาน", 0 });


            return dt;
        }
    }
}