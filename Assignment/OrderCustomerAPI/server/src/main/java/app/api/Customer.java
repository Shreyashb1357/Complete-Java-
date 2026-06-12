package app.api;
import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import jakarta.persistence.Basic;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.ManyToOne;


public class Customer {
    
    private int custId;
    private String custName;
    private String phone;
    private String city;

    public int getCustId(){
        return custId;
    }
    public void setCustId(int id){
        custId = id;
    }

    public String getCustName(){
        return custName;
    }
    public void setCustName(String id){
        custName = id;
    }
    
    public String getPhone(){
        return phone;
    }
    public void setPhone(String id){
        phone = id;
    }

    public String getCity(){
        return city;
    }
    public void setCity(String id){
        city = id;
    }
}