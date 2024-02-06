using ICTAcademy.DS.CourseDSTableAdapters;
using ICTAcademy.DS.RegisterDSTableAdapters;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace ICTAcademy.CS
{
    public class RegisterCS
    {
        //------------------------------------------------
        private SP_Select_MasCountryTableAdapter country = null;
        protected SP_Select_MasCountryTableAdapter countryADT
        {
            get
            {
                if (country == null) country = new SP_Select_MasCountryTableAdapter();
                return country;
            }
        }
        public DataTable getCountryList()
        {

            return countryADT.GetCountry();
        }


        //--------------------------------------------
        private SP_Insert_TabRegisterMemberAdapterTableAdapter insertMember = null;
        protected SP_Insert_TabRegisterMemberAdapterTableAdapter insertMemberADT
        {
            get
            {
                if (insertMember == null) insertMember = new SP_Insert_TabRegisterMemberAdapterTableAdapter();
                return insertMember;
            }
        }
        public void insertRegisterMember(string titleTH, string firstnameTH, string middleTH, string lastnameTH, string titleEN, string firstnameEN, string middleEN, string lastnameEN, int country, string email, string username, string password)
        {
            insertMemberADT.insertMember(titleTH, firstnameTH, middleTH, lastnameTH, titleEN, firstnameEN, middleEN, lastnameEN, country, email, username, password);
        }
    }

}