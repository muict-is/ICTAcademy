<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Authentication.aspx.cs" Inherits="ICTAcademy.Authentication" %>

<!DOCTYPE html>
<html lang="en">
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

    <div class="d-flex align-items-center justify-content-center" style="height: 100%;">
        <div class="col-md-4 col-lg-3 col-sm-12">
            <div class="card">
                <div class="card-header">
                    <h3 class="text-center">Login</h3>
                </div>
                <div class="card-body">
                    <form runat="server">
                        <div class="alert alert-danger" role="alert" runat="server" id="divError" visible="false">
                            Invalid login, please try again
                        </div>

                        <div class="mb-3">
                            <label for="username" class="form-label">Email</label>
                            <asp:TextBox runat="server" ID="tbUsername" CssClass="form-control" />
                            <asp:RequiredFieldValidator runat="server" ID="ReqUsername" ControlToValidate="tbUsername" ErrorMessage="*required" CssClass="text-danger small"></asp:RequiredFieldValidator>
                            <asp:RegularExpressionValidator runat="server" ID="RegUsername" ControlToValidate="tbUsername" ErrorMessage="* Invalid email format." ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" CssClass="text-danger small"></asp:RegularExpressionValidator>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <div class="input-group">
                                <asp:TextBox runat="server" ID="tbPassword" CssClass="form-control" TextMode="Password" />
                                <button class="btn btn-outline-secondary" type="button" id="togglePassword">
                                    <i class="fa fa-eye"></i>
                                </button>
                            </div>
                            <asp:RequiredFieldValidator runat="server" ID="ReqPassword" ControlToValidate="tbPassword" ErrorMessage="*required" CssClass="text-danger small"></asp:RequiredFieldValidator>
                        </div>
                        
                        <asp:Button runat="server" ID="btnLogin" CssClass="btn btn-primary w-100" Text="Login" OnClick="btnLogin_Click" />
                        <asp:LinkButton runat="server" ID="btnForgetPassword" CssClass="ms-2" OnClick="btnForgetPassword_Click">Forgot password?</asp:LinkButton>

                        <script>
                            const togglePassword = document.getElementById('togglePassword');
                            const password = document.getElementById('<%= tbPassword.ClientID %>');

                            togglePassword.addEventListener('click', function () {
                                const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
                                password.setAttribute('type', type);
                                this.querySelector('i').classList.toggle('fa-eye');
                                this.querySelector('i').classList.toggle('fa-eye-slash');
                            });
                        </script>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="Scripts/bootstrap.min.js"></script>


</body>
</html>
