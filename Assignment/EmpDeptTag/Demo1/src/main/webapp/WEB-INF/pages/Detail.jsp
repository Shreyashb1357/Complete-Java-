<%@ taglib prefix="d" uri="my.app.tags" %>
<jsp:useBean id="employee" class="app.components.EmployeeBean" scope="request"/>

<html>
<head>
    <title>Employee History</title>

    <style>
        body {
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #667eea, #764ba2);
            font-family: 'Segoe UI', Arial, sans-serif;
            color: #fff;
        }

        .container {
            width: 90%;
            max-width: 1000px;
            margin: 40px auto;
            background: #ffffffdd;
            padding: 30px;
            border-radius: 14px;
            box-shadow: 0px 8px 30px rgba(0,0,0,0.25);
            color: #333;
            animation: fadeIn 0.7s ease-in-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to   { opacity: 1; transform: translateY(0); }
        }

        h1 {
            text-align: center;
            margin-bottom: 20px;
        }

        h2 {
            margin-top: 10px;
            font-size: 22px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 25px;
            font-size: 16px;
        }

        th, td {
            padding: 12px 15px;
            text-align: center;
        }

        th {
            background: #4c51bf;
            color: white;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        tr:nth-child(even) {
            background: #f1f1f1;
        }

        tr:nth-child(odd) {
            background: #ffffff;
        }

        tr:hover {
            background: #d4d4ff;
            cursor: pointer;
        }

        a {
            display: inline-block;
            margin-top: 25px;
            padding: 10px 18px;
            text-decoration: none;
            background: #4c51bf;
            color: white;
            border-radius: 8px;
            font-weight: bold;
            transition: 0.3s;
        }

        a:hover {
            background: #362f91;
        }

        .timestamp {
            text-align: center;
            margin-bottom: 20px;
            color: #222;
            font-size: 15px;
        }

    </style>
</head>

<body>

<div class="container">

    <h1>Welcome Employee</h1>

    <div class="timestamp">
        <d:putTag format="yyyy-MM-dd HH:mm:ss" />
    </div>

    <h2>History for: <span style="color:#4c51bf;">${employee.name}</span></h2>

    <table>
        <tr>
            <th>Employee Id</th>
            <th>History Id</th>
            <th>Action Date</th>
            <th>Action Description</th>
        </tr>

        <d:forEachEmp detailVar="entry" empSource="${employee.detailsEmp}">
            <tr>
                <td>${entry.EId}</td>
                <td>${entry.HId}</td>
                <td>${entry.adate}</td>
                <td>${entry.desc}</td>
            </tr>
        </d:forEachEmp>
    </table>

    <div style="text-align:center;">
        <a href="/">Logout</a>
    </div>

</div>

</body>

</html>
