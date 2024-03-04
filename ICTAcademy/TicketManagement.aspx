<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="TicketManagement.aspx.cs" Inherits="ICTAcademy.TicketManagement" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
        <ContentTemplate>
            <div class="container">
                <section class="py-3 ">
                    <h3>Ticket Management</h3>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-4 col-12">
                                <div class="mb-3">
                                    <label for="ddlCourse" class="form-label">ชื่อคอร์ส</label>
                                    <asp:DropDownList runat="server" ID="ddlCourse" CssClass="form-control"></asp:DropDownList>
                                </div>
                            </div>
                            <div class="col-md-2 col-12">
                                <div class="mb-3">
                                    <label for="tbStartDate" class="form-label">วันที่เริ่มต้น</label>
                                    <div class="input-group date datepicker">
                                        <asp:TextBox ID="tbStartDate" CssClass="form-control datetimepicker-input datepicker" runat="server" autocomplete="off"></asp:TextBox>
                                        <div class="input-group-append input-group-text"><i class="fa fa-calendar"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2 col-12">
                                <div class="mb-3">
                                    <label for="tbExpireDate" class="form-label">วันที่สิ้นสุด</label>
                                    <div class="input-group date datepicker">
                                        <asp:TextBox ID="tbExpireDate" CssClass="form-control datetimepicker-input datepicker" runat="server" autocomplete="off"></asp:TextBox>
                                        <div class="input-group-append input-group-text"><i class="fa fa-calendar"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2 col-12">
                                <div class="mb-3">
                                    <label for="ddlStatus" class="form-label">สถานะ</label>
                                    <asp:DropDownList ID="ddlStatus" CssClass="form-control" runat="server"></asp:DropDownList>
                                </div>
                            </div>
                            <div class="col-md-2 col-12">
                                <div class="mb-3" style="margin-top: 2rem;">
                                    <asp:LinkButton runat="server" ID="btnSearch" CssClass="btn btn-primary" Text="ค้นหา" OnClick="btnSearch_Click" />
                                </div>
                            </div>
                        </div>
                    </div>

                </section>


                <section class="mt-2">
                    <div class="card">
                        <div class="card-body">
                            <asp:LinkButton runat="server" ID="btnNewTicket" CssClass="btn btn-outline-primary float-end" OnClick="btnNewTicket_Click">สร้าง Ticket</asp:LinkButton>
                            <p>
                                จำนวนทั้งหมด
                                <asp:Label runat="server" ID="lbDataCout" />
                                รายการ
                            </p>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <tr class="table-primary">
                                        <th>No. </th>
                                        <th>ชื่อคอร์ส </th>
                                        <th>Ticket Code </th>
                                        <th class="text-center">สถานะ </th>
                                        <th class="text-center">ส่วนลด<br />
                                            (%) </th>
                                        <th class="text-center">จำนวน<br />
                                            ทั้งหมด / ใช้งานแล้ว </th>
                                        <th class="text-center">ช่วงเวลา </th>
                                        <th></th>
                                    </tr>
                                    <asp:Repeater runat="server" ID="rptResult" ClientIDMode="AutoID">
                                        <ItemTemplate>
                                            <tr>
                                                <td><%# Container.ItemIndex + 1  %>. </td>
                                                <td style="max-width: 20rem"><%#Eval("CourseNameTH") + "/" + Eval("CourseNameEN") %></td>
                                                <td  style="width: 15%">
                                                     <span class='fw-bold <%#(int)Eval("Status") == 1 ? "text-secondary" : "text-muted"%>'><%#Eval("Code") %></span>
                                                     <a href="javascript:void(0)"  class='<%#(int)Eval("Status") == 1 ? "btn-clipboard text-secondary " : "d-none"%>' data-clipboard-text='<%#Eval("Code") %>' id='<%# "btncp"+(Container.ItemIndex+1).ToString() %>'><i class="fa fa-clone" aria-hidden="true"></i></a>
                                                </td>
                                                <td class="text-center"><%#(int)Eval("Status") == 1 ? "<span class='badge text-bg-success'>ใช้งาน</span>" : "<span class='badge text-bg-danger'>ยกเลิกใช้งาน</span>" %></td>
                                                <td class="text-center fw-bold"><%#Eval("discount") %></td>
                                                <td class="text-center"><%#Eval("limitCode") %> / <%#Eval("usedCode") %></td>
                                                <td class="text-center small">
                                                    <%#Eval("startDate").ToString().Length > 0 ? DateTime.Parse(Eval("startDate").ToString()).ToString("d MMM yy",new System.Globalization.CultureInfo("th-th"))  : "" %> - 
                                                    <%#Eval("expireDate").ToString().Length > 0 ? DateTime.Parse(Eval("expireDate").ToString()).ToString("d MMM yy",new System.Globalization.CultureInfo("th-th")) : "" %>
                                                </td>
                                                <td class="text-center">
                                                    <asp:LinkButton runat="server" CssClass="btn btn-sm btn-secondary" ID="btnEditTicket" OnCommand="btnEditTicket_Command" CommandArgument='<%#Eval("code") %>'>แก้ไข</asp:LinkButton>
                                                </td>
                                            </tr>
                                        </ItemTemplate>
                                    </asp:Repeater>
                                    <tr runat="server" id="rowNoData">
                                        <td colspan="9" class="text-center text-muted fst-italic">- no data </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </ContentTemplate>
    </asp:UpdatePanel>

    <!-- Modal -->
    <div class="modal fade" id="modalEditTicket" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <asp:UpdatePanel runat="server" ID="UpdatePanel2">
                    <ContentTemplate>
                        <div class="modal-header">
                            <h1>
                                <asp:Label runat="server" ID="lbModelEditTitle" CssClass="modal-title fs-5" /></h1>

                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="alert alert-warning" role="alert" runat="server" id="divWarningEdit">
                                <b>การแก้ไข!!!</b> ไม่สามารถแก้ไขบางส่วนได้เนื่องจากมีการใช้งานแล้ว
                            </div>
                            <div class="row mb-3">
                                <div class="col-12">
                                    <label for="ddlCourseEdit" class="form-label fw-bold">ชื่อคอร์ส</label>
                                    <asp:DropDownList runat="server" ID="ddlCourseEdit" CssClass="form-control"></asp:DropDownList>
                                    <asp:RequiredFieldValidator runat="server" ErrorMessage="RequiredFieldValidator" ControlToValidate="ddlCourseEdit" Text="* require" CssClass="text-danger small" InitialValue="0" ValidationGroup="formEdit"></asp:RequiredFieldValidator>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-4 col-12">
                                    <label for="tbTicketEdit" class="form-label fw-bold">Ticket Code</label>
                                    <p>
                                        <asp:Label runat="server" ID="lbTicket" CssClass="text-primary fw-bold fs-5" Enabled="false" />  
                                    </p>
                                </div>
                                <div class="col-md-2 col-12">
                                    <label for="tbDiscountEdit" class="form-label fw-bold">ส่วนลด(%)</label>
                                    <asp:TextBox runat="server" ID="tbDiscountEdit" CssClass="form-control text-end" />
                                    <asp:RangeValidator ID="RangeValidator1" runat="server" ControlToValidate="tbDiscountEdit" ErrorMessage="* ระบุค่า 1-100" CssClass="text-danger small fst-italic" MaximumValue="100" MinimumValue="0" SetFocusOnError="True" Type=" Integer" ValidationGroup="formEdit"></asp:RangeValidator>
                                </div>
                                <div class="col-md-3 col-12">
                                    <label for="tbStartDateEdit" class="form-label fw-bold">วันที่เริ่มต้น</label>
                                    <div class="input-group date datepicker">
                                        <asp:TextBox ID="tbStartDateEdit" CssClass="form-control datetimepicker-input datepicker" runat="server" autocomplete="off"></asp:TextBox>
                                        <div class="input-group-append input-group-text"><i class="fa fa-calendar"></i></div>
                                    </div>
                                    <asp:RequiredFieldValidator runat="server" ErrorMessage="RequiredFieldValidator" ControlToValidate="tbStartDateEdit" Text="* require" CssClass="text-danger small" ValidationGroup="formEdit"></asp:RequiredFieldValidator>
                                </div>
                                <div class="col-md-3 col-12">

                                    <label for="tbExpireDateEdit" class="form-label fw-bold">วันที่สิ้นสุด</label>
                                    <div class="input-group date datepicker">
                                        <asp:TextBox ID="tbExpireDateEdit" CssClass="form-control datetimepicker-input datepicker" runat="server" autocomplete="off"></asp:TextBox>
                                        <div class="input-group-append input-group-text"><i class="fa fa-calendar"></i></div>
                                    </div>
                                    <asp:RequiredFieldValidator runat="server" ErrorMessage="RequiredFieldValidator" ControlToValidate="tbExpireDateEdit" Text="* require" CssClass="text-danger small" ValidationGroup="formEdit"></asp:RequiredFieldValidator>

                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-3 col-12">
                                    <label for="tbAmountEdit" class="form-label fw-bold">จำนวน</label>
                                    <asp:TextBox runat="server" ID="tbAmountEdit" CssClass="form-control text-end" />
                                    <asp:RangeValidator runat="server" ID="rvAmountEdit" ControlToValidate="tbAmountEdit" ErrorMessage="* ระบุค่า 1-1,000" CssClass="text-danger small fst-italic" MinimumValue="1" MaximumValue="1000" SetFocusOnError="True" Type=" Integer" ValidationGroup="formEdit"></asp:RangeValidator>

                                </div>
                                <div class="col-auto mt-5" runat="server" id="divUsedCode">
                                    <span class="fw-lighter">ขณะนี้มีผู้ใช้งานแล้วจำนวน
                                        <asp:Label runat="server" ID="lbUsedCode" CssClass="fw-bold badge text-bg-primary" Text="0" />
                                        คน</span>
                                </div>
                            </div>
                            <div class="row mb-3" runat="server" id="divStatus">
                                <div class="col">
                                    <label class="form-label fw-bold">สถานะ</label>
                                    <div class="form-check form-switch">
                                        <asp:TextBox runat="server" ID="ckbActive" CssClass="form-check-input" type="checkbox" />
                                        <label class="form-check-label" for="ckbActive">ใช้งาน</label>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </ContentTemplate>
                </asp:UpdatePanel>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">ยกเลิก</button>
                    <asp:LinkButton runat="server" ID="btnSaveTicket" CssClass="btn btn-primary" OnClick="btnSaveTicket_Click" ValidationGroup="formEdit">บันทึก</asp:LinkButton>
                </div>


            </div>
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">
    <script type="text/javascript">

        function activeJS() {
            activeDP();
        }

        function activeDP() {
            //---- atvice first
            activeDatePicker();

            //---- set current value to TH format
            setDateText($('#<%= tbStartDate.ClientID%>'));
            setDateText($('#<%= tbExpireDate.ClientID%>'));

            setDateText($('#<%= tbStartDateEdit.ClientID%>'));
            setDateText($('#<%= tbExpireDateEdit.ClientID%>'));

            setMinDateFromStartDate($('#<%= tbStartDate.ClientID%>'), $('#<%= tbExpireDate.ClientID%>'));
            setMinDateFromStartDate($('#<%= tbStartDateEdit.ClientID%>'), $('#<%= tbExpireDateEdit.ClientID%>'))




        }

    </script>
</asp:Content>
