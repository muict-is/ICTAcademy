<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="CourseProfile.aspx.cs" Inherits="ICTAcademy.CourseProfile" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <div class="album bg-light py-5">

     <div class="container" id="divCourse">

         <asp:LinkButton ID="LinkButton1" runat="server" class="btn btn-outline-success btn-round" PostBackUrl="~/Default.aspx">< Back</asp:LinkButton>
         <main>
             <%--<div class="py-5 text-center">                   
                 <h2 ID="lbCourseCode2">Header</h2>
             </div>--%>

             <div class="row g-5">
                 <div class="col-md-5 col-lg-4 order-md-last">
                     


                 </div>
                 <div class="col-md-7 col-lg-8">

                    <h3>My Courses</h3>


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
