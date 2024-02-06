<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="register.aspx.cs" Inherits="ICTAcademy.register" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <style>
        .rfv {
            padding-left: 10px;
            color: Blue;
            font-size: x-small;
            font-family: Verdana, Tahoma, Arial;
            font-weight: lighter;
        }
    </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
        <ContentTemplate>
            <section class="vh-100 gradient-custom" id="DivUsername">
                <div class="container py-5 h-20">
                    <div class="row d-flex justify-content-center align-items-center h-50">
                        <div class="col-12 col-md-10 col-lg-1 col-xl-10">
                            <h2>User Registration</h2>
                            <div class="card " style="border-radius: 1rem;">

                                <div class="card-body p-5 ">

                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="row mb-3">
                                                <div class="col-sm-3">
                                                    <asp:Label for="titleTH" runat="server" Text="Label" class="form-label ">Title (TH)</asp:Label>
                                                    <asp:DropDownList ID="titleTH" runat="server" CssClass="form-select">
                                                        <asp:ListItem Value="0" Text=""></asp:ListItem>
                                                        <asp:ListItem Value="นาย" Text="นาย" />
                                                        <asp:ListItem Value="นางสาว" Text="นางสาว" />
                                                        <asp:ListItem Value="นาง" Text="นาง" />
                                                    </asp:DropDownList>
                                                    <asp:RequiredFieldValidator CssClass="rfv" ID="RequiredFieldValidator2" runat="server" ErrorMessage="Please provide a valid Title (TH) ." ControlToValidate="titleTH" ForeColor="Red" Display="Dynamic"></asp:RequiredFieldValidator>
                                                </div>
                                                <div class="col-sm-3 ">
                                                    <asp:Label for="firstnameTH" runat="server" Text="Label" class="form-label ">First Name (TH)  </asp:Label>
                                                    <asp:TextBox ID="firstnameTH" CssClass="form-control" runat="server" placeholder=""></asp:TextBox>
                                                     <asp:RequiredFieldValidator CssClass="rfv" ID="RequiredFieldValidator3" runat="server" ErrorMessage="Please provide a valid First Name (TH) ." ControlToValidate="firstnameTH" ForeColor="Red" Display="Dynamic"></asp:RequiredFieldValidator>
                                                </div>

                                                <div class="col-sm-3 ">
                                                    <asp:Label for="middleTH" runat="server" Text="Label" class="form-label ">Middle name (TH)  </asp:Label>
                                                    <asp:TextBox ID="middleTH" CssClass="form-control" runat="server" placeholder=""></asp:TextBox>
                                                </div>
                                                <div class="col-sm-3 ">
                                                    <asp:Label for="lastnameTH" runat="server" Text="Label" class="form-label">Last Name (TH)  </asp:Label>
                                                    <asp:TextBox ID="lastnameTH" CssClass="form-control" runat="server" placeholder=""></asp:TextBox>
                                                    <asp:RequiredFieldValidator CssClass="rfv" ID="RequiredFieldValidator4" runat="server" ErrorMessage="Please provide a valid Last Name (TH) ." ControlToValidate="firstnameTH" ForeColor="Red" Display="Dynamic"></asp:RequiredFieldValidator>
                                             
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="row mb-3">
                                                <div class="col-sm-3">
                                                    <asp:Label for="titleEN" runat="server" Text="Label" class="form-label">Title(EN)</asp:Label>
                                                    <asp:DropDownList ID="titleEN" runat="server" CssClass="form-select">
                                                        <asp:ListItem Value="0" Text=""></asp:ListItem>
                                                        <asp:ListItem Value="Mr." Text="Mr." />
                                                        <asp:ListItem Value="Mrs." Text="Mrs." />
                                                        <asp:ListItem Value="Miss" Text="Miss" />
                                                        <asp:ListItem Value="Ms." Text="Ms." />
                                                    </asp:DropDownList>
                                                     <asp:RequiredFieldValidator CssClass="rfv" ID="RequiredFieldValidator5" Display="Dynamic" runat="server" ErrorMessage="Please provide a valid Title Name (TH) ." ControlToValidate="titleEN" ForeColor="Red"></asp:RequiredFieldValidator>
                                             
                                                </div>
                                                <div class="col-sm-3 ">
                                                    <asp:Label for="firstnameEN" runat="server" Text="Label" class="form-label">First Name (EN)  </asp:Label>
                                                    <asp:TextBox ID="firstnameEN" CssClass="form-control" runat="server" placeholder=""></asp:TextBox>
                                                    <asp:RequiredFieldValidator CssClass="rfv" ID="RequiredFieldValidator1" runat="server" Display="Dynamic" ErrorMessage="Please provide a valid First Name (EN) ." ControlToValidate="firstnameEN" ForeColor="Red"></asp:RequiredFieldValidator>
                                                </div>
                                                <div class="col-sm-3 ">
                                                    <asp:Label for="middleEN" runat="server" Text="Label" class="form-label">Middle Name (EN)  </asp:Label>
                                                    <asp:TextBox ID="middleEN" CssClass="form-control" runat="server" placeholder=""></asp:TextBox>
                                                </div>
                                                <div class="col-sm-3 ">
                                                    <asp:Label for="lastnameEN" runat="server" Text="Label" class="form-label">Last Name (EN)  </asp:Label>
                                                    <asp:TextBox ID="lastnameEN" CssClass="form-control" runat="server" placeholder=""></asp:TextBox>
                                                     <asp:RequiredFieldValidator CssClass="rfv" ID="RequiredFieldValidator6" runat="server" Display="Dynamic" ErrorMessage="Please provide a valid Last Name (TH) ." ControlToValidate="lastnameEN" ForeColor="Red"></asp:RequiredFieldValidator>
                                             
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <asp:Label for="countryID" runat="server" Text="Label" class="form-label">Country</asp:Label>
                                                    <asp:DropDownList ID="countryID" runat="server" CssClass="form-select"></asp:DropDownList>
                                                     <asp:RequiredFieldValidator CssClass="rfv" ID="RequiredFieldValidator7"  Display="Dynamic" runat="server" ErrorMessage="Please provide a valid Country ." ControlToValidate="countryID" ForeColor="Red"></asp:RequiredFieldValidator>
                                             
                                                </div>
                                                <div class="col-sm-6">
                                                    <asp:Label for="email" runat="server" Text="Label" class="form-label">Email  </asp:Label>
                                                    <asp:TextBox ID="email" CssClass="form-control" runat="server" TextMode="Email"  placeholder="name@example.com"></asp:TextBox>
                                                    <asp:RequiredFieldValidator CssClass="rfv" ID="RequiredFieldValidator8" runat="server" Display="Dynamic" ErrorMessage="Please provide a valid Email ." ControlToValidate="email" ForeColor="Red"></asp:RequiredFieldValidator>
                                             
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <br>
                                    <hr>
                                    <br>
                                    <div class="row">
                                        <div class="col-sm-4 ">
                                            <asp:Label for="username" runat="server" Text="Label" class="form-label">Username  </asp:Label>
                                            <asp:TextBox ID="username" CssClass="form-control" runat="server" placeholder=""></asp:TextBox>
                                        </div>
                                        <div class="col-sm-4 ">
                                            <asp:Label for="password" runat="server" Text="Label" class="form-label">Password  </asp:Label>
                                            <asp:TextBox ID="password" CssClass="form-control" runat="server" placeholder="" TextMode="Password"></asp:TextBox>
                                            <asp:RequiredFieldValidator runat="server" ControlToValidate="password"
                                                ErrorMessage="Password is required." ForeColor="Red" Display="Dynamic">
                                            </asp:RequiredFieldValidator>
                                        </div>
                                        <div class="col-sm-4 "> 
                                            <asp:Label for="ConfirmPassword" runat="server" Text="Label" class="form-label">Confirm Password  </asp:Label>
                                            <asp:TextBox ID="ConfirmPassword" CssClass="form-control" runat="server" placeholder="" TextMode="Password" onKeyUp="validateForm()"></asp:TextBox>
                                            <asp:CompareValidator runat="server" ControlToCompare="password" ControlToValidate="ConfirmPassword"
                                                ErrorMessage="Passwords do not match." ForeColor="Red" Display="Dynamic">
                                            </asp:CompareValidator>
                                        </div>
                                    </div>
                                    <div id="message"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="text-center">
                        <br>
                        <%--<asp:LinkButton runat="server" ID="btnClear" CssClass="btn btn-outline-warning" Text="Clear" />--%>
                        <asp:LinkButton runat="server" ID="btnAdd" CssClass="btn btn-primary" Text="Register" OnClick="btnAdd_Click" /> 
                    </div>
                </div>

            </section>

        </ContentTemplate>
    </asp:UpdatePanel>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">

    <script>

        function validateForm() {
            var ConfirmPassword = document.getElementById("ConfirmPassword");
            var password = document.getElementById("password");

            // When the user starts to type something inside the password field
            if (password != ConfirmPassword) {
                document.getElementById("message").innerHTML = "**Fill the password please!";
                return false;
            }

        }

    </script>

</asp:Content>
