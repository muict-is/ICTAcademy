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
        private SP_Select_CountryTableAdapter country = null;
        protected SP_Select_CountryTableAdapter countryADT
        {
            get
            {
                if (country == null) country = new SP_Select_CountryTableAdapter();
                return country;
            }
        }
        public DataTable getCountryList()
        {

            return countryADT.getCountry();
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

        //--------------------------------------------
        private SP_Update_TabMemberRegisterTableAdapter updateMember = null;
        protected SP_Update_TabMemberRegisterTableAdapter updateMemberADT
        {
            get
            {
                if (updateMember == null) updateMember = new SP_Update_TabMemberRegisterTableAdapter();
                return updateMember;
            }
        }
        public void updateRegisterMember(string titleTH, string firstnameTH, string middleTH, string lastnameTH, string titleEN, string firstnameEN, string middleEN, string lastnameEN, string email, string username)
        {
            updateMemberADT.UpdateDataMember(username, titleTH, firstnameTH, middleTH, lastnameTH, titleEN, firstnameEN, middleEN, lastnameEN, email); 
        }
         
        //--------------------------------------------
        private SP_Select_MemberTableAdapter getMember = null;
        protected SP_Select_MemberTableAdapter getMemberADT
        {
            get
            {
                if (getMember == null) getMember = new SP_Select_MemberTableAdapter();
                return getMember;
            }
        }
        public DataTable getMemberByUsername(string username)
        {
            return getMemberADT.GetMemberByUsername(username);
        }
    }

}