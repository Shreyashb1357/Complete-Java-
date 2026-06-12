<%@ taglib prefix="d" uri="my.app.tags" %>
<jsp:useBean id="customer" class="app.components.CustomerModelBean" scope="request" />

<html>
<head>
    <title>Customer Orders</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f3f6fa;
            margin: 0;
            padding: 0;
        }
        h1 {
            background: #2c3e50;
            color: white;
            padding: 20px;
            margin: 0;
        }
        h2 {
            color: #2c3e50;
            margin-left: 20px;
        }
        .container {
            margin: 20px;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }
        th {
            background: #34495e;
            color: white;
            padding: 10px;
            text-align: left;
        }
        td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
        }
        tr:nth-child(even) {
            background: #f9f9f9;
        }
        tr:hover {
            background: #eef4ff;
        }
        .logout {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 15px;
            background: #e74c3c;
            color: white;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
        }
        .logout:hover {
            background: #c0392b;
        }
        .timestamp {
            margin: 20px;
            font-size: 14px;
            color: #666;
            text-align: right;
        }
    </style>
</head>

<body>

<h1>Welcome Customer</h1>

<div class="container">

    <h2>Orders for ${customer.id}</h2>

    <table>
        <tr>
            <th>Product No</th>
            <th>Quantity</th>
            <th>Order Date</th>
        </tr>

        <d:putOrder orderVar="entry" orderSource="${customer.orders}">
            <tr>
                <td>${entry.productNo}</td>
                <td>${entry.quantity}</td>
                <td>${entry.orderDate}</td>
            </tr>
        </d:putOrder>
    </table>

    <a class="logout" href="/">Logout</a>

</div>

<div class="timestamp">
    <d:putTag format="yyyy-MM-dd hh:mm:ss" />
</div>

</body>
</html>
