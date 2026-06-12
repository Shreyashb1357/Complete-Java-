package app;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

import app.Models.*;
//import app.Models.Shopmodel;

public class Program {
    private static Shopmodel model = new Shopmodel();


    public static void main(String[] args) throws Exception {
        
        int port = args.length > 0 ? Integer.parseInt(args[0]) : 4010;
        System.out.printf("Starting shop-server on TCP port %d...%n", port);
        start(new ServerSocket(port));
    }

    public static void start(ServerSocket listener) throws IOException {
        while(true) {
        var client = listener.accept();
        //communicateWith(client);
        //Thread.ofPlatform().start(()-> communicateWith(client));
        Thread.startVirtualThread(()-> communicateWith(client));
    }
    }

    public static void communicateWith(Socket connection) {
        try {
            
            var receiver = connection.getInputStream();
            var sender = connection.getOutputStream();

            try {
                var reader = new BufferedReader(new InputStreamReader(receiver));
                var writer = new PrintWriter(sender , true);
                writer.println("Welcome to met-store...");
                while(!connection.isClosed())
                {
                    writer.println("Enter the item name =");
                    String name = reader.readLine();
                    Iteminfo info = model.getItem(name);
                    if(info != null)
                        writer.printf("cost=%.2f&Stock=%d",info.cost(), info.stock());
                    writer.close();
                    reader.close();
                    // if(name.equals("close")) {
                    //     writer.close();
                    //     reader.close();
                    // } else if(name.equals("add")) {
                    //     writer.printf("Enter the the Id : ");
                    //     String nid = reader.readLine();
                    //     writer.printf("Enter the the Cost : ");
                    //     double ncst = Double.parseDouble(reader.readLine());
                    //     writer.printf("Enter the the Stock : ");
                    //     int nstc = Integer.parseInt(reader.readLine());
                    //     model.addItem(nid , ncst , nstc);
                    // }else {
                    //     Iteminfo info = model.getItem(name);
                    //     if(info != null)
                    //         writer.printf("cost=%.2f&Stock=%d",info.cost(), info.stock());
                    // }
                }
            } finally {
                connection.close();
            }

        } catch(IOException e) {
            System.out.println("Communication failed!");
        }
    }

}

