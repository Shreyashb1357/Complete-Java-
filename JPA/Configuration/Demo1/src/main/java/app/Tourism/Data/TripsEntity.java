package app.Tourism.Data;
import java.util.Date;
public class TripsEntity  {
    private int id;
    private Date checkin = new Date();
    private TravellerEntity guest;

    public int getId() {
        return id;
    }
    public void setId(int v){
        id = v;
    }

    public Date getCheckin(){
        return checkin;
    }
    public void setCheckin(Date v){
        checkin = v;
    }

    public TravellerEntity getGuest(){
        return guest;
    }
    public void setGuest(TravellerEntity v){
        guest = v;
    }
}