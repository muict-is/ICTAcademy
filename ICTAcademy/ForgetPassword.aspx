<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ForgetPassword.aspx.cs" Inherits="ICTAcademy.ForgetPassword" %>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Password</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    .reset-password-container {
      max-width: 400px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-top: 50px;
    }
  </style>
</head>
<body>

<div class="container">
  <div class="reset-password-container">
    <h2 class="mb-3">Reset Password</h2>
    <form action="#" method="POST">
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" class="form-control" id="email" name="email" required>
      </div>
      <button type="submit" class="btn btn-primary">Reset Password</button>
      <a href="#" class="d-block mt-3">Back to Login</a>
    </form>
  </div>
</div>

</body>
</html>
