package app.api;

import java.util.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;
import app.services.*;
import app.data.shopping.*;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;

import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Request;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;

@Path("/api/ord")
public class OrderManagerApi {

    @GET
    @Path("/allcust")
    @Produces(MediaType.APPLICATION_JSON)
    public Response seeCustomer() throws Exception {
        OrderManagerService mana = new OrderManagerService();
        List<CustomerEntity> cust = mana.getAllCust();
        return cust.size() > 0 ? Response.ok(cust).build() : Response.status(404).build();
    }

    @GET
    @Path("/allord")
    @Produces(MediaType.APPLICATION_JSON)
    public Response seeOrder() throws Exception {
        OrderManagerService mana = new OrderManagerService();
        List<OrderEntity> ord = mana.getAllOrders();
        return ord.size() > 0 ? Response.ok(ord).build() : Response.status(404).build();
    }

    @GET
    @Path("/allonecust/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response seeOneCustomer(@PathParam("id") String cId) throws Exception {
        OrderManagerService mana = new OrderManagerService();
        CustomerEntity cust = mana.getOneCust(cId);
        return (cust != null) ? Response.ok(cust).build() : Response.status(404).build();
    }

    @GET
    @Path("/alloneord/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response seeOneOrder(@PathParam("id")int oId) throws Exception {
        OrderManagerService mana = new OrderManagerService();
        OrderEntity ord = mana.getOneOrder(oId);
        return (ord != null) ? Response.ok(ord).build() : Response.status(404).build();
    }

    @POST
    @Path("/addcust")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addCustomer(CustomerEntity en) {
        
        CustomerEntity c = new CustomerEntity();
        c.setCustId(en.getCustId());
        c.setCustName(en.getCustName());
        c.setPhone(en.getPhone());
        c.setCity(en.getCity());
        try{
            OrderManagerService mana = new OrderManagerService();
            String reply = mana.addCust(c);
            return Response.ok(en).build();
        }catch(Exception ex){
            ex.printStackTrace();
            return Response.status(500,ex.getMessage()).build();
        }
    }

    @POST
    @Path("/addord")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addOrder(OrderEntity en) {
        
        OrderEntity c = new OrderEntity();
        c.setOrderId(en.getOrderId());
        c.setCustId(en.getCustId());
        c.setPNo(en.getPNo());
        c.setQuantity(en.getQuantity());
        try{
            OrderManagerService mana = new OrderManagerService();
            int reply = mana.addOrder(c);
            return Response.ok(en).build();
        }catch(Exception ex){
            ex.printStackTrace();
            return Response.status(500,ex.getMessage()).build();
        }
    }
}