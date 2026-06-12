<%@ taglib prefix="d" uri="my.app.tags" %>
<html>
	<head>
		<title>demo-app</title>
	</head>
	<body>
		<h1>Welcome Customer</h1>
		<!-- <hr/> -->
        <!-- <d:putCurrentTime format="yyyy-MM-dd HH:mm:ss"/> -->
        <hr/>
		<h2>Please Sign-In</h2>
		<form method="post">
			<p>
				<b>Employee Name : </b><br/>
				<input required type="text" name="ename" />
			</p>
			<p>
				<b>Department No : </b><br/>
				<input required type="numaric" name="deptno" />
			</p>
			<p>
				<input type="submit" value="Login" />
			</p>
		</form>
		<p>
			<b>${requestScope.problem}</b>
		</p>
		<hr/>
		
	</body>
</html>