package app.components;

import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.sql.Timestamp;

@WebServlet({"/register", "/history"})
public class EmpAdd extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request , HttpServletResponse response)
            throws IOException , ServletException {

        // Instead of action — we use servlet path
        String path = request.getServletPath();

        // ----------------------------
        // ✔ 1. REGISTER EMPLOYEE
        // ----------------------------
        if ("/register".equals(path)) {
            try {

                EmpRegister emp = new EmpRegister();

                emp.setEname(request.getParameter("ename"));
                emp.setUser(request.getParameter("uname"));
                emp.setPassword(request.getParameter("pwd"));
                emp.setEmail(request.getParameter("email"));
                emp.setMobile(request.getParameter("mobileno"));

                String hd = request.getParameter("hdate");
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                Date hireDate = sdf.parse(hd);
                emp.sethDate(hireDate);

                int dept = Integer.parseInt(request.getParameter("deptno"));
                emp.setdept(dept);

                EmployeeBean e = new EmployeeBean();
                boolean right = e.addEmp(emp);

                if (right) {
                    request.setAttribute("message", "Employee Added Successfully!");
                } else {
                    request.setAttribute("error", "Failed to add employee");
                }

                request.getRequestDispatcher("/WEB-INF/pages/Register.jsp")
                       .forward(request, response);

            } catch(Exception e) {
                throw new RuntimeException(e);
            }
        }

        // ----------------------------
        // ✔ 2. ADD EMPLOYEE HISTORY
        // ----------------------------
        else if ("/history".equals(path)) {
            try {

                String id = request.getParameter("eId");

                if (id == null || id.isBlank()) {
                    throw new RuntimeException("Employee ID missing!");
                }

                EmpEntry etry = new EmpEntry();
                etry.setEId(Integer.parseInt(id));
                etry.setDesc(request.getParameter("desc"));

                Timestamp now = new Timestamp(System.currentTimeMillis());
                etry.setAdate(now);

                EmployeeBean e = new EmployeeBean();
                boolean right = e.addHistory(etry);

                if (right) {
                    request.setAttribute("message", "Employee history Added Successfully!");
                } else {
                    request.setAttribute("error", "Failed to add employee history");
                }

                request.getRequestDispatcher("/WEB-INF/pages/History.jsp")
                       .forward(request, response);

            } catch(Exception e) {
                throw new RuntimeException(e);
            }
        }
    }
}
