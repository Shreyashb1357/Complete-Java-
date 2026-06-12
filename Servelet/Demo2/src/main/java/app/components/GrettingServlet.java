package app.components;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.concurrent.atomic.AtomicInteger;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


public class GrettingServlet extends HttpServlet {
    
    private AtomicInteger counter = new AtomicInteger();

    @Override
    protected void doGet(HttpServletRequest request , HttpServletResponse response) throws ServletException , IOException {
        String pathInfo = request.getPathInfo();
        String name = pathInfo != null ? pathInfo.substring(1) : "Stupid";
        int count = counter.incrementAndGet();
        var application = super.getServletContext();
        String page = application.getRealPath("WEB-INF/templates/welcome.html");
        String content = Files.readString(Path.of(page))
            .replace("|visitor_name|" , name)
            .replace("|visitor_count|" , String.valueOf(count));
        response.setContentType("text/html");
        response.getWriter().write(content);

    }

}