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
    </style>



</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
        <ContentTemplate>
            <section class="py-5 container">
                <h1>Add Course</h1>

                <div class="container">
                    <div class="row">
                        <div class="col-sm-4 text-center">

                            <div class="newPreview">
                                <label class="newbtn drag-area">

                                    <div class="icon">
                                        <i class="fas fa-images"></i>
                                    </div>
                                    <div id="imgPreview" class="newPreviewImage" style="display: none">
                                        <img id="PreviewImage" style="width: 400px">
                                    </div>

                                    <asp:FileUpload ID="FileUpload1" runat="server" onchange="readURL(this);" hidden />

                                    <div id="divCoverPhoto">
                                        <span class="button">Browse Cover Photo</span>
                                        <br>
                                        <span class="support">Supports: JPEG, JPG, PNG</span>
                                    </div>

                                </label>
                            </div>

                            <%-- <div class="newImage">
                                <label class="newbtn">                                    
                                    <img id="PreviewImage" src="/Assets/Images/imagePreview.jpg"  Style="width: 100%">
                                    <asp:FileUpload ID="FileUploadImage" runat="server" onchange="readURL(this);" hidden/>
                                   <input id="pic" class='pis' onchange="readURL(this);" type="file">
                                </label>
                            </div> <Triggers>
                                <asp:PostBackTrigger ControlID="uploadImage"
                            </Triggers>--%>



                            <br>
                            <%--<asp:Button ID="uploadImage" runat="server" Text="Upload Image" CssClass="btn btn-primary" OnClick="uploadImage_Click" />--%>
                        </div>
                        <div class="col-sm-8">
                            <div class="mb-3">
                                <asp:Label for="CourseNameTH" runat="server" Text="Label" CssClass="form-label">Course Name (TH)</asp:Label>
                                <asp:TextBox ID="CourseNameTH" CssClass="form-control" runat="server"></asp:TextBox>
                            </div>
                            <div class="mb-3">
                                <asp:Label for="CourseNameEN" runat="server" Text="Label" CssClass="form-label">Course Name (EN)</asp:Label>
                                <asp:TextBox ID="CourseNameEN" CssClass="form-control" runat="server"></asp:TextBox>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <asp:Label for="stylesID" runat="server" Text="Label" CssClass="form-label">รูปแบบการเรียน</asp:Label>
                                    <asp:DropDownList ID="DropDownList1" runat="server" CssClass="form-select">
                                        <asp:ListItem Value="0" Text=""></asp:ListItem>
                                        <asp:ListItem Value="1" Text="Instructor-paced : ผู้สอนเป็นผู้กำหนดกิจกรรมตามระยะเวลาเรียนออนไลน์" />
                                        <asp:ListItem Value="2" Text="Self-paced : ผู้เรียนสามารถเลือกเนื้อหาและเวลาเรียน" />
                                    </asp:DropDownList>
                                </div>
                                <div class="col-sm-6">
                                    <asp:Label for="stylesID" runat="server" Text="Label" class="form-label">Category  </asp:Label>
                                    <asp:DropDownList ID="stylesID" runat="server" CssClass="form-select">
                                        <asp:ListItem Value="0" Text="" />
                                        <asp:ListItem Value="1" Text="Cyber Security" />
                                    </asp:DropDownList>
                                </div>
                            </div>
                            <div class="mb-3">
                                <asp:Label for="Tag" runat="server" Text="Label" class="form-label">Tag</asp:Label>
                                <asp:TextBox ID="Tag" CssClass="form-control" runat="server"></asp:TextBox>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <asp:Label for="maxSeat" runat="server" Text="Label" class="form-label">จำนวนที่เปิดรับสมัคร</asp:Label>
                                    <asp:TextBox ID="maxSeat" CssClass="form-control" runat="server" TextMode="Number"></asp:TextBox>

                                </div>
                                <div class="col-sm-6">
                                    <asp:Label for="fee" runat="server" Text="Label" class="form-label">ราคา (บาท)</asp:Label>
                                    <asp:TextBox ID="fee" CssClass="form-control" runat="server" TextMode="Number"></asp:TextBox>

                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-6">
                                    <asp:Label for="totalHour" runat="server" Text="Label" class="form-label">จำนวนชั่วโมงการเรียน</asp:Label>
                                    <asp:TextBox ID="totalHour" CssClass="form-control" runat="server" placeholder="Example. 30 ชั่วโมง"></asp:TextBox>
                                </div>
                                <div class="col-sm-6">
                                    <asp:Label for="hourPerWeek" runat="server" Text="Label" class="form-label">จำนวนชั่วโมงที่ต้องใช้ในการเรียนรู้ต่อสัปดาห์/หรือต่อครั้ง</asp:Label>
                                    <asp:TextBox ID="hourPerWeek" CssClass="form-control" runat="server" placeholder="Example. 2 ชั่วโมงต่อครั้ง"></asp:TextBox>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="row mb-3">
                                <div class="col-sm-4">
                                    <asp:Label for="periodTimeID" runat="server" Text="Label" class="form-label">ช่วงเวลาเรียน</asp:Label>
                                    <asp:DropDownList ID="periodTimeID" runat="server" CssClass="form-select">
                                        <asp:ListItem Value="0" Text=""></asp:ListItem>
                                        <asp:ListItem Value="1" Text="Instructor-paced : ผู้สอนเป็นผู้กำหนดกิจกรรมตามระยะเวลาเรียนออนไลน์" />
                                        <asp:ListItem Value="2" Text="Self-paced : ผู้เรียนสามารถเลือกเนื้อหาและเวลาเรียน" />
                                    </asp:DropDownList>
                                </div>
                                <div class="col-sm-4">
                                    <asp:Label for="startLeaening" runat="server" Text="Label" class="form-label">วันเริ่มคอร์ส  </asp:Label>
                                    <asp:TextBox ID="startLeaening" CssClass="form-control" runat="server" placeholder=""></asp:TextBox>
                                </div>
                                <div class="col-sm-4">
                                    <asp:Label for="endLeaening" runat="server" Text="Label" class="form-label">วันสิ้นสุดคอร์ส  </asp:Label>
                                    <asp:TextBox ID="endLeaening" CssClass="form-control" runat="server" placeholder=""></asp:TextBox>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-4">
                                    <asp:Label for="startdate" runat="server" Text="Label" class="form-label">วันที่เปิดรับสมัคร  </asp:Label>
                                    <asp:TextBox ID="startdate" CssClass="form-control" runat="server" placeholder=""></asp:TextBox>
                                </div>
                                <div class="col-sm-4">
                                    <asp:Label for="enddate" runat="server" Text="Label" class="form-label">วันที่ปิดรับสมัคร  </asp:Label>
                                    <asp:TextBox ID="enddate" CssClass="form-control" runat="server" placeholder=""></asp:TextBox>
                                </div>
                                <div class="col-sm-4">
                                    <br>
                                    <asp:Button ID="extendTime" runat="server" Text="กรณีขยายเวลา" CssClass="btn btn-outline-primary" />
                                </div>
                            </div>
                            <br>
                            <hr>
                            <br>

                            <h3>Instructor</h3>
                            <br>

                            <asp:Repeater runat="server" ID="rptAddInstrutor" ClientIDMode="AutoID">
                                <ItemTemplate>
                                    <div class="row mb-3" id="AddInstrutor">

                                        <div class="col-sm-2 text-center">
                                            <div class="newPreview">
                                                <label class="newbtn drag-area">

                                                    <div class="icon"> 
                                                        <i class="fas fa-images"></i>
                                                    </div>
                                                    <div id="imgPreview2" style="display: none">
                                                        <img id="PreviewImage2" style="width: 400px">
                                                    </div>

                                                    <asp:FileUpload ID="FileUpload2" runat="server" onchange="readInstructor(this);" hidden />

                                                    <div id="divCoverPhoto2">
                                                        <span class="button">Browse Cover Photo</span>
                                                        <br>
                                                        <span class="support">Supports: JPEG, JPG, PNG</span>
                                                    </div>

                                                </label>
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
                                </ItemTemplate>
                            </asp:Repeater>

                            <div class="row mb-3 justify-content-md-center">
                                <div class="col-8 col-md-2">
                                    <asp:Button ID="BAddInstruture" runat="server" Text="เพิ่มอาจารย์" class="btn btn-outline-primary" />
                                </div>
                            </div>
                            <br>
                            <hr>
                            <br>

                            <div class="row mb-3">
                                <div class="col-sm-12">

                                    <asp:Label for="courseDescription" runat="server" Text="Label" class="form-label">รายละเอียดคอร์ส  </asp:Label>
                                    <asp:TextBox runat="server" CssClass="form-control d-none" ID="tbEmailMessage" TextMode="multiline" Rows="5"></asp:TextBox>

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

                </div>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <asp:Button ID="Button3" runat="server" Text="DRAFT" CssClass="btn btn-secondary" />
                    <asp:Button ID="Button4" runat="server" Text="POST" CssClass="btn btn-primary" />
                </div>
            </section>
        </ContentTemplate>
    </asp:UpdatePanel>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">

    <script src="Scripts/classicEditor.js"></script>
    <script src="Scripts/JavaScript.js"></script>
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

        function readInstructor(input) {


            if (input.files && input.files[0] && input.files[0].type.match('image.*')) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    //set image source
                    //document.getElementById("imgPreview").style.display = "";
                    //document.getElementById("divCoverPhoto").style.display = "none";

                    //$('#PreviewImage').attr('src', e.target.result);
                    var imgPreview = input.parentElement.querySelector('img');
                    imgPreview.src = e.target.result;
                    alert(imgPreview);

                };

                reader.readAsDataURL(input.files[0]);
            }
        }

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



    </script>
</asp:Content>
