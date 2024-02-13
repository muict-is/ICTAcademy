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
                                            <img src="Assets/Images/user.png" alt="avatar"
                                                class="rounded-circle img-fluid" style="width: 150px;">
                                            <h5 class="my-3">Mr. Peter Smith</h5>
                                            <span class="badge text-bg-secondary">Mahidol Student</span>
                                            <p class="text-muted mb-4">peter.smi@ict.mahidol.ac.th</p>
                                            <div class="d-flex justify-content-center mb-2">
                                                <button type="button" class="btn btn-outline-primary ms-1">Edit Profile</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                    <div class="col-md-7 col-lg-8">


                        <h3>My Courses</h3>
                        <div class="row py-3">
                            <div class="col-8 col-sm-6 ">
                                <h4><span class="badge text-bg-warning"><i class="fas fa-shopping-basket"></i>In Basket</span></h4>
                                <h4>
                                    <asp:Label ID="Label1" runat="server" Text="Course Name 1"></asp:Label>
                                </h4>
                                <span class="text-body-secondary">
                                    <asp:Label runat="server" ID="lbCourseCode" Text="Course Description..." /></span>
                            </div>
                            <div class="col-4 col-sm-6">
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
                                    <br>
                                    <span class="badge text-bg-primary">access course</span>
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
                                    <span class="badge text-bg-success">access course</span><br>
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
