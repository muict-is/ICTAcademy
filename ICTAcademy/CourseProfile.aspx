<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="CourseProfile.aspx.cs" Inherits="ICTAcademy.CourseProfile" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="album bg-light py-5">

        <div class="container" id="divCourse">


            <main>
                <div class="row g-5">
                    <div class="col-md-5 col-lg-4 order-md-last">
                        <section style="background-color: #eee;">
                            <div class="container py-5 ">
                                <div class="row d-flex justify-content-center align-items-center ">
                                    <div class="col-md-12 col-xl-12">
                                        <div class="card-body text-center">
                                            <img src="Assets/Images/user.png" alt="avatar" class="rounded-circle img-fluid" style="width: 150px;">

                                            <h5 class="my-3">
                                                <asp:Label ID="lbfullnameEN" runat="server" /></h5>
                                            <h6 class="text-muted">
                                                <asp:Label ID="lbfullname" runat="server" /></h6>

                                            <span class="badge text-bg-secondary">
                                                <asp:Label ID="lbStyle" runat="server" /></span>
                                            <p class="text-muted mb-4">
                                                <asp:Label ID="lbEmail" runat="server" />
                                            </p>

                                            <div class="d-flex justify-content-center mb-2">
                                                <button type="button" class="btn btn-outline-primary ms-1" data-bs-toggle="modal" data-bs-target="#InfoModal">Edit Profile</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <!-- Modal -->
                        <div class="modal fade" id="InfoModal" tabindex="-1" aria-labelledby="InfoModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content col-6 col-md-4">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="InfoModalLabel">Edit Profile</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">

                                        <div class="mb-3 row">
                                            <asp:Label for="titleTH" runat="server" Text="Label" class="col-sm-4 col-form-label fw-bold">Title (TH)</asp:Label>
                                            <div class="col-sm-5">
                                                <asp:DropDownList ID="titleTH" runat="server" CssClass="form-select">
                                                    <asp:ListItem Value="0" Text=""></asp:ListItem>
                                                    <asp:ListItem Value="นาย" Text="นาย" />
                                                    <asp:ListItem Value="นางสาว" Text="นางสาว" />
                                                    <asp:ListItem Value="นาง" Text="นาง" />
                                                </asp:DropDownList>
                                                <asp:RequiredFieldValidator CssClass="rfv" ID="RequiredFieldValidator2" runat="server" ErrorMessage="Please provide a valid Title (TH) ." ControlToValidate="titleTH" ForeColor="Red" Display="Dynamic"></asp:RequiredFieldValidator>

                                            </div>
                                        </div>

                                        <div class="mb-3 row">
                                            <asp:Label for="firstnameTH" runat="server" Text="Label" class="col-sm-4 col-form-label fw-bold">First Name (TH)</asp:Label>
                                            <div class="col-sm-5">
                                                <asp:TextBox ID="firstnameTH" CssClass="form-control" runat="server" placeholder=""></asp:TextBox>
                                                <asp:RequiredFieldValidator CssClass="rfv" ID="RequiredFieldValidator3" runat="server" ErrorMessage="Please provide a valid First Name (TH) ." ControlToValidate="firstnameTH" ForeColor="Red" Display="Dynamic"></asp:RequiredFieldValidator>
                                            </div>
                                        </div>

                                        <div class="mb-3 row">
                                            <asp:Label for="middleTH" runat="server" Text="Label" class="col-sm-4 col-form-label fw-bold">Middle name (TH)</asp:Label>
                                            <div class="col-sm-5">
                                                <asp:TextBox ID="middleTH" CssClass="form-control" runat="server" placeholder=""></asp:TextBox>
                                            </div>
                                        </div>

                                        <div class="mb-3 row">
                                            <asp:Label for="lastnameTH" runat="server" Text="Label" class="col-sm-4 col-form-label fw-bold">Last Name (TH)</asp:Label>
                                            <div class="col-sm-5">
                                                <asp:TextBox ID="lastnameTH" CssClass="form-control" runat="server" placeholder=""></asp:TextBox>
                                                <asp:RequiredFieldValidator CssClass="rfv" ID="RequiredFieldValidator4" runat="server" ErrorMessage="Please provide a valid Last Name (TH) ." ControlToValidate="firstnameTH" ForeColor="Red" Display="Dynamic"></asp:RequiredFieldValidator>

                                            </div>
                                        </div>

                                        <hr>

                                        <div class="mb-3 row">
                                            <asp:Label for="titleEN" runat="server" Text="Label" class="col-sm-4 col-form-label fw-bold">Title(EN)</asp:Label>
                                            <div class="col-sm-5">
                                                <asp:DropDownList ID="titleEN" runat="server" CssClass="form-select">
                                                    <asp:ListItem Value="0" Text=""></asp:ListItem>
                                                    <asp:ListItem Value="Mr." Text="Mr." />
                                                    <asp:ListItem Value="Mrs." Text="Mrs." />
                                                    <asp:ListItem Value="Miss" Text="Miss" />
                                                    <asp:ListItem Value="Ms." Text="Ms." />
                                                </asp:DropDownList>
                                                <asp:RequiredFieldValidator CssClass="rfv" ID="RequiredFieldValidator5" Display="Dynamic" runat="server" ErrorMessage="Please provide a valid Title Name (TH) ." ControlToValidate="titleEN" ForeColor="Red"></asp:RequiredFieldValidator>

                                            </div>
                                        </div>

                                        <div class="mb-3 row">
                                            <asp:Label for="firstnameEN" runat="server" Text="Label" class="col-sm-4 col-form-label fw-bold">First Name (EN)</asp:Label>
                                            <div class="col-sm-5">
                                                <asp:TextBox ID="firstnameEN" CssClass="form-control" runat="server" placeholder=""></asp:TextBox>
                                                <asp:RequiredFieldValidator CssClass="rfv" ID="RequiredFieldValidator1" runat="server" Display="Dynamic" ErrorMessage="Please provide a valid First Name (EN) ." ControlToValidate="firstnameEN" ForeColor="Red"></asp:RequiredFieldValidator>

                                            </div>
                                        </div>


                                        <div class="mb-3 row">
                                            <asp:Label for="middleEN" runat="server" Text="Label" class="col-sm-4 col-form-label fw-bold">Middle Name (EN)</asp:Label>
                                            <div class="col-sm-5">
                                                <asp:TextBox ID="middleEN" CssClass="form-control" runat="server" placeholder=""></asp:TextBox>
                                            </div>
                                        </div>

                                        <div class="mb-3 row">
                                            <asp:Label for="lastnameEN" runat="server" Text="Label" class="col-sm-4 col-form-label fw-bold">Last Name (EN)</asp:Label>
                                            <div class="col-sm-5">
                                                <asp:TextBox ID="lastnameEN" CssClass="form-control" runat="server" placeholder=""></asp:TextBox>
                                                <asp:RequiredFieldValidator CssClass="rfv" ID="RequiredFieldValidator6" runat="server" Display="Dynamic" ErrorMessage="Please provide a valid Last Name (TH) ." ControlToValidate="lastnameEN" ForeColor="Red"></asp:RequiredFieldValidator>

                                            </div>
                                        </div>

                                        <hr>

                                        <div class="mb-3 row">
                                            <asp:Label for="email" runat="server" Text="Label" class="col-sm-4 col-form-label fw-bold">Email</asp:Label>
                                            <div class="col-sm-5">
                                                <asp:TextBox ID="email" CssClass="form-control" runat="server" TextMode="Email" placeholder="name@example.com"></asp:TextBox>
                                                <asp:RequiredFieldValidator CssClass="rfv" ID="RequiredFieldValidator8" runat="server" Display="Dynamic" ErrorMessage="Please provide a valid Email ." ControlToValidate="email" ForeColor="Red"></asp:RequiredFieldValidator>

                                            </div>
                                        </div>

                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <asp:LinkButton ID="lbSaveChange" runat="server" CssClass="btn btn-primary" OnClick="lbSaveChange_Click">Save Change</asp:LinkButton>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div class="col-md-7 col-lg-8">


                        <h3>My Courses</h3>



                        <div class="row py-3">
                            <div class="col-8 col-sm-8 ">
                                <h4><span class="badge text-bg-warning"><i class="fas fa-shopping-basket"></i>In Basket</span></h4>
                                <h4>
                                    <asp:Label ID="Label1" runat="server" Text="Course Name 1"></asp:Label>
                                </h4>

                                <span class="text-body-secondary">
                                    <asp:Label runat="server" ID="lbCourseCode" Text="Course Description..." /></span>
                            </div>
                            <div class="col-4 col-sm-4">
                                <div class="text-end">
                                    <a class="btn btn-success rounded-5" href="CourseProfile.aspx">Pay Now </a>
                                    <br>
                                    <br>
                                    <span class="text-danger"><i class="fa-solid fa-trash"></i></span>
                                </div>
                            </div>
                        </div>


                        <div class="row py-3">
                            <div class="col-8 col-sm-8 ">
                                <h4><span class="badge text-bg-warning"><i class="fas fa-shopping-basket"></i>In Basket</span></h4>
                                <h4>
                                    <asp:Label ID="Label6" runat="server" Text="Course Name 1"></asp:Label>
                                </h4>

                                <span class="text-body-secondary">
                                    <asp:Label runat="server" ID="Label7" Text="Course Description..." /></span>
                            </div>
                            <div class="col-4 col-sm-4">
                                <div class="text-end">
                                    <a class="btn btn-success rounded-5" href="CourseProfile.aspx">Pay Now </a>
                                    <br>
                                    <br>
                                    <span class="text-danger"><i class="fa-solid fa-trash"></i></span>
                                </div>
                            </div>
                        </div>

                        <hr>

                        <div class="row py-3">
                            <div class="col-8 col-sm-8 ">
                                <h4><span class="badge text-bg-info">In Progress Courses</span></h4>
                                <h4>
                                    <asp:Label ID="Label2" runat="server" Text="Course Name 1"></asp:Label>
                                </h4>
                                <span class="text-body-secondary">
                                    <asp:Label runat="server" ID="Label3" Text="Course Description..." /></span>
                            </div>
                            <div class="col-4 col-sm-4">
                                <div class="text-end">

                                    <div class="progress" role="progressbar" aria-label="Info striped example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                        <div class="progress-bar progress-bar-striped bg-info" style="width: 50%"></div>
                                    </div>
                                    progress<b> <span style="font-size: 24px">50%</span></b>

                                </div>
                            </div>
                        </div>

                        <hr>

                        <div class="row py-3">
                            <div class="col-8 col-sm-8 ">
                                <h4><span class="badge text-bg-success">Completed Courses</span></h4>
                                <h4>
                                    <asp:Label ID="Label4" runat="server" Text="Course Name 2"></asp:Label>
                                </h4>
                                <span class="text-body-secondary">
                                    <asp:Label runat="server" ID="Label5" Text="Course Description..." /></span>

                            </div>
                            <div class="col-4 col-sm-4">
                                <div class="text-end">
                                    <div class="progress" role="progressbar" aria-label="Info striped example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                        <div class="progress-bar progress-bar-striped bg-success" style="width: 100%"></div>
                                    </div>
                                    progress<b> <span style="font-size: 24px">100%</span></b>
                                    <br>
                                    <span class="text-secondary">completed on Nov 23,2023</span>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </main>

            <footer class="my-5 pt-5 text-body-secondary text-center text-small">
                <%-- <p class="mb-1"> </p>      --%>
            </footer>
        </div>

    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">
</asp:Content>
