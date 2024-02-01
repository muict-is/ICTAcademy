<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Sample2_AddCourse.aspx.cs" Inherits="ICTAcademy.Sample2_AddCourse" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
        <ContentTemplate>
            <div class="container mt-3">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="mb-3">
                                    <asp:Label for="tbCourseCode" runat="server" Text="Label" CssClass="form-label">Course Code</asp:Label>
                                    <asp:TextBox ID="tbCourseCode" CssClass="form-control" runat="server"></asp:TextBox>
                                    <asp:RequiredFieldValidator ID="reqCourseCode" runat="server" ControlToValidate="tbCourseCode" ErrorMessage="* require" ForeColor="Red"></asp:RequiredFieldValidator>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="mb-3">
                                    <asp:Label for="tbCourseNameTH" runat="server" Text="Label" CssClass="form-label">Course Name (TH)</asp:Label>
                                    <asp:TextBox ID="tbCourseNameTH" CssClass="form-control" runat="server"></asp:TextBox>
                                    <asp:RequiredFieldValidator ID="reqCourseNameTH" runat="server" ControlToValidate="tbCourseNameTH" ErrorMessage="* require" ForeColor="Red"></asp:RequiredFieldValidator>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="mb-3">
                                    <asp:Label for="tbCourseNameEN" runat="server" Text="Label" CssClass="form-label">Course Name (EN)</asp:Label>
                                    <asp:TextBox ID="tbCourseNameEN" CssClass="form-control" runat="server"></asp:TextBox>
                                    <asp:RequiredFieldValidator ID="reqCourseNameEN" runat="server" ControlToValidate="tbCourseNameEN" ErrorMessage="* require" ForeColor="Red"></asp:RequiredFieldValidator>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="mb-3">
                                    <asp:Label for="ddlLearningStyle" runat="server" Text="Label" CssClass="form-label">รูปแบบการเรียน</asp:Label>
                                    <asp:DropDownList ID="ddlLearningStyle" runat="server" CssClass="form-select"></asp:DropDownList>
                                    <asp:RequiredFieldValidator ID="reqLearningStyle"  runat="server" ControlToValidate="ddlLearningStyle" ErrorMessage="* please select"  InitialValue="0" ForeColor="Red" />
                                </div>
                            </div>
                            <div class="col-12">
                                <asp:Button runat="server" ID="btnAddCourse" CssClass="btn btn-success" Text="Add Course" OnClick="btnAddCourse_Click" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ContentTemplate>
    </asp:UpdatePanel>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">
</asp:Content>
