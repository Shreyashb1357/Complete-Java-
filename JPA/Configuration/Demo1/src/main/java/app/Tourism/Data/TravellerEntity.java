package app.Tourism.Data;
import java.util.List;
import java.util.ArrayList;

public class TravellerEntity {
    private String id;
    private int rating;
    private List<TripsEntity> tours = new ArrayList<>();

    public String getId(){
        return id;
    }
    public void setId(String value){
        id = value;
    }

    public int getRating(){
        return rating;
    }
    public void setRating(int v) {
        rating = v;
    }

    public List<TripsEntity> getTours(){
        return tours;
    }
    public void setTours(List<TripsEntity> value) {
        tours = value;
    }
    

}