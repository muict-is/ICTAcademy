<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Sample.aspx.cs" Inherits="ICTAcademy.Sample" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
        <ContentTemplate>
            <div class="container">
                <asp:Repeater runat="server" ID="rptFormStudent" ClientIDMode="AutoID" OnItemDataBound="rptFormStudent_ItemDataBound">
                    <ItemTemplate>
                        <div class="card m-3">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-auto fw-bold">Student ID:</div>
                                    <div class="col-auto">
                                        <asp:TextBox runat="server" ID="tbStudentID" CssClass="form-control" />
                                    </div> 
                                    <div class="col-auto fw-bold">Year : </div>
                                    <div class="col-auto">
                                        <asp:DropDownList runat="server" ID="ddlYear" CssClass="form-control"></asp:DropDownList></div>
                                </div>
                            </div>
                        </div>
                    </ItemTemplate>
                </asp:Repeater>

                <asp:LinkButton runat="server" ID="btnAdd" CssClass="btn btn-primary" Text="Add Student" OnClick="btnAdd_Click" />
                <asp:LinkButton runat="server" ID="btnbSave" CssClass="btn btn-outline-success" Text="Save Data" OnClick="btnbSave_Click"/>

                <hr/>
                <asp:Label runat="server" ID="log" />
            </div>
        </ContentTemplate>
    </asp:UpdatePanel>
</asp:Content>
