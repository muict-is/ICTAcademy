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

        .card-border {
            border: 20px solid #ccc;
            border-radius: 30px !important;
            border-left: 5px solid #0dcaf0 !important;
            position: relative;
            display: flex;
            flex-direction: column;
            min-width: 0;
            word-wrap: break-word;
            background-color: #fff;
            background-clip: border-box;
            border: 0px solid rgba(0, 0, 0, 0);
            border-radius: .25rem;
            margin-bottom: 1.5rem;
            box-shadow: 0 2px 6px 0 rgb(218 218 253 / 65%), 0 2px 6px 0 rgb(206 206 238 / 54%);
        }

        .paymentWrap {
            padding: 20px;
        }

            .paymentWrap .paymentBtnGroup {
                max-width: 800px;
                margin: auto;
            }

                .paymentWrap .paymentBtnGroup .paymentMethod {
                    padding: 30px;
                    box-shadow: none;
                    position: relative;
                }

                    .paymentWrap .paymentBtnGroup .paymentMethod.active {
                        outline: none !important;
                    }

                        .paymentWrap .paymentBtnGroup .paymentMethod.active .method {
                            border-color: #4cd264;
                            outline: none !important;
                            box-shadow: 0px 3px 22px 0px #7b7b7b;
                        }

                    .paymentWrap .paymentBtnGroup .paymentMethod .method {
                        position: absolute;
                        right: 3px;
                        top: 3px;
                        bottom: 3px;
                        left: 3px;
                        background-size: contain;
                        background-position: center;
                        background-repeat: no-repeat;
                        border: 2px solid transparent;
                        transition: all 0.5s;
                    }

                        .paymentWrap .paymentBtnGroup .paymentMethod .method.th {
                            background-image: url("Assets/Images/th.png");
                            width: 60px;
                        }

                        .paymentWrap .paymentBtnGroup .paymentMethod .method.en {
                            background-image: url("Assets/Images/en.png");
                            width: 60px;
                        }

                        .paymentWrap .paymentBtnGroup .paymentMethod .method:hover {
                            border-color: #4cd264;
                            outline: none !important;
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

                            <div class="paymentCont">
                                <div class="paymentWrap ">
                                    <div class="btn-group paymentBtnGroup btn-group-justified" data-toggle="buttons">

                                        <label class="btn paymentMethod">
                                            <div class="method th">
                                            </div>
                                            <asp:CheckBox ID="optionTH" name="options" runat="server" />
                                        </label>
                                        <label class="btn paymentMethod">
                                            <div class="method en">
                                            </div>
                                            <asp:CheckBox ID="optionEN" name="options" runat="server" />
                                        </label>

                                    </div>
                                </div>
                            </div>


                            <div class="card card-border" style="border-radius: 1rem;">

                                <div class="card-body p-5 ">


                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <asp:Label for="countryID" runat="server" Text="Label" class="form-label">Country</asp:Label>
                                                    <asp:DropDownList ID="countryID" CssClass="form-select" runat="server" ></asp:DropDownList>
                                                    <asp:RequiredFieldValidator CssClass="rfv" ID="RequiredFieldcountryID" Display="Dynamic" runat="server" ErrorMessage="Please provide a valid Country ." ControlToValidate="countryID" ForeColor="Red"></asp:RequiredFieldValidator>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="row mb-3">
                                                <div class="col-sm-6">
                                                    <asp:Label for="lbType" runat="server" class="form-label ">Type</asp:Label>
                                                    <asp:DropDownList ID="ddRegisterType" runat="server" CssClass="form-select"></asp:DropDownList>
                                                    <asp:RequiredFieldValidator CssClass="rfv" ID="RequiredFieldddRegisterType" Display="Dynamic" runat="server" ErrorMessage="Please provide a valid type of register" ControlToValidate="ddRegisterType" ForeColor="Red"></asp:RequiredFieldValidator>
                                                </div>
                                                <div class="col-sm-3 ">
                                                    <asp:Label for="lbGender" runat="server" class="form-label ">Gender</asp:Label>
                                                    <asp:DropDownList ID="ddGender" runat="server" CssClass="form-select"></asp:DropDownList>
                                                    <asp:RequiredFieldValidator CssClass="rfv" ID="RequiredFieldddGender" runat="server" ErrorMessage="Please provide a Gender." ControlToValidate="ddGender" ForeColor="Red" Display="Dynamic"></asp:RequiredFieldValidator>
                                                </div>
                                                <div class="col-sm-3 ">
                                                    <asp:Label for="lbByear" runat="server" class="form-label ">Year Of Birth</asp:Label>
                                                    <asp:DropDownList ID="ddByear" runat="server" CssClass="form-select"></asp:DropDownList>
                                                    <asp:RequiredFieldValidator CssClass="rfv" ID="RequiredFieldddByear" runat="server" ErrorMessage="Please provide a valid year Of birth." ControlToValidate="ddByear" ForeColor="Red" Display="Dynamic"></asp:RequiredFieldValidator>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="row mb-3">
                                                <div class="col-sm-3">
                                                    <asp:Label for="title_EN" runat="server" Text="Label" class="form-label">Title(EN)</asp:Label>
                                                    <asp:DropDownList ID="title_EN" runat="server" CssClass="form-select">
                                                    </asp:DropDownList>
                                                    <asp:RequiredFieldValidator CssClass="rfv" ID="RequiredFieldValidator5" Display="Dynamic" runat="server" ErrorMessage="Please provide a valid Title Name (TH) ." ControlToValidate="title_EN" ForeColor="Red"></asp:RequiredFieldValidator>

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
                                                    <asp:RequiredFieldValidator CssClass="rfv" ID="RequiredFieldValidator6" runat="server" Display="Dynamic" ErrorMessage="Please provide a valid Last Name (EN) ." ControlToValidate="lastnameEN" ForeColor="Red"></asp:RequiredFieldValidator>

                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="row mb-3">
                                                <div class="col-sm-3">
                                                    <asp:Label for="title_TH" runat="server" Text="Label" class="form-label ">Title (TH)</asp:Label>
                                                    <asp:DropDownList ID="title_TH" runat="server" CssClass="form-select">
                                                    </asp:DropDownList>
                                                    <%--<asp:RequiredFieldValidator CssClass="rfv" ID="RequiredFieldValidator2" runat="server" ErrorMessage="Please provide a valid Title (TH) ." ControlToValidate="titleTH" ForeColor="Red" Display="Dynamic"></asp:RequiredFieldValidator>--%>
                                                </div>
                                                <div class="col-sm-3 ">
                                                    <asp:Label for="firstnameTH" runat="server" Text="Label" class="form-label ">First Name (TH)  </asp:Label>
                                                    <asp:TextBox ID="firstnameTH" CssClass="form-control" runat="server" placeholder=""></asp:TextBox>
                                                    <%--<asp:RequiredFieldValidator CssClass="rfv" ID="RequiredFieldValidator3" runat="server" ErrorMessage="Please provide a valid First Name (TH) ." ControlToValidate="firstnameTH" ForeColor="Red" Display="Dynamic"></asp:RequiredFieldValidator>--%>
                                                </div>
                                                <div class="col-sm-3 ">
                                                    <asp:Label for="middleTH" runat="server" Text="Label" class="form-label ">Middle name (TH)  </asp:Label>
                                                    <asp:TextBox ID="middleTH" CssClass="form-control" runat="server" placeholder=""></asp:TextBox>
                                                </div>
                                                <div class="col-sm-3 ">
                                                    <asp:Label for="lastnameTH" runat="server" Text="Label" class="form-label">Last Name (TH)  </asp:Label>
                                                    <asp:TextBox ID="lastnameTH" CssClass="form-control" runat="server" placeholder=""></asp:TextBox>
                                                    <%--<asp:RequiredFieldValidator CssClass="rfv" ID="RequiredFieldValidator4" runat="server" ErrorMessage="Please provide a valid Last Name (TH) ." ControlToValidate="firstnameTH" ForeColor="Red" Display="Dynamic"></asp:RequiredFieldValidator>--%>
                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="row mb-3">
                                                <div class="col-sm-12">
                                                    <asp:Label for="email" runat="server" Text="Label" class="form-label">Email  </asp:Label>
                                                    <asp:TextBox ID="email" CssClass="form-control" runat="server" TextMode="Email" placeholder="name@example.com"></asp:TextBox>
                                                    <asp:RequiredFieldValidator CssClass="rfv" ID="RequiredFieldValidator8" runat="server" Display="Dynamic" ErrorMessage="Please provide a valid Email ." ControlToValidate="email" ForeColor="Red"></asp:RequiredFieldValidator>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <br>
                                    <hr>
                                    <br>
                                    <div class="row">
                                        <%--<div class="col-sm-4 ">
                                            <asp:Label for="username" runat="server" Text="Label" class="form-label">Username  </asp:Label>
                                            <asp:TextBox ID="username" CssClass="form-control" runat="server" placeholder=""></asp:TextBox>
                                            <asp:RequiredFieldValidator runat="server" ControlToValidate="username"
                                                ErrorMessage="Username is required." ForeColor="Red" Display="Dynamic">
                                            </asp:RequiredFieldValidator>
                                        </div>--%>
                                        <div class="col-sm-6 ">
                                            <asp:Label for="password" runat="server" Text="Label" class="form-label">Password  </asp:Label>
                                            <asp:TextBox ID="password" CssClass="form-control" runat="server" placeholder="" TextMode="Password"></asp:TextBox>
                                            <asp:RequiredFieldValidator runat="server" ControlToValidate="password"
                                                ErrorMessage="Password is required." ForeColor="Red" Display="Dynamic">
                                            </asp:RequiredFieldValidator>
                                        </div>
                                        <div class="col-sm-6 ">
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
