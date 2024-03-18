using ICTAcademy.DS.AuthenticationDSTableAdapters;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace ICTAcademy.CS
{
    public class AuthenticationCS
    {
        
        private SP_Select_RegisterAccountPasswordTableAdapter userAccount = null;
        protected SP_Select_RegisterAccountPasswordTableAdapter userAccountADT
        {
            get
            {
                if (userAccount == null) userAccount = new SP_Select_RegisterAccountPasswordTableAdapter();
                return userAccount;
            }
        }

        public DataTable getUserAccount(string username, string password)
        {
            return userAccountADT.GetData(username, password);
        }



    }
}