<%@ taglib prefix="d" uri="my.app.tags" %>
<jsp:useBean id="employee" class="app.components.EmployeeBean" scope="request"/>

<html>
<head>
    <title>Register Employee</title>

    <style>
        body {
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #1e3c72, #2a5298);
            font-family: 'Segoe UI', Arial, sans-serif;
            color: #fff;
        }

        .container {
            width: 90%;
            max-width: 600px;
            margin: 40px auto;
            background: #ffffffee;
            padding: 30px 35px;
            border-radius: 14px;
            box-shadow: 0px 10px 35px rgba(0,0,0,0.25);
            color: #333;
            animation: pop 0.35s ease-in-out;
        }

        @keyframes pop {
            from { opacity: 0; transform: scale(0.95); }
            to   { opacity: 1; transform: scale(1); }
        }

        h1 {
            text-align: center;
            font-size: 26px;
            margin-bottom: 10px;
            color: #1e3c72;
        }

        .timestamp {
            text-align: center;
            margin-bottom: 20px;
            color: #666;
        }

        label {
            font-weight: bold;
            display: block;
            margin-top: 12px;
        }

        input[type="text"],
        input[type="password"],
        input[type="date"],
        input[type="number"] {
            width: 100%;
            padding: 10px;
            margin-top: 6px;
            border-radius: 8px;
            border: 1px solid #bbb;
            font-size: 15px;
            transition: 0.3s;
        }

        input:focus {
            border-color: #1e3c72;
            box-shadow: 0 0 8px rgba(30, 60, 114, 0.3);
        }

        button, input[type="submit"] {
            width: 100%;
            margin-top: 22px;
            padding: 12px;
            background: #1e3c72;
            border: none;
            border-radius: 10px;
            color: white;
            font-size: 17px;
            cursor: pointer;
            transition: 0.3s;
        }

        button:hover, input[type="submit"]:hover {
            background: #162c54;
        }

        .msg {
            text-align: center;
            margin-top: 18px;
            font-weight: bold;
            color: green;
        }

        .error {
            text-align: center;
            margin-top: 18px;
            font-weight: bold;
            color: red;
        }

        .return-link {
            text-align: center;
            margin-top: 25px;
        }

        .return-link a {
            text-decoration: none;
            color: #1e3c72;
            font-weight: bold;
        }

        .return-link a:hover {
            text-decoration: underline;
        }

    </style>

</head>

<body>

<div class="container">

    <h1>Register New Employee</h1>

    <div class="timestamp">
        <d:putTag format="yyyy-MM-dd HH:mm:ss" />
    </div>

    <form method="post" action="register">

        <label>Employee Name:</label>
        <input required type="text" name="ename" />

        <label>Username:</label>
        <input required type="text" name="uname" />

        <label>Password:</label>
        <input required type="password" name="pwd" />

        <label>Email ID:</label>
        <input required type="text" name="email" />

        <label>Phone / Mobile No:</label>
        <input required type="text" name="mobileno" />

        <label>Hire Date:</label>
        <input required type="date" name="hdate" />

        <label>Department No:</label>
        <input required type="number" name="deptno" />

        <input type="submit" name="action" value="Add" />
    </form>

    <div class="msg">${requestScope.message}</div>
    <div class="error">${requestScope.error}</div>

    <div class="return-link">
        <a href="/">Return to Home</a>
    </div>

</div>

</body>
</html>
