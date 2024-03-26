<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="AddCourse.aspx.cs" Inherits="ICTAcademy.AddCourse1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .ck-content {
            height: 10rem;
        }

        .btn-my-light {
            color: #212529;
            background-color: #d9ddde;
            border-color: #efe1e2;
        }

            .btn-my-light:hover {
                color: #212529;
                background-color: #aeb1b5;
                border-color: #dae0e5;
            }

        #pic {
            display: none;
        }

        .newbtn {
            cursor: pointer;
        }

        .drag-area {
            height: 300px;
            border: 3px dashed #e0eafc;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            margin: 10px auto;
        }

            .drag-area .icon {
                font-size: 50px;
                color: #1683ff;
            }

            .drag-area .header {
                font-size: 20px;
                font-weight: 500;
                color: #34495e;
            }

            .drag-area .support {
                font-size: 12px;
                color: gray;
                margin: 10px 0 15px 0;
            }

            .drag-area .button {
                font-size: 20px;
                font-weight: 500;
                color: #1683ff;
                cursor: pointer;
            }

            .drag-area.active {
                border: 2px solid #1683ff;
            }

            .drag-area img {
                width: 100%;
                height: 300px;
                object-fit: cover;
            }

        .drag-area2 {
            height: 120px;
            border: 3px dashed #e0eafc;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            margin: 10px auto;
        }

            .drag-area2 .icon {
                font-size: 24px;
                color: #1683ff;
            }

            .drag-area2 .header {
                font-size: 16px;
                font-weight: 500;
                color: #34495e;
            }

            .drag-area2 .support {
                font-size: 12px;
                color: gray;
                margin: 10px 0 15px 0;
            }

            .drag-area2 .button {
                font-size: 16px;
                font-weight: 500;
                color: #1683ff;
                cursor: pointer;
            }

            .drag-area2.active {
                border: 2px solid #1683ff;
            }

            .drag-area2 img {
                width: 100%;
                height: 300px;
                object-fit: cover;
            }
    </style>



