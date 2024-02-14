<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="TicketManagement.aspx.cs" Inherits="ICTAcademy.TicketManagement" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
        <ContentTemplate>
            <div class="container">
                <section class="py-3 ">
                    <h3>Ticker Management</h3>

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
                                    <asp:TextBox ID="tbStartDate" CssClass="form-control" TextMode="Date" runat="server" placeholder=""></asp:TextBox>
                                </div>
                            </div>
                            <div class="col-md-2 col-12">
                                <div class="mb-3">
                                    <label for="tbExpireDate" class="form-label">วันที่สิ้นสุด</label>
                                    <asp:TextBox ID="tbExpireDate" CssClass="form-control" TextMode="Date" runat="server" placeholder=""></asp:TextBox>
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
                        <div class="card-header">
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
                                        <th>สถานะ </th>
                                        <th>ส่วนลด </th>
                                        <th>จำนวนทั้งหมด </th>
                                        <th>จำนวนที่ใช้งานแล้ว </th>
                                        <th>วันที่เริ่มต้น </th>
                                        <th>วันที่สิ้นสุด </th>
                                        <th></th>
                                    </tr>
                                    <asp:Repeater runat="server" ID="rptResult" ClientIDMode="AutoID">
                                        <ItemTemplate>
                                            <tr>
                                                <td><%# Container.ItemIndex + 1  %>. </td>
                                                <td><%#Eval("CourseNameTH") + "/" + Eval("CourseNameEN") %></td>
                                                <td class="text-center"><%#(int)Eval("Status") == 1 ? "<span class='badge text-bg-success'>ใช้งาน</span>" : "<span class='badge text-bg-danger'>ยกเลิกใช้งาน</span>" %></td>
                                                <td class="text-center"><%#Eval("discount") %> %</td>
                                                <td class="text-center"><%#Eval("limitCode") %></td>
                                                <td class="text-center"><%#Eval("usedCode") %></td>
                                                <td class="text-center"><%#Eval("startDate").ToString().Length > 0 ? DateTime.Parse(Eval("startDate").ToString()).ToString("dd MMM yy") : "-" %></td>
                                                <td class="text-center"><%#Eval("expireDate").ToString().Length > 0 ? DateTime.Parse(Eval("expireDate").ToString()).ToString("dd MMM yy") : "-" %></td>
                                                <td class="text-center">
                                                    <asp:LinkButton runat="server" CssClass="btn btn-sm btn-outline-secondary" ID="btnEditTicket" OnCommand="btnEditTicket_Command" CommandArgument='<%#Eval("discountCodeID") %>'>แก้ไข</asp:LinkButton>
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
    <div class="modal fade" id="modalEditTicket" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                            <div class="row mb-3">
                                <div class="col-12">
                                    <label for="ddlCourseEdit" class="form-label fw-bold">ชื่อคอร์ส</label>
                                    <asp:DropDownList runat="server" ID="ddlCourseEdit" CssClass="form-control"></asp:DropDownList>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-4 col-12">
                                    <label for="tbTicketEdit" class="form-label fw-bold">Ticket Code</label>
                                    <asp:TextBox runat="server" ID="tbTicketEdit" CssClass="form-control" Enabled="false" />
                                </div>
                                <div class="col-md-2 col-12">
                                    <label for="tbDiscountEdit" class="form-label fw-bold">ส่วนลด</label>
                                    <asp:TextBox runat="server" ID="tbDiscountEdtit" CssClass="form-control" />
                                </div>
                                <div class="col-md-3 col-12">
                                    <label for="tbStartDateEdit" class="form-label fw-bold">วันที่เริ่มต้น</label>
                                    <asp:TextBox ID="tbStartDateEdit" CssClass="form-control" TextMode="Date" runat="server" placeholder=""></asp:TextBox>
                                </div>
                                <div class="col-md-3 col-12">
                                    <label for="tbExpireDateEdit" class="form-label fw-bold">วันที่สิ้นสุด</label>
                                    <asp:TextBox ID="tbExpireDateEdit" CssClass="form-control" TextMode="Date" runat="server" placeholder=""></asp:TextBox>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-3 col-12">
                                    <label for="tbAmountEdit" class="form-label fw-bold">จำนวน</label>
                                    <asp:TextBox runat="server" ID="tbAmountEdit" CssClass="form-control" />
                                </div>
                                <div class="col-auto mt-5">
                                    <span class="fw-lighter">ขณะนี้มีผู้ใช้งานแล้วจำนวน
                                        <asp:Label runat="server" ID="lbUsedCode" CssClass="fw-bolder" Text="0" />
                                        คน</span>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col">
                                    <div class="form-check form-switch">
                                        <asp:TextBox runat="server" ID="ckbActive" CssClass="form-check-input" type="checkbox" checked />
                                        <label class="form-check-label" for="ckbActive">ใช้งาน</label>
                                    </div>
                                    
                                </div>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ยกเลิก</button>
                            <asp:LinkButton runat="server" ID="btnSaveTicket" CssClass="btn btn-primary" OnClick="btnSaveTicket_Click">บันทึก</asp:LinkButton>
                        </div>
                    </ContentTemplate>
                </asp:UpdatePanel>

            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">
</asp:Content>
