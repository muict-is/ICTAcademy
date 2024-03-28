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
        public DataTable getCountryList(String lang)
        {

            return countryADT.getCountry(lang);
        }


        //------------------------------------------------
        private SP_Select_RegisterTypeTableAdapter RegisterType = null;
        protected SP_Select_RegisterTypeTableAdapter RegisterTypeADT
        {
            get
            {
                if (RegisterType == null) RegisterType = new SP_Select_RegisterTypeTableAdapter();
                return RegisterType;
            }
        }
        public DataTable getRegisterType(String lang)
        {

            return RegisterTypeADT.GetData(lang);
        }

        //------------------------------------------------
        private SP_Select_GenderTableAdapter Gender = null;
        protected SP_Select_GenderTableAdapter GenderADT
        {
            get
            {
                if (Gender == null) Gender = new SP_Select_GenderTableAdapter();
                return Gender;
            }
        }
        public DataTable getGender(String lang)
        {             
            return GenderADT.GetData(lang);
        }

        //------------------------------------------------
        private SP_Select_TitleTableAdapter Title = null;
        protected SP_Select_TitleTableAdapter TitleADT
        {
            get
            {
                if (Title == null) Title = new SP_Select_TitleTableAdapter();
                return Title;
            }
        }
        public DataTable getTitle(String lang)
        {
            return TitleADT.GetData(lang);
        }


        //--------------------------------------------
        private SP_Insert_RegisterMemberAdapterTableAdapter insertMember = null;
        protected SP_Insert_RegisterMemberAdapterTableAdapter insertMemberADT
        {
            get
            {
                if (insertMember == null) insertMember = new SP_Insert_RegisterMemberAdapterTableAdapter();
                return insertMember;
            }
        }
        public void insertRegisterMember(int registerTypeID, int gender, string yearOfBirth, int titleTH, string firstnameTH, string middleTH, string lastnameTH, int titleEN, string firstnameEN, string middleEN, string lastnameEN, int country, string email, string username, string password, bool adminRole)
        {
            insertMemberADT.insertMember(registerTypeID, gender, yearOfBirth, titleTH, firstnameTH, middleTH, lastnameTH, titleEN, firstnameEN, middleEN, lastnameEN, country, email, username, password, adminRole); 
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