</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <!-- for test -->
    <%--<div class="container mt-3">
        <div class="card">
            <div class="card-body">
                <div class="input-group mb-3">
                    <asp:FileUpload ID="FileUpload3" runat="server" CssClass="form-control" />
                    <asp:LinkButton runat="server" ID="btnTestFileUpload" OnClick="btnTestFileUpload_Click" CssClass="btn btn-primary" Text="test upload" />
                </div>
            </div>
        </div>
    </div>--%>

    <asp:UpdatePanel ID="UpdatePanel1" runat="server" UpdateMode="Conditional">
        <ContentTemplate>

            <section class="py-5 container">
                <h1>Add Course</h1>

                <div class="container">
                    <div class="row">
                        <div class="col-sm-4 ">

                            <div class="newPreview text-center">
                                <label class="newbtn drag-area">

                                    
                                    <div id="imgPreview" class="newPreviewImage" style="display: none">
                                        <asp:Image id="PreviewImage" style="width: 350px" runat="server" />
                                        
                                    </div>

                                    <asp:FileUpload ID="FileUpload1" runat="server" onchange="readURL(this);" hidden />

                                    <div id="divCoverPhoto">
                                        <div class="icon">
                                        <i class="fas fa-images"></i>
                                    </div>
                                        <span class="button">Browse Cover Photo</span>
                                        <br>
                                        <span class="support">Supports: JPEG, JPG, PNG</span>
                                    </div>

                                </label>
                            </div>




                            <br>
                            <%--<asp:Button ID="uploadImage" runat="server" Text="Upload Image" CssClass="btn btn-primary" OnClick="uploadImage_Click" />--%>
                        </div>
                        <div class="col-sm-8">
                            <div class="mb-3">
                                <asp:Label for="CourseNameTH" runat="server" Text="Label" CssClass="form-label fw-bold">Course Name (TH) <span class="text-danger">*</span></asp:Label>
                                <asp:TextBox ID="CourseNameTH" CssClass="form-control" runat="server"></asp:TextBox>
                                <asp:RequiredFieldValidator CssClass="rfv" ID="RequiredFieldddGender" runat="server" ErrorMessage="Please provide a Course Name (TH)." ControlToValidate="CourseNameTH" ForeColor="Red" Display="Dynamic"></asp:RequiredFieldValidator>
                            </div>
                            <div class="mb-3">
                                <asp:Label for="CourseNameEN" runat="server" Text="Label" CssClass="form-label fw-bold">Course Name (EN) <span class="text-danger">*</span></asp:Label>
                                <asp:TextBox ID="CourseNameEN" CssClass="form-control" runat="server"></asp:TextBox>
                                <asp:RequiredFieldValidator CssClass="rfv" ID="RequiredFieldValidator1" runat="server" ErrorMessage="Please provide a Course Name (EN)." ControlToValidate="CourseNameEN" ForeColor="Red" Display="Dynamic"></asp:RequiredFieldValidator>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <asp:Label for="stylesID" runat="server" Text="Label" CssClass="form-label fw-bold">รูปแบบการเรียน <span class="text-danger">*</span></asp:Label>
                                    <asp:DropDownList ID="stylesID" runat="server" CssClass="form-select"></asp:DropDownList>
                                    <asp:RequiredFieldValidator CssClass="rfv" ID="RequiredFieldValidator2" runat="server" ErrorMessage="Please provide a Course Learning Style." ControlToValidate="stylesID" ForeColor="Red" Display="Dynamic"></asp:RequiredFieldValidator>
                                </div>
                                <div class="col-sm-6">
                                    <asp:Label for="CategoryID" runat="server" Text="Label" class="form-label fw-bold">Category  <span class="text-danger">*</span></asp:Label>
                                    <asp:DropDownList ID="CategoryID" runat="server" CssClass="form-select">
                                    </asp:DropDownList>
                                    <asp:RequiredFieldValidator CssClass="rfv" ID="RequiredFieldValidator3" runat="server" ErrorMessage="Please provide a Category." ControlToValidate="CategoryID" ForeColor="Red" Display="Dynamic"></asp:RequiredFieldValidator>
                                </div>
                            </div>
                            <%-- <div class="mb-3">
                                <asp:Label for="Tag" runat="server" Text="Label" class="form-label">Tag</asp:Label>
                                <asp:TextBox ID="Tag" CssClass="form-control" runat="server"></asp:TextBox>
                            </div>--%>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <asp:Label for="maxSeat" runat="server" Text="Label" class="form-label fw-bold">จำนวนที่เปิดรับสมัคร</asp:Label>
                                    <asp:TextBox ID="maxSeat" CssClass="form-control" runat="server" TextMode="Number" placeholder="หากไม่จำกัดจำนวน ไม่ต้องระบุตัวเลข"></asp:TextBox>
                                </div>
                                <div class="col-sm-6">
                                    <asp:Label for="fee" runat="server" Text="Label" class="form-label fw-bold">Fee (Bath)</asp:Label>
                                    <asp:TextBox ID="fee" CssClass="form-control" runat="server" TextMode="Number" placeholder="หากไม่มีค่าธณรมเนียม ระบุเลข 0"></asp:TextBox>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <asp:Label for="totalHour" runat="server" class="form-label fw-bold">จำนวนชั่วโมงการเรียน</asp:Label>
                                    <asp:TextBox ID="totalHour" CssClass="form-control" runat="server" placeholder="Ex. 30 ชั่วโมง"></asp:TextBox>
                                </div>
                                <div class="col-sm-6">
                                    <asp:Label for="hourPerWeek" runat="server" class="form-label fw-bold">จำนวนชั่วโมงที่ต้องใช้ในการเรียนรู้ต่อสัปดาห์/หรือต่อครั้ง</asp:Label>
                                    <asp:TextBox ID="hourPerWeek" CssClass="form-control" runat="server" placeholder="Ex. 2 ชั่วโมงต่อครั้ง"></asp:TextBox>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-sm-12">
                                    <asp:Label for="tblinkUrl" runat="server" CssClass="form-label fw-bold">Link Video <span class="text-danger ">(If Any)</span></asp:Label>
                                    <asp:TextBox ID="tblinkUrl" CssClass="form-control" runat="server"></asp:TextBox>
                                    <asp:Label ID="lblinkUrl" runat="server"></asp:Label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <%-- <div class="row mb-3">
                                <div class="col-sm-4">
                                    <asp:Label for="periodTimeID" runat="server" Text="Label" class="form-label">ช่วงเวลาเรียน</asp:Label>
                                    <asp:DropDownList ID="periodTimeID" runat="server" CssClass="form-select">                                        
                                    </asp:DropDownList>
                                </div>
                                <div class="col-sm-4 dtDate">
                                    <asp:Label for="startLeaening" runat="server" Text="Label" class="form-label">วันเริ่มคอร์ส  </asp:Label>
                                    <asp:TextBox ID="startLeaening" CssClass="form-control" TextMode="Date" runat="server" placeholder=""></asp:TextBox>
                                </div>
                                <div class="col-sm-4 dtDate">
                                    <asp:Label for="endLeaening" runat="server" Text="Label" class="form-label">วันสิ้นสุดคอร์ส  </asp:Label>
                                    <asp:TextBox ID="endLeaening" CssClass="form-control" TextMode="Date" runat="server" placeholder=""></asp:TextBox>
                                </div> 
                            </div>--%>

                            <br>
                            <hr>
                            <br>


                            <h3>Application Deadline</h3>
                            <asp:Repeater runat="server" ID="rptAddDate" ClientIDMode="AutoID" OnItemDataBound="rptAddDate_ItemDataBound">
                                <ItemTemplate>
                                    <div class="card mb-3 dtDate" id="AddInstrutor">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <label for="tbStartDate" class="form-label">วันที่เปิดรับสมัคร</label>
                                                    <div class="input-group date datepicker">
                                                        <asp:TextBox ID="tbStartDate" CssClass="form-control datetimepicker-input datepicker" data-date-language="th-th" runat="server" autocomplete="off"></asp:TextBox>
                                                        <div class="input-group-append input-group-text"><i class="fa fa-calendar"></i></div>
                                                    </div>


                                                </div>
                                                <div class="col-sm-6">
                                                    <label for="tbEndDate" class="form-label">วันที่ปิดรับสมัคร</label>
                                                    <div class="input-group date datepicker">
                                                        <asp:TextBox ID="tbEndDate" CssClass="form-control datetimepicker-input datepicker" data-date-language="th-th" runat="server" autocomplete="off"></asp:TextBox>
                                                        <div class="input-group-append input-group-text"><i class="fa fa-calendar"></i></div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </ItemTemplate>
                            </asp:Repeater>



                            <%-- <div class="row mb-3 justify-content-md-center">
                                <div class="col-8 col-md-2 center">
                                    <asp:Button ID="BAddExtendTime" runat="server" Text="Deadline extended" CssClass="btn btn-outline-primary" OnClick="BAddExtendTime_Click" />
                                </div>
                            </div>--%>


                            <br>

                            <h3>Instructor</h3>

                            <asp:Repeater runat="server" ID="rptAddInstrutor" ClientIDMode="AutoID" OnItemDataBound="rptAddInstrutor_ItemDataBound">
                                <ItemTemplate>

                                    <div class="card m-3" id="AddInstrutor">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-sm-2 text-center">
                                                    <div class="newPreview">
                                                        <label class="newbtn drag-area2">
                                                            

                                                            <div id="imgPreview2" class="ClassimgPreview <%#  Eval("Image") == null ? "d-none" : Eval("Image") %>"   >                                                               
                                                                <asp:Image ID="PreviewImage" runat="server" Style="width: 200px; height: 120px" />
                                                            </div>
                                                            <asp:FileUpload ID="FileUploadImage" runat="server" onchange="onSelectedFile(this);" accept="image/*" hidden />
                                                            <div id="divCoverPhoto2" class="ClassCoverPhoto" runat="server">
                                                                <div class="icon ">
                                                                    <i class="fas fa-images"></i>
                                                                </div>
                                                                <span class="button">Browse Cover Photo</span>
                                                                <br>
                                                                <span class="support">Supports: JPEG, JPG, PNG</span>
                                                            </div>

                                                            

                                                            <%--<asp:Image Width="300px" ID="previewImage" runat="server" />
                                                            <label class="btn btn-primary">
                                                                File Upload
                                                                <asp:FileUpload runat="server" ID="FileUploadImage" hidden onchange="onSelectedFile(this)" accept="image/*" />

                                                            </label> --%>
                                                    </div>
                                                </div>
                                                <div class="col-sm-10">
                                                    <div class="row mb-3">
                                                        <div class="col-sm-6">
                                                            <asp:Label for="Fullname" runat="server" Text="Label" class="form-label">ชื่อ-นามสกุล อาจารย์ผู้สอน  </asp:Label>
                                                            <asp:TextBox ID="Fullname" CssClass="form-control" runat="server" placeholder=""></asp:TextBox>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <asp:Label for="position" runat="server" Text="Label" class="form-label">ตำแหน่ง  </asp:Label>
                                                            <asp:TextBox ID="position" CssClass="form-control" runat="server" placeholder=""></asp:TextBox>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <asp:Label for="work" runat="server" Text="Label" class="form-label">ส่วนงาน/สถาบัน   </asp:Label>
                                                            <asp:TextBox ID="work" CssClass="form-control" runat="server" placeholder=""></asp:TextBox>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <asp:Label for="email" runat="server" Text="Label" class="form-label">Email  </asp:Label>
                                                            <asp:TextBox ID="email" CssClass="form-control" runat="server" placeholder=""></asp:TextBox>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </ItemTemplate>
                            </asp:Repeater>


                            <div class="row mb-3 justify-content-md-center">
                                <div class="col-8 col-md-2">
                                    <asp:LinkButton ID="BAddInstruture" runat="server" CssClass="btn btn-outline-primary" OnClick="BAddInstruture_Click" CausesValidation="false">Add Instructor</asp:LinkButton>

                                </div>
                            </div>
                            <br>
                            <hr>
                            <br>

                            <div class="row mb-3">
                                <div class="col-sm-12">

                                    <asp:Label for="courseDescription" runat="server" Text="Label" class="form-label">รายละเอียดคอร์ส  </asp:Label>
                                    <asp:TextBox runat="server" CssClass="form-control d-none" ID="courseDescription" TextMode="multiline" Rows="5"></asp:TextBox>

                                    <div id="editor"></div>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-sm-12">

                                    <asp:Label for="courseObjective" runat="server" Text="Label" class="form-label">วัตถุประสงค์การเรียนรู้  </asp:Label>
                                    <asp:TextBox runat="server" CssClass="form-control d-none" ID="courseObjective" TextMode="multiline" Rows="5"></asp:TextBox>

                                    <div id="editor2"></div>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-sm-12">

                                    <asp:Label for="courseProgram" runat="server" Text="Label" class="form-label">เนื้อหาการเรียน  </asp:Label>
                                    <asp:TextBox runat="server" CssClass="form-control d-none" ID="courseProgram" TextMode="multiline" Rows="5"></asp:TextBox>

                                    <div id="editor3"></div>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-sm-12">

                                    <asp:Label for="courseEvaluation" runat="server" Text="Label" class="form-label">การวัดและประเมินผล  </asp:Label>
                                    <asp:TextBox runat="server" CssClass="form-control d-none" ID="courseEvaluation" TextMode="multiline" Rows="5"></asp:TextBox>

                                    <div id="editor4"></div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <asp:Button ID="BtnDraft" runat="server" Text="Draft" CssClass="btn btn-secondary" />
                        <asp:Button ID="BtnSubmit" runat="server" Text="Submit" CssClass="btn btn-primary" OnClick="BtnSubmit_Click" />
                    </div>

                </div>

            </section>

        </ContentTemplate>

        <Triggers>
            <asp:PostBackTrigger ControlID="BAddInstruture" />
        </Triggers>
    </asp:UpdatePanel>

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

    <script src="Scripts/classicEditor.js"></script>
    <%--<script src="Scripts/JavaScript.js"></script>--%>
    <script type="text/javascript">

        $('.newbtn').bind("click", function () {
            $('#pic').click();
        });

        function readURL(input) {
            if (input.files && input.files[0] && input.files[0].type.match('image.*')) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    //set image source
                    document.getElementById("imgPreview").style.display = "";
                    document.getElementById("divCoverPhoto").style.display = "none";

                    //$('#PreviewImage').attr('src', e.target.result);
                    var imgPreview = input.parentElement.querySelector('img');
                    imgPreview.src = e.target.result;

                };

                reader.readAsDataURL(input.files[0]);
            }
        }

        //function readInstructor(input) {


        //    if (input.files && input.files[0] && input.files[0].type.match('image.*')) {
        //        var reader = new FileReader();

        //        reader.onload = function (e) {
        //            //set image source
        //            document.getElementById("imgPreview2").style.display = "";
        //            document.getElementById("divCoverPhoto2").style.display = "none";

        //            var imgPreview = input.parentElement.querySelector('img');
        //            imgPreview.src = e.target.result;



        //            //alert(e.target.result);

        //        };

        //        reader.readAsDataURL(input.files[0]);
        //    }
        //}

        ClassicEditor
            .create(document.querySelector('#editor'))
            .catch(error => {
                console.error(error);
            });


        ClassicEditor
            .create(document.querySelector('#editor2'))
            .catch(error => {
                console.error(error);
            });

        ClassicEditor
            .create(document.querySelector('#editor3'))
            .catch(error => {
                console.error(error);
            });

        ClassicEditor
            .create(document.querySelector('#editor4'))
            .catch(error => {
                console.error(error);
            });



        function onSelectedFile(input) {
            var imgPreview = input.parentElement.parentElement.querySelector('img');

            //check is file selected is image
            if (input.files && input.files[0] && input.files[0].type.match('image.*')) {
                var reader = new FileReader();
                reader.onload = function (e) {


                    var imgP = input.parentElement.parentElement.querySelector('.ClassimgPreview');
                    var coverPhoto = input.parentElement.parentElement.querySelector('.ClassCoverPhoto');

                    imgP.style.display = "";
                    coverPhoto.style.display = "none";


                    imgPreview.src = e.target.result;

                    // var bt = input.parentElement.parentElement.querySelector('button');
                };
                reader.readAsDataURL(input.files[0]);

            }
        }

    </script>

</asp:Content>
