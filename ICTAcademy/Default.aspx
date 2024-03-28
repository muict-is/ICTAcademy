<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="ICTAcademy.Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <section class="py-1 text-center">

        <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <asp:ImageButton ID="ImageButton1" runat="server" src="Assets/Images/cover_1.jpg" />
                </div>
                <div class="carousel-item">
                    <asp:ImageButton ID="ImageButton2" runat="server" src="Assets/Images/cover_2.jpg" />
                </div>
                <div class="carousel-item">
                    <asp:ImageButton ID="ImageButton3" runat="server" src="Assets/Images/cover_3.jpg" />
                </div>
            </div>
        </div>

    </section>

    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
        <ContentTemplate>

            <div class="album bg-light py-5">
                <div class="container">


                    <div class="col-lg-4 col-xxl-6 py-3 mx-auto">

                        <div class="d-grid gap-2">
                        </div>

                        <div class="row mb-3">
                            <div class="col-sm-3">
                                <asp:DropDownList ID="CategoryID" runat="server" CssClass="form-select">
                                    <asp:ListItem Value="0" Text="All" />
                                    <asp:ListItem Value="1" Text="Cyber Security" />
                                </asp:DropDownList>
                            </div>
                            <div class="col-sm-9">
                                <div class="input-group mb-3">
                                    <asp:TextBox CssClass="form-control me-2" ID="tbSearch" runat="server" placeholder="Search..."></asp:TextBox>
                                    <div class="input-group-append">
                                        <asp:LinkButton ID="LinkButton3" runat="server" CssClass="btn btn-outline-secondary"> <i class="fa-solid fa-magnifying-glass"></i> </asp:LinkButton>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        <asp:Repeater runat="server" ID="rptCourseList" ClientIDMode="AutoID">
                            <ItemTemplate>

                                <asp:HiddenField ID="hfCategoryID" runat="server" Value=' <%#Eval("CategoryID") %>' />

                                <div class="col">

                                    <div class="card shadow-sm h-100">

                                        <asp:ImageButton ID="Image1" runat="server" src='<%#Eval("ImageCourse") %>' CommandArgument='<%# Eval("courseDesID") %>' OnCommand="courseDesID_Command" />
                                        <div class="card-body">
                                            <div class="card-text">
                                                <asp:LinkButton ID="LinkButton1" CssClass="wrap" runat="server" CommandArgument='<%# Eval("courseDesID") %>' OnCommand="courseDesID_Command">

                                                    <%-- <div class="d-flex justify-content-between align-items-center">
                                                        <div class="btn-group">
                                                        </div>
                                                      
                                                    </div>--%>

                                                    <div class="d-flex justify-content-between align-items-center text-primary">
                                                        <p class="card-text fw-bold"><%#Eval("new") + " " + Eval("courseNameEN") %></p>
                                                    </div>

                                                    <div class="text-muted">
                                                        <asp:Literal ID="litsort" Text='<%#Eval("courseDescription").ToString().Length > 102 ? Eval("courseDescription").ToString().Substring(0, 150) :Eval("courseDescription").ToString()%>' Visible="true" runat="server" />
                                                        <asp:Literal ID="litfull" Text='<%#Eval("courseDescription")%>' Visible="false" runat="server" />
                                                        <asp:Panel ID="btnexpand" CommandArgument='<%# Eval("courseDesID") %>' OnCommand="courseDesID_Command" runat="server">Read More... </asp:Panel>
                                                        <%--<asp:Button ID="btncollapse" Text="Collapse" CssClass="btn btn-outline-secondary ms-1" OnClick="Oncollapse" Visible="false" runat="server" />--%>
                                                    </div>


                                                </asp:LinkButton>
                                            </div>
                                        </div>

                                        <div class="card-footer text-muted text-center">

                                            <div class="d-flex justify-content-between align-items-center">
                                                <div class="btn-group">
                                                    <asp:LinkButton ID="LinkButton2" runat="server" CommandArgument='<%#Eval("CategoryID") %>' OnCommand="LinkButton1_Command">
                                                            <span class="card-text badge text-bg-warning"><%#Eval("CategoryEN") %></span> 
                                                    </asp:LinkButton>
                                                    <%--<asp:LinkButton ID="LinkButton1" runat="server" CommandArgument="<%#Eval("CategoryID") %>" OnCommand="LinkButton1_Command"></asp:LinkButton>--%>
                                                </div>
                                                <small class="text-body-secondary"><b>฿<%#Eval("fee").ToString().Length >0 ? decimal.Parse(Eval("fee").ToString()).ToString("N2") : "" %></b></small>

                                            </div>
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
