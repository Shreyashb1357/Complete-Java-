package app.Models;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.stream.Stream;
import java.io.File;
import java.util.*;

import com.fasterxml.jackson.databind.ObjectMapper;

public class Shopmodel {
    private Iteminfo[] item;

    public Shopmodel() {
        item = load("Met.store");
    }

    public Iteminfo getItem(String name) {
        return Stream.of(item)
            .filter(r-> r.id().equals(name))
            .findFirst()
            .orElse(null);
    }

    public void addItem(String name , double cost , int stock) {
        Iteminfo[] i = new Iteminfo[] {new Iteminfo(name , cost , stock)};
        
        save(i);
        
    }

    public static void save(Iteminfo[] entry) {
        String document = "Met.store" ;
        var serial = new ObjectMapper();
        try(var output = new FileOutputStream(document)) {
            serial.writeValue(output , entry);
        } catch(Exception e) {}
    }

    public static Iteminfo[] load(String document) {
        var serial = new ObjectMapper();
        try(var input = new FileInputStream(document)) {
            return serial.readValue(input , Iteminfo[].class);
        } catch(IOException e) {throw new RuntimeException(e);}
    }
}