package app.Models;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;


public class ShopModel {
    private String server;

    public ShopModel(String remote) {
        server = remote;
    }

    public Iteminfo fetchItem(String name) throws IOException {
        var connection = new Socket(server , 4010);

        var reciever = connection.getInputStream();
        var sender = connection.getOutputStream();

        try {
        var reader = new BufferedReader(new InputStreamReader(reciever));
        var writer = new PrintWriter(sender , true);
        reader.readLine();
        writer.println(name);
        String message = reader.readLine();
        writer.close();
        reader.close();
        if(message != null)
            return Iteminfo.parse(message);
        return new Iteminfo(0, 0);
        } finally{
            connection.close();
        }

    }
}