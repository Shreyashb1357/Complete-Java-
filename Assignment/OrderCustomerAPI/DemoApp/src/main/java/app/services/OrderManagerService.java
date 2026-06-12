package app.services;

import app.data.shopping.*;
import java.util.List;
import jakarta.persistence.Persistence;


public class OrderManagerService {
    
    public List<CustomerEntity> getAllCust() throws Exception {
        var emf = Persistence.createEntityManagerFactory("app.data");
        var em = emf.createEntityManager();

        var query = em.createQuery("Select e from CustomerEntity e", CustomerEntity.class);
        var custList = query.getResultList();
        em.close();
        return custList;
    }

    public List<OrderEntity> getAllOrders() throws Exception {
        var emf = Persistence.createEntityManagerFactory("app.data");
        var em = emf.createEntityManager();

        var query = em.createQuery("Select e from OrderEntity e", OrderEntity.class);
        var ordList = query.getResultList();
        em.close();
        return ordList;
    }


    public CustomerEntity getOneCust(String id) throws Exception {
        var emf = Persistence.createEntityManagerFactory("app.data");
        var em = emf.createEntityManager();

        var query = em.createQuery("Select e from CustomerEntity e where e.custId = ?1" , CustomerEntity.class);
        query.setParameter(1, id);

        var custList = query.getResultList();
        var cust = custList.get(0);
        em.close();
        return cust;
    }

    public OrderEntity getOneOrder(int id) throws Exception {
        var emf = Persistence.createEntityManagerFactory("app.data");
        var em = emf.createEntityManager();

        var query = em.createQuery("Select e from OrderEntity e where e.orderId = ?1" , OrderEntity.class);
        query.setParameter(1, id);

        var ordList = query.getResultList();
        var ord = ordList.get(0);
        em.close();
        return ord;
    }

    public String addCust(CustomerEntity en) throws Exception {
        if(en == null)
            return null;
        var emf = Persistence.createEntityManagerFactory("app.data");
        try(var em = emf.createEntityManager()){
            var tran = em.getTransaction();
            tran.begin();
            em.persist(en);
            tran.commit();       
            return en.getCustId();
        }
    }

    public int addOrder(OrderEntity en) throws Exception {
        if(en == null)
            return -1;
        var emf = Persistence.createEntityManagerFactory("app.data");
        try(var em = emf.createEntityManager()){
            var tran = em.getTransaction();
            tran.begin();
            em.persist(en);
            tran.commit();       
            return en.getOrderId();
        }
    }

}