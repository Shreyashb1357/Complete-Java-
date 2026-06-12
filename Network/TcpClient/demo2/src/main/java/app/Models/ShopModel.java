package app.Models;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;


public class ShopModel {
    private String server;

    public ShopModel(String remote) {
        server = remote;
    }

    public Iteminfo fetchItem(String name) throws IOException, InterruptedException {
        var url = URI.create("http://" + server + "/shop/" + name);
      
        var client = HttpClient.newHttpClient();
        var request = HttpRequest.newBuilder(url)
            .GET()
            .header("User-Agent", "TCPClient demo/2.0")
            .build();
        var response = client.send(request, Iteminfo.bodyHandler());
        return response.body();

    }
}