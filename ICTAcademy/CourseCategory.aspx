<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="CourseCategory.aspx.cs" Inherits="ICTAcademy.HomeCoursesList" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <style>
        .up-20 {
            padding-top: 2em;
        }

        .upbggray-10 {
            background-color: #eee;
            margin-top: 10px
        }

        .colorICT {
            color: #006C6C; /* Green ICT */
        }

        .item-flex {
            text-align: center;
            width: 33%;
        }
    </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
        <ContentTemplate>

            <div class="album  py-5">
                <div class="container">
                    <div class="py-5">
                        <h3>Course Category</h3>
                    </div>
                    <div class="row row-cols-md-12 g-3">
                        <asp:Repeater runat="server" ID="rptCourseCategory" ClientIDMode="AutoID" OnItemDataBound="rptCourseCategory_ItemDataBound">
                            <ItemTemplate>
                                <div class="row">
                                    <div class="up-20">
                                        <h4><span class="badge text-bg-warning up-20"><%#Eval("CategoryEN") %></span></h4>
                                    </div>

                                    <asp:HiddenField ID="hfCategoryID" runat="server" Value=' <%#Eval("CategoryID") %>' />

                                    <asp:Repeater ID="rptCourses" runat="server" OnItemDataBound="rptCourses_ItemDataBound" ClientIDMode="AutoID">
                                        <ItemTemplate>

                                            <div class="upbggray-10 ">
                                                <div class="row">
                                                    <div class="col-sm-2 ">
                                                        <div style="padding: 10px">
                                                           <%-- <img src="Assets/Images/blog1.jpg" style="width: 180px; height: 110px" />--%>
                                                             <asp:ImageButton ID="Image1" runat="server" src='<%#Eval("ImageCourse") %>' CommandArgument='<%# Eval("courseDesID") %>' OnCommand="Image1_Command" style="width: 180px; height: 110px"/>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6 py-2">
                                                        <h4>
                                                            <asp:LinkButton ID="Label1" runat="server" CommandArgument='<%# Eval("courseDesID") %>' OnCommand="Image1_Command" ><%#Eval("courseNameEN") %> </asp:LinkButton>
                                                        </h4>
                                                    </div>
                                                    <div class="col-sm-4 py-2">
                                                        <div class="d-flex text-center">

                                                            <div class="flex-wrap item-flex">
                                                                <b class="colorICT">Cost</b>
                                                                <h4><b>฿<%#Eval("Fee").ToString().Length >0 ? decimal.Parse(Eval("Fee").ToString()).ToString("N2") : "" %></b> </h4>
                                                            </div>
                                                            <div class="flex-wrap item-flex">
                                                                <b class="colorICT">Apply</b>
                                                                <h3>10 </h3>
                                                            </div>
                                                            <div class="flex-wrap item-flex">

                                                                <asp:HiddenField ID="hfStartRegisdate" runat="server" Value=' <%#Eval("startRegisdate") %>' />
                                                                <asp:HiddenField ID="hfEndRegisdate" runat="server" Value=' <%#Eval("endRegisdate") %>' /> 

                                                                 <%--<%# DateTime.Parse(Eval("startRegisdate").ToString()) > DateTime.Now ?"Y":"N" %>--%>
<%--                                                                <%#  
                                                                      //int.Parse(Eval("statusCourse").ToString()) == 1 ? DateTime.Now.ToString("yyyy-MM-dd") + " <> " + Eval("startRegisdate","yyyy-MM-dd")
                                                                    //int.Parse(Eval("statusCourse").ToString()) == 1 ? "<span class='badge text-bg-success'>Open</span>"
                                                                    //: int.Parse(Eval("statusCourse").ToString()) == 2 ? "<span class='badge text-bg-warning'>Waiting</span>"
                                                                    //: ""
                                                                %>--%>
                                                                <asp:Literal ID="ltrStatus" runat="server"></asp:Literal> 

                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </ItemTemplate>
                                    </asp:Repeater>



                                </div>

                            </ItemTemplate>
                        </asp:Repeater>
                    </div>
                </div>
            </div>


        </ContentTemplate>
    </asp:UpdatePanel>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">
</asp:Content>
