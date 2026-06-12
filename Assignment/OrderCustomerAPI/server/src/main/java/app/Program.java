package app;

import java.net.URI;

import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.simple.SimpleContainerFactory;

public class Program {
   
    public static void main(String[] args) throws Exception {
        System.out.println("The Server is started on port 5000.....");
        SimpleContainerFactory.create(
            URI.create("http://localhost:5000/"),
            new ResourceConfig().packages("app")            
        );
    }

}

