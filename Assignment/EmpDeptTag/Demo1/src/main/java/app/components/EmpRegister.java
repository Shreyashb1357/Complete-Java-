package app.components;
import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Date;


public class EmpRegister {
    
    // emp_id | emp_name | username | password | email | phone| hire_date  | dept_id |
    
    private String ename;
    private String user;
    private String password;
    private String email;
    private String mobile;
    private Date hDate;
    private int dept;

    public EmpRegister() {}

    public void setEname(String e){
        ename = e;
    }
    public void setUser(String e){
        user = e;
    }
    public void setPassword(String e){
        password = e;
    }
    public void setEmail(String e){
        email = e;
    }
    public void setMobile(String e){
        mobile = e;
    }
    public void sethDate(Date e){
        hDate = e;
    }
    public void setdept(int e){
        dept = e;
    }


     public String getEname() {
        return ename;
    }

    public String getUser() {
        return user;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public String getMobile() {
        return mobile;
    }

    public Date getHDate() {
        return hDate;
    }

    public int getDept() {
        return dept;
    }
}