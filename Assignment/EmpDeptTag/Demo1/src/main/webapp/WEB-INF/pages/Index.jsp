<%@taglib prefix="d" uri="my.app.tags"%>
<html>
<head>
    <title>Employee Portal</title>

    <style>
        body {
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #5c6bc0, #3949ab);
            font-family: Arial, sans-serif;
            color: #333;
        }

        .container {
            width: 380px;
            margin: 80px auto;
            background: #fff;
            padding: 30px 35px;
            border-radius: 14px;
            box-shadow: 0px 6px 20px rgba(0,0,0,0.25);
            animation: fadeIn 0.8s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to   { opacity: 1; transform: translateY(0); }
        }

        h1 {
            text-align: center;
            margin-top: 0;
            font-size: 26px;
            color: #222;
            font-weight: bold;
        }

        .date-box {
            text-align: center;
            color: #777;
            margin-bottom: 25px;
            font-size: 14px;
        }

        label {
            font-weight: bold;
            display: block;
            margin-bottom: 6px;
            margin-top: 15px;
        }

        input[type="text"],
        input[type="password"] {
            width: 100%;
            padding: 12px;
            border-radius: 8px;
            border: 1px solid #bbb;
            font-size: 15px;
            outline: none;
            transition: 0.2s;
        }

        input[type="text"]:focus,
        input[type="password"]:focus {
            border-color: #5c6bc0;
            box-shadow: 0 0 5px rgba(92,107,192,0.3);
        }

        .btn {
            width: 100%;
            padding: 12px;
            margin-top: 20px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            transition: 0.25s;
        }

        .login-btn {
            background: #5c6bc0;
            color: white;
        }

        .login-btn:hover {
            background: #3f4ca3;
        }

        .register-btn {
            background: #00c853;
            color: white;
        }

        .register-btn:hover {
            background: #009f3e;
        }

        .history-btn {
            background: #ffa000;
            color: white;
        }

        .history-btn:hover {
            background: #e68a00;
        }

        hr {
            margin-top: 25px;
            opacity: 0.4;
        }

    </style>
</head>

<body>

<div class="container">

    <h1>Employee Portal</h1>

    <div class="date-box">
        <d:putTag format="yyyy-MM-dd HH:mm:ss" />
    </div>

    <form method="post">

        <label>Employee ID</label>
        <input type="text" name="empId" placeholder="Enter Employee ID" required />

        <label>Password</label>
        <input type="password" name="pwd" placeholder="Enter Password" required />

        <!-- Login Button -->
        <button type="submit" name="action" value="Login" class="btn login-btn">
            Login
        </button>

        <hr/>

        <!-- Register Button -->
        <button type="submit" name="action" value="register" class="btn register-btn">
            New Employee Registration
        </button>

        <hr/>

        <!-- History Button -->
        <button type="submit" name="action" value="history" class="btn history-btn">
            Record Employee History
        </button>

    </form>

</div>

</body>
</html>
