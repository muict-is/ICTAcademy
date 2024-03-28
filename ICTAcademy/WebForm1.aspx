<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="ICTAcademy.WebForm1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div class="row">
            <div class="col-md-2 col-12">
                <div class="mb-3">
                    <label for="tbStartDate" class="form-label">วันที่เริ่มต้น</label>
                    <div class="input-group date datepicker">
                        <asp:TextBox ID="tbStartDate" CssClass="form-control datetimepicker-input datepicker" runat="server" autocomplete="off"></asp:TextBox>
                        <div class="input-group-append input-group-text"><i class="fa fa-calendar"></i></div>
                    </div>
                </div>
            </div>
        </div>
        </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">
    <script>
        function activeJS() {

            activeDP();
        }

        function activeDP() {
            //---- atvice first
            activeDatePicker();


        }

    </script>
</asp:Content>
