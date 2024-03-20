<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ResetPassword.aspx.cs" Inherits="ICTAcademy.ResetPassword" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ICT Academy</title>
    <link rel="shortcut icon" href="Assets/Images/logo-small.png" />
    <link rel="apple-touch-icon" href="Assets/Images/logo-small.png" />
    <link href="Content/bootstrap.min.css" rel="stylesheet" />
    <link href="Content/font-awesome.css" rel="stylesheet" />
    <style>
        body, html {
            height: 100%;
        }
    </style>
</head>
<body>
    <form runat="server">
        <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
        <div class="d-flex align-items-center justify-content-center pt-5" style="height: 100%;">
            <div class="col-md-4 col-lg-3 col-sm-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="text-center">Reset password</h3>
                    </div>
                    <div class="card-body">
                        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
                            <ContentTemplate>
                                <asp:MultiView runat="server" ID="mv">

                                    <asp:View ID="viewDefaultForm" runat="server">

                                        <div class="alert alert-danger" role="alert" runat="server" id="divErrorLogin" visible="false">
                                            Invalid login, please try again
                                        </div>
                                        <div class="mb-3">
                                            <label for="password" class="form-label">Password</label>
                                            <div class="input-group">
                                                <asp:TextBox runat="server" ID="tbPassword" CssClass="form-control" TextMode="Password" />
                                                <button class="btn btn-outline-secondary" type="button" id="togglePassword"><i class="fa fa-eye-slash"></i></button>
                                            </div>
                                            <asp:RequiredFieldValidator runat="server" ID="ReqPassword" ControlToValidate="tbPassword" ErrorMessage="*required" CssClass="text-danger small"></asp:RequiredFieldValidator>
                                        </div>
                                        <div class="mb-3">
                                            <label for="password" class="form-label">Confirm Password</label>
                                            <div class="input-group">
                                                <asp:TextBox runat="server" ID="tbConfirmPassword" CssClass="form-control" TextMode="Password" />
                                                <button class="btn btn-outline-secondary" type="button" id="toggleConfirmPassword"><i class="fa fa-eye-slash"></i></button>
                                            </div>
                                            <asp:CompareValidator ID="cmpPassword" runat="server" ControlToValidate="tbPassword" ControlToCompare="tbConfirmPassword" ErrorMessage="* passwords do not match." CssClass="text-danger small" Display="Dynamic"></asp:CompareValidator>

                                        </div>

                                        <asp:Button runat="server" ID="btnSave" CssClass="btn btn-primary w-100 mb-3" Text="Save" OnClick="btnSave_Click" />

                                        <script>
                                            const togglePassword = document.getElementById('togglePassword');
                                            const password = document.getElementById('<%= tbPassword.ClientID %>');

                                            togglePassword.addEventListener('click', function () {
                                                const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
                                                password.setAttribute('type', type);
                                                this.querySelector('i').classList.toggle('fa-eye-slash');
                                                this.querySelector('i').classList.toggle('fa-eye');
                                            });

                                            const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
                                            const confirmPassword = document.getElementById('<%= tbConfirmPassword.ClientID %>');

                                            toggleConfirmPassword.addEventListener('click', function () {
                                                const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
                                                confirmPassword.setAttribute('type', type);
                                                this.querySelector('i').classList.toggle('fa-eye-slash');
                                                this.querySelector('i').classList.toggle('fa-eye');
                                            });
                                        </script>

                                    </asp:View>

                                    <asp:View ID="viewInvalidToken" runat="server">
                                        <div class="alert alert-danger" role="alert">
                                            Your request to reset your password is invalid or has expired.
                                        </div>
                                    </asp:View>

                                    <asp:View ID="viewResetSuccess" runat="server">
                                        <div class="alert alert-success d-flex align-items-center" role="alert">
                                            
                                            <div>
                                                <i class="fa fa-check-circle fa-fw"></i> Reset password successfully, go to <asp:LinkButton runat="server" ID="btnGotoLogin" OnClick="btnGotoLogin_Click" >login</asp:LinkButton> page.
                                            </div>
                                        </div>
                                    </asp:View>

                                </asp:MultiView>

                            </ContentTemplate>

                        </asp:UpdatePanel>
                    </div>
                </div>

            </div>
        </div>



        <script src="Scripts/bootstrap.min.js"></script>


    </form>
</body>
</html>
