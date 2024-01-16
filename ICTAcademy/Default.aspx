<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="ICTAcademy.Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
        <ContentTemplate>
            <section class="py-5 text-center container">
                <div class="row py-lg-5">
                    <div class="col-lg-6 col-md-8 mx-auto">
                        <h1 class="fw-light">Home</h1>
                    </div>
                </div>
            </section>

            <div class="album py-5 bg-light">
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        <asp:Repeater runat="server" ID="rptCourseList" ClientIDMode="AutoID">
                            <ItemTemplate>
                                <div class="col">
                                    <div class="card shadow-sm">
                                        <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                                            <title>Placeholder</title>
                                            <rect width="100%" height="100%" fill="#55595c" />
                                            <text x="40%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>

                                        <div class="card-body">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <p class="card-title fw-bold"><%#Eval("CourseName") %></p>
                                                <p class="text-muted"><%#Eval("Price").ToString().Length >0 ? decimal.Parse(Eval("Price").ToString()).ToString("N2") : "" %></p>
                                            </div>
                                            <p class="card-text badge bg-warning"><%#Eval("CourseCategory") %></p>
                                            <p class="card-text fst-italic text-danger"><%#Eval("CourseNote") %></p>
                                        </div>
                                    </div>
                                </div>
                            </ItemTemplate>
                        </asp:Repeater>

                    </div>
                </div>
            </div>
        </ContentTemplate>
    </asp:UpdatePanel>
</asp:Content>
