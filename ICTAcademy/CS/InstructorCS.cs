using ICTAcademy.DS.InstructorDSTableAdapters;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace ICTAcademy.CS
{
    public class InstructorCS
    {
        private TabCourseInstrutureTableAdapter InstructorList = null;
        protected TabCourseInstrutureTableAdapter InstructorADT
        {
            get
            {
                if (InstructorList == null) InstructorList = new TabCourseInstrutureTableAdapter();
                return InstructorList;
            }
        }

        public DataTable getInstructorData()
        {
            return InstructorADT.GetData();
        }


    }
}