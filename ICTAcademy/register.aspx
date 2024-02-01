<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="register.aspx.cs" Inherits="ICTAcademy.register" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <style>

        body {
  padding-top: 20px;
  padding-bottom: 20px;
}

/* Everything but the jumbotron gets side spacing for mobile first views */
.header,
.marketing,
.footer {
  padding-right: 15px;
  padding-left: 15px;
}

/* Custom page header */
.header {
  border-bottom: 1px solid #e5e5e5;
}
/* Make the masthead heading the same height as the navigation */
.header h3 {
  padding-bottom: 19px;
  margin-top: 0;
  margin-bottom: 0;
  line-height: 40px;
}

/* Custom page footer */
.footer {
  padding-top: 19px;
  color: #777;
  border-top: 1px solid #e5e5e5;
}

/* Customize container */
@media (min-width: 768px) {
  .container {
    max-width: 730px;
  }
}
.container-narrow > hr {
  margin: 30px 0;
}

/* Main marketing message and sign up button */
.jumbotron {
  text-align: center;
  border-bottom: 1px solid #e5e5e5;
}
.jumbotron .btn {
  padding: 14px 24px;
  font-size: 21px;
}

/* Supporting marketing content */
.marketing {
  margin: 40px 0;
}
.marketing p + h4 {
  margin-top: 28px;
}

/* Responsive: Portrait tablets and up */
@media screen and (min-width: 768px) {
  /* Remove the padding we set earlier */
  .header,
  .marketing,
  .footer {
    padding-right: 0;
    padding-left: 0;
  }
  /* Space out the masthead */
  .header {
    margin-bottom: 30px;
  }
  /* Remove the bottom border on the jumbotron for visual effect */
  .jumbotron {
    border-bottom: 0;
  }
}
    </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
        <ContentTemplate>
            <div class="container">


                <br> 
                <h2>User Registration</h2>
                <div class="card m-3">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="row mb-3">
                                    <div class="col-sm-3">
                                        <asp:Label for="titleTH" runat="server" Text="Label" class="form-label ">คำนำหน้า(TH)</asp:Label>
                                        <asp:DropDownList ID="titleTH" runat="server" CssClass="form-select" >
                                            <asp:ListItem Value="0" Text=""></asp:ListItem>
                                            <asp:ListItem Value="นาย" Text="นาย" />
                                            <asp:ListItem Value="นางสาว" Text="นางสาว" />
                                            <asp:ListItem Value="นาง" Text="นาง" />
                                        </asp:DropDownList>
                                    </div>
                                    <div class="col-sm-3 ">
                                        <asp:Label for="firstnameTH" runat="server" Text="Label" class="form-label ">ชื่อ (TH)  </asp:Label>
                                        <asp:TextBox ID="firstnameTH" CssClass="form-control" runat="server" placeholder=""></asp:TextBox>
                                    </div>

                                    <div class="col-sm-3 ">
                                        <asp:Label for="middleTH" runat="server" Text="Label" class="form-label ">ชื่อกลาง (TH)  </asp:Label>
                                        <asp:TextBox ID="middleTH" CssClass="form-control" runat="server" placeholder=""></asp:TextBox>
                                    </div>
                                    <div class="col-sm-3 ">
                                        <asp:Label for="lastnameTH" runat="server" Text="Label" class="form-label">นามสกุล (TH)  </asp:Label>
                                        <asp:TextBox ID="lastnameTH" CssClass="form-control" runat="server" placeholder=""></asp:TextBox>
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
                                    </div>
                                    <div class="col-sm-3 "> 
                                        <asp:Label for="firstnameEN" runat="server" Text="Label" class="form-label">First Name (EN)  </asp:Label>
                                        <asp:TextBox ID="firstnameEN" CssClass="form-control" runat="server" placeholder=""></asp:TextBox > 
                                        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ErrorMessage="Please provide a valid First Name (EN) ." ControlToValidate="firstnameEN" ForeColor="Red"></asp:RequiredFieldValidator>
                                    </div> 
                                    <div class="col-sm-3 "> 
                                        <asp:Label for="middleEN" runat="server" Text="Label" class="form-label">Middle Name (EN)  </asp:Label>
                                        <asp:TextBox ID="middleEN" CssClass="form-control" runat="server" placeholder=""></asp:TextBox>
                                    </div>
                                    <div class="col-sm-3 ">
                                        <asp:Label for="lastnameEN" runat="server" Text="Label" class="form-label">Last Name (EN)  </asp:Label>
                                        <asp:TextBox ID="lastnameEN" CssClass="form-control" runat="server" placeholder=""></asp:TextBox>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="row mb-3">
                                    <div class="col-sm-6">
                                        <asp:Label for="countryID" runat="server" Text="Label" class="form-label">Country</asp:Label>
                                        <asp:DropDownList ID="countryID" runat="server" CssClass="form-select">
                                            <asp:ListItem Value="0" Text=""></asp:ListItem>
                                            <asp:ListItem Value="1" Text="Thailand" />
                                        </asp:DropDownList>
                                    </div>
                                    <div class="col-sm-6">
                                        <asp:Label for="email" runat="server" Text="Label" class="form-label">Email  </asp:Label>
                                        <asp:TextBox ID="email" CssClass="form-control" runat="server" TextMode="Email" placeholder="name@example.com"></asp:TextBox>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <br>
                        <hr>
                        <br>
                        <div class="row" id="DivUsername">
                            <div class="col-sm-4 ">
                                <asp:Label for="username" runat="server" Text="Label" class="form-label">Username  </asp:Label>
                                <asp:TextBox ID="username" CssClass="form-control" runat="server" placeholder="" ></asp:TextBox>
                            </div>
                            <div class="col-sm-4 ">
                                <asp:Label for="password" runat="server" Text="Label" class="form-label">Password  </asp:Label>
                                <asp:TextBox ID="password" CssClass="form-control" runat="server" placeholder="" TextMode="Password"></asp:TextBox>
                            </div>
                            <div class="col-sm-4 ">
                                <asp:Label for="ConfirmPassword" runat="server" Text="Label" class="form-label">Confirm Password  </asp:Label>
                                <asp:TextBox ID="ConfirmPassword" CssClass="form-control" runat="server" placeholder="" TextMode="Password"></asp:TextBox>
                            </div>
                        </div>
                        <br>
                    </div>
                </div>

                <asp:LinkButton runat="server" ID="btnClear" CssClass="btn btn-outline-warning" Text="Clear" />
                <asp:LinkButton runat="server" ID="btnAdd" CssClass="btn btn-primary" Text="Register" onClick="btnAdd_Click"/>

                <hr />
                <asp:Label runat="server" ID="log" />
            </div>
        </ContentTemplate>
    </asp:UpdatePanel>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">
</asp:Content>
