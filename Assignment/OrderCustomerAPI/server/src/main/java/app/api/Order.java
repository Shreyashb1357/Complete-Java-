package app.api;
import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import jakarta.persistence.Basic;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.ManyToOne;

public class Order {

    private int orderId;
    private String custId;
    private int pNo;
    private int quantity;

    public int getOrderId(){
        return orderId;
    }
    public void setOrderId(int id){
        orderId = id;
    }

    public String getCustId(){
        return custId;
    }
    public void setCustId(String id){
        custId = id;
    }

    public int getPNo(){
        return pNo;
    }
    public void setPNo(int id){
        pNo = id;
    }

    public int getQuantity(){
        return quantity;
    }
    public void setQuantity(int id){
        quantity = id;
    }
}