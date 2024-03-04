<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="CourseDetail.aspx.cs" Inherits="ICTAcademy.CourseDetail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .wordTop {
           margin-top:30px;
           /*padding-top:50px*/
        }
    </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="album bg-light">

        <div class="container  py-4" id="divCourse">

            <asp:LinkButton ID="LinkButton1" runat="server" class="btn btn-outline-success btn-round" OnClientClick="JavaScript:window.history.back(1); return false;">< Back</asp:LinkButton>

            <main class="py-4">
                <%--<div class="py-5 text-center">                   
                    <h2 ID="lbCourseCode2">Header</h2>
                </div>--%>

                <div class="row g-5">
                    <div class="col-md-5 col-lg-4 order-md-last">
                        <h4 class="d-flex justify-content-between align-items-center mb-3">
                            <span class="text-primary">
                                <asp:Label runat="server" ID="lbcourseNameEN" />
                            </span>
                            <%--<span class="badge bg-primary rounded-pill">3</span>--%>
                        </h4>
                        <%-- <h4 class="d-flex justify-content-between align-items-center mb-3">
                            <span class="text-primary">
                                <asp:Label runat="server" ID="Label1" />
                            </span>
                            <span class="badge bg-primary rounded-pill">3</span>

                            <div class="d-flex justify-content-between align-items-center">
                                <small class="text-body-secondary"></small>
                            </div>
                        </h4>--%>

                        <ul class="list-group mb-3">

                            <li class="list-group-item d-flex justify-content-between lh-sm">
                                <div>
                                    <h6 class="my-0">Course Code</h6>
                                    <small class="text-body-secondary"></small>
                                </div>
                                <span class="text-body-secondary">
                                    <asp:Label runat="server" ID="lbCourseCode" /></span>
                            </li>

                            <li class="list-group-item d-flex justify-content-between lh-sm">
                                <div>
                                    <h6 class="my-0">Category</h6>
                                    <%-- <small class="text-body-secondary">Brief description</small>--%>
                                </div>
                                <span class="text-body-secondary">
                                    <p class="card-text badge bg-warning my-0">
                                        <asp:Label runat="server" ID="lbCategoryEN" />
                                    </p>

                                </span>
                            </li>



                            <%--   
                              <li class="list-group-item d-flex justify-content-between bg-body-tertiary">
                                <div class="text-success">
                                    <h6 class="my-0">Promo code</h6>
                                    <small>EXAMPLECODE</small>
                                </div>
                                <span class="text-success">−$5</span> 
                            </li>--%>
                            <li class="list-group-item d-flex justify-content-between">
                                <h6 class="my-0">Classes Start</h6>
                                <small class="text-body-secondary">
                                    <asp:Label runat="server" ID="lbstartLearning" /></small>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                <h6 class="my-0">Total Hours</h6>
                                <small class="text-body-secondary">
                                    <asp:Label runat="server" ID="lbhour" /></small>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                <h6 class="my-0">Hours/Week</h6>
                                <small class="text-body-secondary">
                                    <asp:Label runat="server" ID="lbhourPerWeek" /></small>
                            </li>
                            <li class="list-group-item d-flex justify-content-between lh-sm">
                                <div>
                                    <h6 class="my-0">
                                        <asp:Label runat="server" ID="lbstyleEN" /></h6>
                                    <small class="text-body-secondary">
                                        <asp:Label runat="server" ID="lbstyleTH" /></small>
                                </div>
                                <%--<span class="text-body-secondary">
                                    <p class="card-text badge bg-warning my-0">
                                       
                                    </p>
                                </span>--%>
                            </li>
                            <li class="list-group-item d-flex justify-content-between lh-sm">
                                <div>
                                    <h6 class="my-0">Number of Applicants</h6>
                                    <%-- <small class="text-body-secondary">Brief description</small>--%>
                                </div>
                                <span class="text-body-secondary">
                                    <strong>
                                        <h4>
                                            <asp:Label runat="server" ID="lbmaxSeat" /></h4>
                                    </strong>
                                </span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                <h6 class="my-0">Fee</h6>
                                <h3 class="my-0"><strong>฿<asp:Label runat="server" ID="lbFee" /></strong></h3>
                            </li>

                        </ul>


                        <div class="text-end" id="DivEnroll" runat="server" visible="false">
                            <asp:Label runat="server" ID="DivEnrollText" />
                        </div>
                        <div class="text-end" id="DivEnrollOpen" runat="server" visible="false">
                            <asp:LinkButton ID="enrollOpen" runat="server" class="btn btn-success btn-round"> Enroll Course </asp:LinkButton>
                        </div>
                        <div class="text-end" id="DivEnrollClose" runat="server" visible="false">
                            <asp:LinkButton ID="enrollClose" runat="server" class="btn btn-danger btn-round"> Closed </asp:LinkButton>
                        </div>

                        <h4 class="text-muted wordTop">Description</h4>
                        <asp:Label ID="lbcourseDescription" runat="server" />

                        <h4 class="text-muted wordTop">Instructors</h4>
                        <asp:Repeater runat="server" ID="rptInstructors" ClientIDMode="AutoID">
                            <ItemTemplate>

                                <div class="row">
                                    <div class="col-sm-3">
                                        <asp:ImageButton ID="ImageIns" runat="server" src='<%#Eval("imageIns") %>' Width="100px" />
                                    </div>
                                    <div class="col-sm-9">
                                        <h6 class="my-0">
                                            <asp:Label ID="lbNameInstructors" runat="server" Text='<%#Eval("fullname") %>' /></h6>
                                        <small class="text-body-secondary">
                                            <%#Eval("position") %>
                                            <br>
                                            <%#Eval("workAddress") %>
                                            <br>
                                            <%#Eval("email") %> 
                                        </small>
                                    </div>
                                </div>


                            </ItemTemplate>
                        </asp:Repeater>


                    </div>
                    <div class="col-md-7 col-lg-8">

                        <asp:Image ID="ImageBlog" runat="server" Width="100%" />

                        <div id="DivlbcourseObjective" runat="server" visible="false">
                            <h4 class="wordTop">Objective</h4>
                            <asp:Label ID="lbcourseObjective" runat="server" />
                        </div>

                        <div id="DivlbcourseOutline" runat="server" visible="false">
                            <h4 class="wordTop">Program</h4>
                            <asp:Label ID="lbcourseOutline" runat="server" />
                        </div>

                        <div id="DivlbcourseEvaluation" runat="server" visible="false">
                            <h4 class="wordTop">Course Evaluation</h4>
                            <asp:Label ID="lbcourseEvaluation" runat="server" />
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
