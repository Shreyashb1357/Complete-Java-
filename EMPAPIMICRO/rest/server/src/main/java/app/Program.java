package app;

import java.net.URI;

import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.simple.SimpleContainerFactory;

public class Program {
   
    public static void main(String[] args) throws Exception {
        System.out.println("Rest Server Started ... Enjoy Bruh...........");
        SimpleContainerFactory.create(
            URI.create("http://localhost:5000/"),
            new ResourceConfig().packages("app")            
        );
    }

}

