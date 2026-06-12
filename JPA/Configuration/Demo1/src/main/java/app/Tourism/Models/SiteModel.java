package app.Tourism.Models;
import java.util.Date;
import jakarta.persistence.Persistence;
import jakarta.persistence.EntityManagerFactory;
import app.Tourism.Data.*;
import java.util.List;

public class SiteModel {
    private static final EntityManagerFactory emf = Persistence.createEntityManagerFactory("app.data");

    public List<Visitor> getVisitor(){
        try(var em = emf.createEntityManager()){
            var query = em.createQuery("Select e from TravellerEntity e where length(e.id) > 3" , TravellerEntity.class);
            return query.getResultStream()
                .map(Visitor::fromTraveller)
                .toList();
        }
    }

    public boolean handleVisit(String visitorId , int visitorRating) {
        if(visitorId == null || visitorRating < 1 || visitorRating > 5)
            return false;
        try(var em = emf.createEntityManager()){
            var traveller = em.find(TravellerEntity.class , visitorId);
            if(traveller == null){
                traveller = new TravellerEntity();
                traveller.setId(visitorId);
            }
            traveller.setRating(visitorRating);
            var trip = new TripsEntity();
            trip.setGuest(traveller);
            traveller.getTours().add(trip);
            var tx = em.getTransaction();
            tx.begin();
            em.persist(traveller);
            tx.commit();
            return true;
        }
    }
}