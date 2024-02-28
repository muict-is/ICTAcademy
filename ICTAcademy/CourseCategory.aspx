<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="CourseCategory.aspx.cs" Inherits="ICTAcademy.HomeCoursesList" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <style>
        .up-20 {
            padding-top: 2em;
        }

        .upbggray-10 {
            background-color: #eee;
            margin: 20px
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
                                            
                                            <div class="row upbggray-10 ">
                                                <div class="row">
                                                    <div class="col-md-2 text-center">
                                                        <div style="padding: 10px" >
                                                            <asp:ImageButton ID="Image1" runat="server"  CssClass="text-center" src='<%#Eval("ImageCourse") %>' CommandArgument='<%# Eval("courseDesID") %>' OnCommand="Image1_Command" Style="width: 100%" />
                                                        </div> 
                                                    </div>
                                                    <div class="col-md-6 py-2 text-wrap"> 
                                                        <h4>
                                                            <asp:LinkButton ID="Label1" runat="server" CommandArgument='<%# Eval("courseDesID") %>' OnCommand="Image1_Command" CssClass="text-wrap"><%#Eval("courseName") %> </asp:LinkButton>
                                                        </h4>
                                                    </div>
                                                    <div class="col-md-4 py-2">
                                                        <div class="d-flex text-center">

                                                            <div class="flex-wrap item-flex">
                                                                <b class="colorICT">Cost</b> 
                                                                <h4><b>฿<%#Eval("Fee").ToString().Length >0 ? decimal.Parse(Eval("Fee").ToString ()).ToString("N2") : "0" %></b> </h4>
                                                            </div>
                                                            <div class="flex-wrap item-flex">
                                                                <b class="colorICT">Max</b>
                                                                
                                                                 <asp:Label ID="lbmaxSeat" runat="server" />
                                                            </div>

                                                            <div class="flex-wrap item-flex">
                                                                <b class="colorICT">Avalaible</b>
                                                                <h4><%#Eval("Available") %> </h4>
                                                            </div>
                                                            <div class="flex-wrap item-flex">

                                                                <asp:HiddenField ID="hfStartRegisdate" runat="server" Value=' <%#Eval("startRegisdate") %>' />
                                                                <asp:HiddenField ID="hfEndRegisdate" runat="server" Value=' <%#Eval("endRegisdate") %>' />
                                                                <asp:HiddenField ID="hfAvailable" runat="server" Value=' <%#Eval("Available") %>' />
                                                                <asp:HiddenField ID="hfMaxSeat" runat="server" Value=' <%#Eval("maxSeat") %>' /> 
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
