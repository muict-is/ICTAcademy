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
    <form runat="server">
        <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
        <div class="d-flex align-items-center justify-content-center pt-5" style="height: 100%;">
            <div class="col-md-4 col-lg-3 col-sm-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="text-center">Login</h3>
                    </div>
                    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
                        <ContentTemplate>
                            <div class="card-body">

                                <div class="alert alert-danger" role="alert" runat="server" id="divErrorLogin" visible="false">
                                    Invalid login, please try again
                                </div>

                                <div class="mb-3">
                                    <label for="username" class="form-label">Email</label>
                                    <asp:TextBox runat="server" ID="tbUsername" CssClass="form-control" />
                                    <asp:RequiredFieldValidator runat="server" ID="ReqUsername" ControlToValidate="tbUsername" ErrorMessage="*required" CssClass="text-danger small" ValidationGroup="groupLogin"></asp:RequiredFieldValidator>
                                    <asp:RegularExpressionValidator runat="server" ID="RegUsername" ControlToValidate="tbUsername" ErrorMessage="* Invalid email format." ValidationGroup="groupLogin" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" CssClass="text-danger small"></asp:RegularExpressionValidator>
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <div class="input-group">
                                        <asp:TextBox runat="server" ID="tbPassword" CssClass="form-control" TextMode="Password" />
                                        <button class="btn btn-outline-secondary" type="button" id="togglePassword"><i class="fa fa-eye"></i></button>
                                    </div>
                                    <asp:RequiredFieldValidator runat="server" ID="ReqPassword" ControlToValidate="tbPassword" ErrorMessage="*required" CssClass="text-danger small"></asp:RequiredFieldValidator>
                                </div>

                                <asp:Button runat="server" ID="btnLogin" CssClass="btn btn-primary w-100 mb-3" Text="Login" OnClick="btnLogin_Click" ValidationGroup="groupLogin" />
                                <asp:LinkButton runat="server" ID="btnForgetPassword" CssClass="ms-2" OnClick="btnForgetPassword_Click" CausesValidation="false">Forgot password?</asp:LinkButton>

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

                            </div>
                        </ContentTemplate>

                    </asp:UpdatePanel>
                </div>

            </div>
        </div>

        <!-- Modal for reset password -->
        <div class="modal modal-blur fade" id="modalConfirmCreateDoc" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <asp:UpdatePanel ID="UpdatePanel2" runat="server">
                        <ContentTemplate>
                            <div class="modal-header">
                                <h5 class="modal-title text-capitalize">Forget password ?</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="alert alert-primary" role="alert" runat="server" id="divSuccessReset" visible="false">
                                    Instructions to reset your password have been sent to your email.
                                </div>
                                <div class="alert alert-danger" role="alert" runat="server" id="divErrorReset" visible="false">
                                    Apologies, but it appears that there is no record of your email in our system. Could you please verify and try again?
                                </div>

                                <div class="mb-3">
                                    <label for="email" class="form-label">Email</label>
                                    <asp:TextBox runat="server" ID="tbUsernameForgetPassword" CssClass="form-control" />
                                    <asp:RequiredFieldValidator runat="server" ID="ReqUsernameForgetPassword" ControlToValidate="tbUsernameForgetPassword" ErrorMessage="*required" CssClass="text-danger small" ValidationGroup="groupReset"></asp:RequiredFieldValidator>
                                    <asp:RegularExpressionValidator runat="server" ID="RegUsernameForgetPassword" ControlToValidate="tbUsernameForgetPassword" ErrorMessage="* Invalid email format." ValidationGroup="groupReset" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" CssClass="text-danger small"></asp:RegularExpressionValidator>
                                </div>
                                <asp:LinkButton runat="server" ID="btnRequestResetPassword" CssClass="btn btn-primary" OnClick="btnRequestResetPassword_Click" ValidationGroup="groupReset">Reset Password</asp:LinkButton>
                                <a href="#" class="d-block mt-3" data-bs-dismiss="modal">Back to Login</a>
                            </div>
                        </ContentTemplate>
                    </asp:UpdatePanel>

                </div>
            </div>
        </div>




        <script src="Scripts/bootstrap.min.js"></script>
        <script>
            function openModal(modalID) {
                var Modal = new bootstrap.Modal(document.getElementById(modalID));
                Modal.show();
            }

            function hideModal(modalID) {

                var modal = new bootstrap.Modal(modalID);
                document.addEventListener('closeModal', () => {
                    modal.hide();
                });
                $('body').removeClass('modal-open');
                $('body').css('overflow', '');
                $('body').css('padding-right', '');
                $('.modal-backdrop').remove();

            }
        </script>

    </form>


</body>
</html>
