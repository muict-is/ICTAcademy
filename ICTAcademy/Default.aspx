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
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        <asp:Repeater runat="server" ID="rptCourseList" ClientIDMode="AutoID">
                            <ItemTemplate>

                                <div class="col">

                                    <asp:HiddenField ID="hfCategoryID" runat="server" Value=' <%#Eval("CategoryID") %>' />

                                    <div class="card shadow-sm  h-100">
                                        <asp:LinkButton ID="lbcourseNameEN" runat="server" CommandArgument='<%# Eval("courseDesID") %>' OnCommand="courseDesID_Command">
                                            <asp:ImageButton ID="Image1" runat="server" src='<%#Eval("ImageCourse") %>' CommandArgument='<%# Eval("courseDesID") %>' OnCommand="courseDesID_Command" />

                                            <div class="card-body ">

                                                <div class="d-flex justify-content-between align-items-center">
                                                    <p class="card-title fw-bold"><%#Eval("courseNameEN") %></p>
                                                </div>
                                            </div>
                                        </asp:LinkButton> 
                                        
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
