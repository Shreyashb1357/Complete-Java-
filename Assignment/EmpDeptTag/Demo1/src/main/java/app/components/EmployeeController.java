package app.components;
import java.io.IOException;
import java.lang.*;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/")
public class EmployeeController extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request , HttpServletResponse response) throws IOException , ServletException {
        request.getRequestDispatcher("/WEB-INF/pages/Index.jsp").forward(request,response);
    }

    @Override
    protected void doPost(HttpServletRequest request , HttpServletResponse response) throws IOException, ServletException {
        String name = request.getParameter("empId");
        String pass = request.getParameter("pwd");
        String action = request.getParameter("action");
        if ("Login".equals(action)) {
            var model = new EmployeeBean();
            if(model.authenticate(name , pass)){
                request.setAttribute("employee", model);
                request.getRequestDispatcher("/WEB-INF/pages/Detail.jsp").forward(request,response);
            }else{
                request.setAttribute("request", "Invalid Id or password");
                request.getRequestDispatcher("/WEB-INF/pages/Index.jsp").forward(request, response);
            }
        }else if ("register".equals(action)) {
            handleRegister(request , response);
        }else if ("history".equals(action)){
            handleHistory(request , response);
        }
    }



    private void handleRegister(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {   
        request.setAttribute("message", "Registration successful!");
        request.getRequestDispatcher("/WEB-INF/pages/Register.jsp").forward(request,response);
    }

    private void handleHistory(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {   
        request.setAttribute("RecordHis", "Registration successful!");
        request.getRequestDispatcher("/WEB-INF/pages/History.jsp").forward(request,response);
    }

}