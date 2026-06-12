<%@ taglib prefix="a" uri="my.app.tags" %>
<html>
<head>
    <title>Demo-app</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #eef2f7;
            margin: 0;
            padding: 0;
        }
        h1 {
            background: #2c3e50;
            color: white;
            padding: 20px;
            margin: 0;
        }
        .container {
            width: 350px;
            margin: 70px auto;
            background: white;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 0 12px rgba(0,0,0,0.1);
        }
        h2 {
            text-align: center;
            color: #34495e;
            margin-bottom: 20px;
        }
        input[type="text"],
        input[type="password"] {
            width: 100%;
            padding: 12px;
            margin-top: 8px;
            border: 1px solid #ccc;
            border-radius: 6px;
            font-size: 15px;
        }
        input[type="text"]:focus,
        input[type="password"]:focus {
            border-color: #2980b9;
            outline: none;
            box-shadow: 0 0 4px rgba(41,128,185,0.4);
        }
        input[type="submit"] {
            width: 100%;
            padding: 12px;
            background: #2980b9;
            color: white;
            font-size: 16px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            margin-top: 15px;
            font-weight: bold;
        }
        input[type="submit"]:hover {
            background: #1f6390;
        }
        .timestamp {
            margin-top: 30px;
            text-align: center;
            color: #666;
            font-size: 13px;
        }
    </style>
</head>

<body>

<h1>Welcome Customer</h1>

<div class="container">

    <h2>Please Sign In</h2>

    <form method="post">
        <p>
            <b>Customer ID</b><br/>
            <input required type="text" name="custId" />
        </p>

        <p>
            <b>Password</b><br/>
            <input required type="password" name="custPwd" />
        </p>

        <p>
            <input type="submit" value="Login" />
        </p>
    </form>

</div>

<div class="timestamp">
    <a:putTag format="yyyy-MM-dd hh:mm:ss"/>
</div>

</body>
</html>
