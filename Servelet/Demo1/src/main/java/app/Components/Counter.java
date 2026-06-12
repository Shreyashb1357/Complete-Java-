package app.Components;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import java.io.*;
import jakarta.servlet.annotation.WebServlet;

@WebServlet("/login")
public class Counter extends HttpServlet {

    @Override
    public void doPost(HttpServletRequest request , HttpServletResponse response) throws ServletException, IOException {
        //String name = request.getParameter("person");
        // if(name == null)
        //     name = "Idiot";

        String name = request.getParameter("person");
        String age = request.getParameter("age");
        String city = request.getParameter("city");
        String job = request.getParameter("job");
        String time = LocalDateTime.now().format(DateTimeFormatter.ofPattern("hh:mm:ss a"));

        //String page = String.format(htmlTemplate, name, time, age, city, job);

       



    
        response.setContentType("text/html");
        response.getWriter().printf("""
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <title>Welcome Page</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background: linear-gradient(135deg, #1cc88a, #4e73df);
                        margin: 0;
                        padding: 0;
                        height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: #333;
                    }

                    .card {
                        background: white;
                        width: 420px;
                        padding: 30px;
                        border-radius: 18px;
                        box-shadow: 0 8px 20px rgba(0,0,0,0.2);
                        animation: fadeIn 0.6s ease;
                        text-align: center;
                    }

                    h1 {
                        margin-bottom: 10px;
                    }

                    .info {
                        text-align: left;
                        margin-top: 20px;
                        line-height: 1.8;
                        font-size: 16px;
                    }

                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to   { opacity: 1; transform: translateY(0); }
                    }
                </style>
            </head>
            <body>

                <div class="card">
                    <h1>Welcome %s</h1>

                    <div class="info">
                        <b>Current Time:</b> %s <br>
                        <b>Age:</b> %s <br>
                        <b>City:</b> %s <br>
                        <b>Profession:</b> %s
                    </div>
                </div>

            </body>
            </html>

        """, name, time, age, city, job);
        
    }
}