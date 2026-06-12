package app.components;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/")
public class ShopControllerServlet extends HttpServlet  {

    @Override
    protected void doGet(HttpServletRequest request , HttpServletResponse response ) throws ServletException, IOException {
        request.getRequestDispatcher("WEB-INF/pages/Index.jsp").forward(request , response);
    }

    @Override
    protected void doPost(HttpServletRequest request , HttpServletResponse response) throws ServletException, IOException {
        String customerId = request.getParameter("custId");
        String password = request.getParameter("custPwd");
        var model = new CustomerModelBean();
        if(model.authenticate(customerId , password)) {
            request.setAttribute("customer",model);
            request.getRequestDispatcher("WEB-INF/pages/Detail.jsp").forward(request , response);
        }else{
            request.setAttribute("problem","Invalid Id or Password");
            request.getRequestDispatcher("WEB-INF/pages/Index.jsp").forward(request , response);
        }

    }

}