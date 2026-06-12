package app.Models;
public record Iteminfo(double cost , int stock) {
    public static Iteminfo parse(String name) {
        String[] segment = name.split("&");
        double p = Double.parseDouble(segment[0].substring(5));
        int n = Integer.parseInt(segment[1].substring(6));
        return new Iteminfo(p,n);
    }
}