<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="ICTAcademy.Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <section class="py-2 text-center">

    <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <asp:ImageButton ID="ImageButton1" runat="server" src="Assets/Images/cover_1.jpg"/>
            </div>
            <div class="carousel-item">
               <asp:ImageButton ID="ImageButton2" runat="server" src="Assets/Images/cover_2.jpg"/>
            </div>
            <div class="carousel-item">
               <asp:ImageButton ID="ImageButton3" runat="server" src="Assets/Images/cover_3.jpg"/>
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
                                    <div class="card shadow-sm  h-100">
                                        <asp:Image ID="Image1" runat="server" src='<%#Eval("ImageCourse") %>' />

                                        <div class="card-body " >
                                            <p class="card-text badge bg-warning"><%#Eval("CategoryEN") %></p>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <p class="card-title fw-bold "><%#Eval("courseNameEN") %></p>
                                                <p class="text-muted"><b>฿<%#Eval("Fee").ToString().Length >0 ? decimal.Parse(Eval("Fee").ToString()).ToString("N2") : "" %></b></p>
                                            </div>
                                            
                                            <%-- <p class="card-text fst-italic text-danger"><%#Eval("CourseNote") %></p>--%>
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
