<%@ taglib prefix="d" uri="my.app.tags" %>
<jsp:useBean id="employee" class="app.components.EmployeeBean" scope="request"/>

<html>
<head>
    <title>Employee History</title>

    <style>
        body {
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #2193b0, #6dd5ed);
            font-family: Arial, sans-serif;
        }

        .container {
            width: 420px;
            margin: 80px auto;
            background: #fff;
            padding: 35px 40px;
            border-radius: 14px;
            box-shadow: 0px 6px 25px rgba(0,0,0,0.25);
            animation: fadeIn 0.8s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to   { opacity: 1; transform: translateY(0); }
        }

        h1 {
            text-align: center;
            color: #222;
            font-size: 26px;
            margin-bottom: 10px;
        }

        .date-box {
            text-align: center;
            margin-bottom: 25px;
            color: #777;
            font-size: 14px;
        }

        label {
            font-weight: bold;
            display: block;
            margin-top: 15px;
            margin-bottom: 5px;
        }

        input[type="number"],
        input[type="text"] {
            width: 100%;
            padding: 12px;
            font-size: 15px;
            border-radius: 8px;
            border: 1px solid #ccc;
            outline: none;
            transition: 0.2s;
        }

        input[type="number"]:focus,
        input[type="text"]:focus {
            border-color: #2193b0;
            box-shadow: 0 0 6px rgba(0, 174, 255, 0.3);
        }

        .btn {
            width: 100%;
            padding: 12px;
            margin-top: 22px;
            border: none;
            border-radius: 8px;
            background: #2193b0;
            color: white;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: 0.25s;
        }

        .btn:hover {
            background: #176f82;
        }

        .msg {
            margin-top: 18px;
            text-align: center;
            font-size: 15px;
            color: green;
            font-weight: bold;
        }

        .error {
            margin-top: 18px;
            text-align: center;
            font-size: 15px;
            color: red;
            font-weight: bold;
        }

        a {
            display: block;
            text-align: center;
            margin-top: 20px;
            color: #176f82;
            text-decoration: none;
            font-weight: bold;
        }

        a:hover {
            text-decoration: underline;
        }

    </style>
</head>

<body>

<div class="container">

    <h1>Record Employee History</h1>

    <div class="date-box">
        <d:putTag format="yyyy-MM-dd HH:mm:ss" />
    </div>

    <form method="post" action="history">

        <label>Employee ID</label>
        <input type="number" name="eId" required placeholder="Enter Employee ID" />

        <label>Action Description</label>
        <input type="text" name="desc" maxlength="100" required placeholder="Describe action..." />

        <input type="submit" name="action" value="history" class="btn" />

    </form>

    <div class="msg">${requestScope.message}</div>
    <div class="error">${requestScope.error}</div>

    <a href="/">← Back to Home</a>

</div>

</body>
</html>
