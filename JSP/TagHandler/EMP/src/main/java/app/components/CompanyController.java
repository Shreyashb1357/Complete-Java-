package app.components;


import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@WebServlet("/")
public class CompanyController extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request , HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("/WEB-INF/pages/Index.jsp").forward(request , response);
    }

    @Override
    protected void doPost(HttpServletRequest request , HttpServletResponse response) throws ServletException, IOException {
        String empname = request.getParameter("ename");
        double dno = Double.parseDouble(request.getParameter("deptno"));
        var model = new EmployeeBean();
        if(model.authenticate(empname , dno)){
            request.setAttribute("employee" , model);
            request.getRequestDispatcher("/WEB-INF/pages/Detail.jsp");
        }else{
            request.setAttribute("problem" , "Invalid Id or Password");
            request.getRequestDispatcher("/WEB-INF/pages/Index.jsp").forward(request , response);
        }
    }

}