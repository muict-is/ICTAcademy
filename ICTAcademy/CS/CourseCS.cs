﻿using ICTAcademy.DS.CourseDSTableAdapters;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace ICTAcademy.CS
{
    public class CourseCS
    {
        private TabCourseTableAdapter courseList = null;
        protected TabCourseTableAdapter courseListADT
        {
            get
            {
                if (courseList == null) courseList = new TabCourseTableAdapter();
                return courseList;
            }
        }
        public DataTable getCourseList()
        {
            return courseListADT.GetData();
        }
        public DataTable getCoursListSample()
        {
            DataTable dt = new DataTable();

            dt.Columns.Add("CourseName", typeof(string));
            dt.Columns.Add("CourseCategory", typeof(string));
            dt.Columns.Add("Price", typeof(decimal));
            dt.Columns.Add("CourseNote", typeof(string));

            dt.Rows.Add(new object[] { "Intro to DataScience", "Data Science", 3500, "" });
            dt.Rows.Add(new object[] { "Web Pentest", "Cyber Security", 4200, "recomened for web developer" });
            dt.Rows.Add(new object[] { "Machine learning for Image Processing", "credit bank", 4200, "" });


            return dt;
        }
    }
}