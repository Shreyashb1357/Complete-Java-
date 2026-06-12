package app.data.shopping;
import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import jakarta.persistence.Basic;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.ManyToOne;

@Entity
@Table(name="customer")
public class CustomerEntity {
    
    @Id
    @Column(name="cust_id")
    private String custId;
// @OneToMany(mappedBy = "product", cascade = CascadeType.REFRESH)
    @Column(name="cust_name")
    private String custName;

    @Column(name="phone")
    private String phone;

    @Column(name="city")
    private String city;

    public String getCustId(){
        return custId;
    }
    public void setCustId(String id){
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