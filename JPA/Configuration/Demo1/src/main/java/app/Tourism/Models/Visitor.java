package app.Tourism.Models;
import java.util.Date;
import app.Tourism.Data.*;

public record Visitor(String name , String stars , int visits , Date recent) {

    public static Visitor fromTraveller(TravellerEntity travel){
        var trips = travel.getTours();
        var last = trips.stream()
            .map(TripsEntity::getCheckin)
            //.filter(x->x!= null)
            .max(Date::compareTo);
            //.orElse(null);
        return new Visitor(
            travel.getId(),
            "*".repeat(travel.getRating()),
            trips.size(),
            last.get()
        );
    }
}