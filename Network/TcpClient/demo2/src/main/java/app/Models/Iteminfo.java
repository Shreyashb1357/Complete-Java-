package app.Models;

import java.net.http.HttpResponse.BodyHandler;
import java.net.http.HttpResponse.BodySubscribers;
import java.nio.charset.StandardCharsets;


public record Iteminfo(double cost , int stock) {
    public static Iteminfo parse(String name) {
        String[] segment = name.split("&");
        double p = Double.parseDouble(segment[0].substring(5));
        int n = Integer.parseInt(segment[1].substring(6));
        return new Iteminfo(p,n);
    }

    public static BodyHandler<Iteminfo> bodyHandler() {
        return response -> {
            if(response.statusCode() == 200) {
                return BodySubscribers.mapping(
                    BodySubscribers.ofString(StandardCharsets.UTF_8),
                    Iteminfo::parse
                );
            }
            return BodySubscribers.replacing(new Iteminfo(0,0));
        };
    }
}