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
            username = username.Trim().ToLower();
            password = password.Trim();

            return userAccountADT.GetData(username, password);
        }

        private SP_Insert_RequestResetPasswordTableAdapter reqReset = null;
        protected SP_Insert_RequestResetPasswordTableAdapter reqResetADT
        {
            get
            {
                if (reqReset == null) reqReset = new SP_Insert_RequestResetPasswordTableAdapter();
                return reqReset;
            }
        }
        public string getTokenForResetPassword(string username)
        {
            string token = string.Empty;
            DataTable dt = reqResetADT.GetData(username);
            foreach (DataRow dr in dt.Rows) token = dr["token"].ToString();

            return token;
        }


        private SP_Select_ResetPasswordTokenInfoTableAdapter tokenInfo = null;
        protected SP_Select_ResetPasswordTokenInfoTableAdapter tokenInfoADT
        {
            get
            {
                if (tokenInfo == null) tokenInfo = new SP_Select_ResetPasswordTokenInfoTableAdapter();
                return tokenInfo;
            }
        }
        public int getUserIDByToken(string token)
        {
            int userID = 0;
            DataTable dt = tokenInfoADT.GetData(token);
            foreach (DataRow dr in dt.Rows) userID = int.Parse(dr["userID"].ToString());

            return userID;
        }

        private SP_Update_UsedResetPasswordTableAdapter usedToken = null;
        protected SP_Update_UsedResetPasswordTableAdapter usedTokenADT
        {
            get
            {
                if (usedToken == null) usedToken = new SP_Update_UsedResetPasswordTableAdapter();
                return usedToken;
            }
        }

        private void updateUsedToken(string token)
        {
            usedTokenADT.UpdateData(token);
        }


        private SP_Insert_RegisterAccountPasswordResetTableAdapter insertResetPassword = null;
        protected SP_Insert_RegisterAccountPasswordResetTableAdapter insertResetPasswordADT
        {
            get
            {
                if (insertResetPassword == null) insertResetPassword = new SP_Insert_RegisterAccountPasswordResetTableAdapter();
                return insertResetPassword;
            }
        }
        public void resetPassword(int userID, string token, string newPassword)
        {
            newPassword = newPassword.Trim();

            insertResetPasswordADT.InsertData(userID, newPassword);

            updateUsedToken(token);

        }
    }
}