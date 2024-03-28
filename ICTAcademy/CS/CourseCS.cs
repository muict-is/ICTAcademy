using ICTAcademy.DS.CourseDSTableAdapters;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;

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


        //--------------------------------------------
        //private SP_Insert_CourseTableAdapter insertCourse = null;
        //protected SP_Insert_CourseTableAdapter insertCourseADT
        //{
        //    get
        //    {
        //        if (insertCourse == null) insertCourse = new SP_Insert_CourseTableAdapter();
        //        return insertCourse;
        //    }
        //}
        public void createCourse(int courseType, string courseCode, string courseNameTH, string courseNameEN, string createBy)
        {
            //insertCourseADT.InsertData(courseType, courseCode, courseNameTH, courseNameEN, createBy);
            courseListADT.InsertCourse(courseType, courseCode, courseNameTH, courseNameEN, createBy);
        }


        //------------------------------------------------
        private SP_Select_LearningStyleTableAdapter learningStyle = null;
        protected SP_Select_LearningStyleTableAdapter learningStyleADT
        {
            get
            {
                if (learningStyle == null) learningStyle = new SP_Select_LearningStyleTableAdapter();
                return learningStyle;
            }
        }
        public DataTable getLearningStyleList()
        {
            
            return learningStyleADT.GetData();
        }


        
        //------------------------------------------------
        private SP_Select_AllCourseTableAdapter courseAll = null;
        protected SP_Select_AllCourseTableAdapter courseAllADT
        {
            get
            {
                if (courseAll == null) courseAll = new SP_Select_AllCourseTableAdapter();
                return courseAll;
            }
        }
        public DataTable getCourseAllList()
        { 
            return courseAllADT.GetData();
        }


       
        //------------------------------------------------
        private SP_Select_CourseByIDTableAdapter courseByID = null;
        protected SP_Select_CourseByIDTableAdapter courseByIDADT
        {
            get
            {
                if (courseByID == null) courseByID = new SP_Select_CourseByIDTableAdapter();
                return courseByID;
            }
        }
        public DataTable getcourseByIDList(int courseID)
        {
            return courseByIDADT.GetCourseByID(courseID);
        }






        //------------------------------------------------ 
        private SP_Select_CourseInstructorTableAdapter Instruture = null;
        protected SP_Select_CourseInstructorTableAdapter InstrutureADT
        {
            get
            {
                if (Instruture == null) Instruture = new SP_Select_CourseInstructorTableAdapter();
                return Instruture;
            }
        }
        public DataTable GetInstructorsByCourseID(int courseDesID)
        {
            return InstrutureADT.GetInstructorsByCourseID(courseDesID);
        }

        //------------------------------------------------ 
        private SP_SELECT_TrCourseApplyTableAdapter CourseApply = null;
        protected SP_SELECT_TrCourseApplyTableAdapter CourseApplyADT
        {
            get
            {
                if (CourseApply == null) CourseApply = new SP_SELECT_TrCourseApplyTableAdapter();
                return CourseApply;
            }
        }
        public DataTable getCourseApplyList(string username)
        {
            return CourseApplyADT.GetCourseUserApply(username);
        }


        //------------------------------------------------ 
        private SP_Update_StatusApplyTableAdapter StatusApply = null;
        protected SP_Update_StatusApplyTableAdapter StatusApplyADT
        {
            get
            {
                if (StatusApply == null) StatusApply = new SP_Update_StatusApplyTableAdapter();
                return StatusApply;
            }
        }
        public DataTable getUpdateStatusApply(int applyStatusID, int courseApplyID)
        {
            return StatusApplyADT.GetUpdateStatusApply(applyStatusID, courseApplyID);
        }

        //------------------------------------------------ 
        private SP_Select_CategoryGroupTableAdapter CategoryGroup = null;
        protected SP_Select_CategoryGroupTableAdapter CategoryGroupADT
        {
            get
            {
                if (CategoryGroup == null) CategoryGroup = new SP_Select_CategoryGroupTableAdapter();
                return CategoryGroup;
            }
        }
        public DataTable getCategoryGroup()
        {
            return CategoryGroupADT.GetCategoryGroup();
        }

        //------------------------------------------------ 
        private SP_Select_CategoryIDTableAdapter CategoryGroupID = null;
        protected SP_Select_CategoryIDTableAdapter CategoryGroupIDADT
        {
            get
            {
                if (CategoryGroupID == null) CategoryGroupID = new SP_Select_CategoryIDTableAdapter();
                return CategoryGroupID;
            }
        } 
        public DataTable getCategoryGroup(int CategoryID)
        {
            return CategoryGroupIDADT.getCategoryByID(@CategoryID); 
        }


        //------------------------------------------------ 
        private SP_Select_CourseCategoryTableAdapter CourseByCategoryID = null;
        protected SP_Select_CourseCategoryTableAdapter CourseByCategoryIDADT
        {
            get
            {
                if (CourseByCategoryID == null) CourseByCategoryID = new SP_Select_CourseCategoryTableAdapter();
                return CourseByCategoryID;
            }
        }
        public DataTable getCourseByCategoryID(String Lang, int CategoryID)
        {

            return CourseByCategoryIDADT.GetDetailCourseCategory(Lang, CategoryID);
           
        }

        //------------------------------------------------ 
        private SP_Select_AllCategoryTableAdapter Category = null;
        protected SP_Select_AllCategoryTableAdapter CategoryADT
        {
            get
            {
                if (Category == null) Category = new SP_Select_AllCategoryTableAdapter();
                return Category;
            }
        }
        public DataTable getAllCategory(String Lang)
        {

            return CategoryADT.GetData(Lang);

        }

    }
}